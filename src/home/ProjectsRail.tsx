import { useEffect, useRef, useState } from 'react';
import { PROJECT_ITEMS } from './content';
import type { MediaId } from './media';
import { MediaSlot } from './MediaSlot';
import { usePinnedProgress } from './motion';
import { SplitTitle } from './Words';
import { ArrowRight } from './icons';
import { ProjectDialog } from './ProjectDialog';

/** Índices de los proyectos que tienen ficha (para "Anterior / Siguiente" dentro de la ficha). */
const withMore = PROJECT_ITEMS.flatMap((item, i) => (item.more ? [i] : []));

/**
 * Galería horizontal: en escritorio la sección queda fija y las tarjetas avanzan de lado
 * mientras se baja. En celular, sin JS o con movimiento reducido, es una cuadrícula normal.
 */
export function ProjectsRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const openItem = open === null ? null : PROJECT_ITEMS[open];

  usePinnedProgress(
    trackRef,
    (p) => {
      const rail = railRef.current;
      if (!rail) return;
      const distance = Math.max(0, rail.scrollWidth - rail.clientWidth);
      rail.style.setProperty('--rail-x', `${(-p * distance).toFixed(1)}px`);
    },
    { onEnabled: setPinned },
  );

  // Alto de la pista = una pantalla + lo que hay que recorrer de lado.
  useEffect(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!track || !rail) return;
    if (!pinned) {
      track.style.removeProperty('height');
      rail.style.removeProperty('--rail-x');
      return;
    }
    const size = () => {
      const distance = Math.max(0, rail.scrollWidth - rail.clientWidth);
      track.style.height = `${window.innerHeight + distance}px`;
    };
    // Se mide recién cuando la sección está cerca (medirla antes obligaría a maquetarla al cargar).
    let ro: ResizeObserver | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        size();
        if (!ro) {
          ro = new ResizeObserver(size);
          ro.observe(rail);
        }
      },
      { rootMargin: '150% 0px' },
    );
    io.observe(track);
    window.addEventListener('resize', size);
    return () => {
      io.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', size);
    };
  }, [pinned]);

  return (
    <section
      id="proyectos"
      className="sr-zone sr-zone--river-deep sr-projects"
      data-mode={pinned ? 'pinned' : 'static'}
      aria-labelledby="proyectos-title"
    >
      <div className="sr-rail-track" ref={trackRef}>
        <div className="sr-rail-stage">
          <div className="sr-container sr-rail-head" data-reveal="words">
            <p className="sr-label">Proyectos y piezas</p>
            <h2 id="proyectos-title" className="sr-h2">
              <SplitTitle lead="Lo que ya está" accent="funcionando." accentClass="sr-serif sr-accent-text" />
            </h2>
          </div>
          <ul className="sr-rail" ref={railRef}>
            {PROJECT_ITEMS.map((item, i) => {
              const body = (
                <>
                  <MediaSlot id={item.media as MediaId} sizes="(max-width: 767px) 92vw, 34vw" />
                  <p className="sr-rail-cap">
                    <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="sr-rail-name">{item.name}</span>
                    <span className="sr-rail-detail">{item.detail}</span>
                  </p>
                  <p className="sr-rail-desc">{item.desc}</p>
                </>
              );
              return (
                <li key={item.name} className={`sr-rail-card${item.more ? ' sr-rail-card--open' : ''}`}>
                  {item.href ? (
                    <a href={item.href} className="sr-rail-link">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                  {item.more ? (
                    // El botón cubre toda la tarjeta y abre la ficha; los controles del carrusel
                    // quedan por encima y siguen funcionando.
                    <button type="button" className="sr-rail-open" aria-haspopup="dialog" onClick={() => setOpen(i)}>
                      <span className="sr-rail-open-chip">
                        Ver cómo funciona
                        <span className="sr-visually-hidden">: {item.name}</span>
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {openItem?.more ? (
        <ProjectDialog
          project={{ ...openItem, more: openItem.more }}
          number={(open ?? 0) + 1}
          position={withMore.indexOf(open ?? -1)}
          total={withMore.length}
          onClose={() => setOpen(null)}
          onStep={(step) => {
            const at = withMore.indexOf(open ?? -1);
            setOpen(withMore[(at + step + withMore.length) % withMore.length]);
          }}
        />
      ) : null}
    </section>
  );
}
