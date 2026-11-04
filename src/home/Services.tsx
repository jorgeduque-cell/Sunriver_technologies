import { useEffect, useId, useRef, useState } from 'react';
import { CONTACT, CUBE_EXTRA_FACES, MARQUEE_ITEMS, PLANS, PLAN_INCLUDES, PLAN_TERMS, REEL_TYPES, SERVICES } from './content';
import type { MediaId } from './media';
import { MediaSlot } from './MediaSlot';
import { ArrowRight } from './icons';
import { usePinnedProgress, useScrollVar } from './motion';
import { SplitTitle } from './Words';

type Face = {
  num: string;
  kicker: string;
  title: string;
  text: string;
  bullets: readonly string[];
  pricePrefix?: string;
  price?: string;
  priceSuffix?: string;
  media: MediaId;
  cta: { label: string; href: string; external?: boolean };
};

const wa = (msg: string) => `${CONTACT.whatsappUrl}?text=${encodeURIComponent(msg)}`;
const KICKERS = ['Contenido', 'Bots', 'IA con seguridad', 'Web'];
const FACE_MEDIA: MediaId[] = ['cubo-redes', 'cubo-automatizaciones', 'cubo-agentes', 'cubo-web'];

/** Las seis caras: los cuatro servicios + lo que nos diferencia + cómo empezar. */
const FACES: Face[] = [
  ...SERVICES.map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    kicker: KICKERS[i],
    title: s.title,
    text: s.text,
    bullets: s.bullets,
    pricePrefix: s.pricePrefix,
    price: s.price,
    priceSuffix: s.priceSuffix,
    media: FACE_MEDIA[i],
    cta: { label: 'Lo quiero', href: wa(`Hola, me interesa: ${s.title}`), external: true },
  })),
  {
    num: '05',
    ...CUBE_EXTRA_FACES[0],
    media: 'cubo-frenos',
    cta: { label: 'Cómo cuidamos tus datos', href: '#preguntas' },
  },
  {
    num: '06',
    ...CUBE_EXTRA_FACES[1],
    price: 'Gratis',
    media: 'cubo-diagnostico',
    cta: { label: 'Agendar diagnóstico', href: '#contacto' },
  },
];

/** Orientación del cubo [rx, ry] que deja cada cara de frente. */
const ORIENT: ReadonlyArray<[number, number]> = [
  [0, 0],
  [0, -90],
  [0, -180],
  [0, -270],
  [-90, -360],
  [-270, -360],
];
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Del avance 0–1 a la rotación: entre cara y cara gira, y en cada cara se detiene un rato. */
function pose(p: number) {
  const s = p * (ORIENT.length - 1);
  const k = Math.min(ORIENT.length - 2, Math.floor(s));
  const t = Math.min(1, Math.max(0, (s - k - 0.22) / 0.56));
  const e = smooth(t);
  const [ax, ay] = ORIENT[k];
  const [bx, by] = ORIENT[k + 1];
  return { rx: ax + (bx - ax) * e, ry: ay + (by - ay) * e, index: e < 0.5 ? k : k + 1 };
}

/** Banda de palabras gigantes que se desliza con el scroll. */
function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVar(ref);
  const items = [0, 1, 2].flatMap((rep) =>
    MARQUEE_ITEMS.map((it) => (
      <span key={`${rep}-${it.word}`} className="sr-marquee-item">
        {it.word}
        <small>( {it.sub} )</small>
      </span>
    )),
  );
  return (
    <div ref={ref} className="sr-marquee" aria-hidden="true">
      <div className="sr-marquee-row">{items}</div>
    </div>
  );
}

function Price({ face }: { face: Face }) {
  if (!face.price) return null;
  return (
    <p className="sr-price">
      {face.pricePrefix ? <span className="sr-price-prefix">{face.pricePrefix}</span> : null}
      <strong>{face.price}</strong>
      {face.priceSuffix ? <span className="sr-price-suffix">{face.priceSuffix}</span> : null}
    </p>
  );
}

