import { useRef } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { MARQUEE_WORDS, PLANS, PLAN_INCLUDES, PLAN_TERMS, REEL_TYPES, SAFEGUARDS, SERVICES, type ServiceIcon } from './content';
import { AgentIcon, BotIcon, ReelIcon, ShieldIcon, WebIcon } from './icons';
import { useScrollVar } from './motion';
import { SplitTitle } from './Words';

const ICONS: Record<ServiceIcon, ComponentType<SVGProps<SVGSVGElement> & { size?: number }>> = {
  reel: ReelIcon,
  bot: BotIcon,
  agent: AgentIcon,
  web: WebIcon,
};

/** Dos filas de palabras gigantes que se deslizan en sentidos opuestos con el scroll. */
function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVar(ref);
  const row = (variant: 'a' | 'b') =>
    [0, 1, 2].flatMap((rep) =>
      MARQUEE_WORDS.map((word) => (
        <span key={`${variant}-${rep}-${word}`} className="sr-marquee-item">
          {word}
        </span>
      )),
    );
  return (
    <div ref={ref} className="sr-marquee" aria-hidden="true">
      <div className="sr-marquee-row sr-marquee-row--a">{row('a')}</div>
      <div className="sr-marquee-row sr-marquee-row--b">{row('b')}</div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="sr-section sr-dark sr-services" aria-labelledby="servicios-title">
      <Marquee />

      <div className="sr-container">
        <div className="sr-section-head" data-reveal="words">
          <p className="sr-label">Servicios</p>
          <h2 id="servicios-title" className="sr-h2">
            <SplitTitle lead="Cuatro piezas que trabajan" accent="juntas." accentClass="sr-serif sr-accent-text" />
          </h2>
        </div>

        <ul className="sr-services-grid">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.title} data-reveal>
                <article className="sr-service sr-tilt" data-tilt="5">
                  <div className="sr-service-top">
                    <Icon size={30} className="sr-icon" />
                    <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="sr-h3">{s.title}</h3>
                  <p className="sr-card-text">{s.text}</p>
                  <ul className="sr-dash-list">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="sr-price">
                    {s.pricePrefix ? <span className="sr-price-prefix">{s.pricePrefix}</span> : null}
                    <strong className={s.price.startsWith('[') ? 'sr-placeholder' : undefined}>{s.price}</strong>
                    {s.priceSuffix ? <span className="sr-price-suffix">{s.priceSuffix}</span> : null}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>

        <div id="planes" className="sr-plans" data-reveal>
          <div className="sr-plans-head">
            <p className="sr-label sr-label--accent">Redes que alcanzan · Planes</p>
            <h3 className="sr-diff-title">
              <SplitTitle lead="Elige cuánto material" accent="pones tú." accentClass="sr-serif sr-accent-text" />
            </h3>
          </div>

          <ul className="sr-plans-grid">
            {PLANS.map((plan) => (
              <li key={plan.name}>
                <article className="sr-plan">
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

        <div className="sr-diff" data-reveal>
          <div className="sr-diff-head">
            <p className="sr-label sr-label--accent">Lo que nos diferencia</p>
            <h3 className="sr-diff-title">
              <SplitTitle lead="Automatización" accent="con los frenos puestos." accentClass="sr-serif sr-accent-text" />
            </h3>
          </div>
          <div className="sr-diff-body">
            <p>
              Hablamos de ciberseguridad todos los días, y se nota en lo que construimos: cada bot
              tiene solo los permisos que necesita, las acciones delicadas pasan por una persona y
              todo se puede apagar con un botón.
            </p>
            <ul className="sr-diff-tags">
              {SAFEGUARDS.map((g) => (
                <li key={g}>
                  <ShieldIcon size={16} className="sr-icon" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