export function Services() {
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Escritorio: el scroll gira el cubo y marca la cara activa.
  usePinnedProgress(
    trackRef,
    (p) => {
      const { rx, ry, index } = pose(p);
      const cube = cubeRef.current;
      if (cube) {
        cube.style.setProperty('--cube-rx', `${rx.toFixed(2)}deg`);
        cube.style.setProperty('--cube-ry', `${ry.toFixed(2)}deg`);
      }
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    },
    { onEnabled: setPinned },
  );

  // Sin modo fijo (celular, movimiento reducido): elegir un servicio gira el cubo hacia su cara.
  useEffect(() => {
    if (pinned) return;
    const cube = cubeRef.current;
    if (!cube) return;
    const [rx, ry] = ORIENT[active];
    cube.style.setProperty('--cube-rx', `${rx}deg`);
    cube.style.setProperty('--cube-ry', `${ry}deg`);
  }, [active, pinned]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!pinned || !track) {
      activeRef.current = i;
      setActive(i);
      return;
    }
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * (i / (FACES.length - 1)) + 2, behavior: 'smooth' });
  };

  return (
    <section
      id="servicios"
      className="sr-zone sr-zone--sand sr-services"
      data-mode={pinned ? 'pinned' : 'static'}
      aria-labelledby="servicios-title"
    >
      <Marquee />

      <div className="sr-container sr-cube-head" data-reveal="words">
        <p className="sr-label">Servicios · Haz scroll para girar el cubo</p>
        <h2 id="servicios-title" className="sr-h2">
          <SplitTitle lead="Cuatro piezas que trabajan" accent="juntas." accentClass="sr-serif sr-accent-text" />
        </h2>
      </div>

      <div className="sr-cube-track" ref={trackRef}>
        <div className="sr-cube-stage">
          <div className="sr-container sr-cube-grid">
            <div className="sr-cube-scene" aria-hidden="true">
              <div className="sr-cube-tilt">
                <div className="sr-cube" ref={cubeRef} data-active={active}>
                  {FACES.map((f, i) => (
                    <div key={f.num} className="sr-cube-face" data-face={i}>
                      <MediaSlot id={f.media} decorative />
                      <div className="sr-cube-face-ink">
                        <span className="sr-num">{f.num} · {f.kicker}</span>
                        <span className="sr-cube-face-title">{f.title}</span>
                        {f.price ? (
                          <span className="sr-cube-face-price">
                            {f.pricePrefix ? `${f.pricePrefix} ` : ''}
                            {f.price}
                            {f.priceSuffix ? ` ${f.priceSuffix}` : ''}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="sr-label sr-cube-hint">Seis caras de lo que hacemos</p>
            </div>

            <ol className="sr-cube-list">
              {FACES.map((f, i) => {
                const isActive = i === active;
                const btnId = `${baseId}-f${i}`;
                const bodyId = `${baseId}-b${i}`;
                return (
                  <li key={f.num} className="sr-cube-item" data-active={isActive ? 'true' : 'false'}>
                    <h3 className="sr-cube-item-head">
                      <button
                        id={btnId}
                        type="button"
                        aria-controls={bodyId}
                        aria-expanded={pinned ? isActive : undefined}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => goTo(i)}
                      >
                        <span className="sr-num">{f.num}</span>
                        <span className="sr-cube-item-title">{f.title}</span>
                        {f.price ? <span className="sr-cube-item-price">{f.price}</span> : null}
                      </button>
                    </h3>
                    <div id={bodyId} className="sr-cube-item-body" role="region" aria-labelledby={btnId}>
                      <div className="sr-cube-item-inner">
                        <p className="sr-label">{f.kicker}</p>
                        <p className="sr-card-text">{f.text}</p>
                        <ul className="sr-dash-list">
                          {f.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <div className="sr-cube-item-foot">
                          <Price face={f} />
                          <a
                            href={f.cta.href}
                            className="sr-btn sr-btn--primary sr-btn--sm"
                            {...(f.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {f.cta.label}
                            <ArrowRight className="sr-arrow" size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="sr-container">
        <div id="planes" className="sr-plans" data-reveal>
          <div className="sr-plans-head">
            <p className="sr-label">Redes que alcanzan · Planes</p>
            <h3 className="sr-plans-title">
              <SplitTitle lead="Elige cuánto material" accent="pones tú." accentClass="sr-serif sr-accent-text" />
            </h3>
          </div>

          <ul className="sr-plans-grid">
            {PLANS.map((plan, i) => (
              <li key={plan.name}>
                <article className="sr-plan sr-tilt" data-tilt="4">
                  <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="sr-plan-name">{plan.name}</h4>
                  <p className="sr-price">
                    <strong>{plan.price}</strong>
                    <span className="sr-price-suffix">{plan.priceNote}</span>
                  </p>
                  <p className="sr-plan-reels">{plan.reels}</p>
                  <p className="sr-plan-for">{plan.forWho}</p>
                </article>
              </li>
            ))}
          </ul>

          <p className="sr-plans-line">
            <strong>Todos incluyen:</strong> {PLAN_INCLUDES.join(', ')}.
          </p>
          <p className="sr-plans-note">
            {PLAN_TERMS.join(' · ')} Los planes con creación se confirman en el diagnóstico gratis.
          </p>

          <details className="sr-plans-more">
            <summary>Qué incluye cada tipo de reel</summary>
            <div className="sr-plans-cols">
              {REEL_TYPES.map((t) => (
                <div key={t.title} className="sr-plans-col">
                  <p className="sr-label">{t.sub}</p>
                  <h4 className="sr-plans-col-title">{t.title}</h4>
                  <ul className="sr-dash-list">
                    {t.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
