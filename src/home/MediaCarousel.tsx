import { useEffect, useRef, useState } from 'react';
import type { Media } from './media';
import { ArrowRight, PauseIcon, PlayIcon } from './icons';

const INTERVAL_MS = 3600;

/**
 * Varias capturas en el mismo marco: pasan solas cada pocos segundos mientras el carrusel está
 * en pantalla y se detienen al pasar el mouse, al enfocarlo o con el botón de pausa (WCAG 2.2.2).
 * Con movimiento reducido arranca en pausa. Sin JS se ve la primera imagen.
 */
export function MediaCarousel({ media, className }: { media: Media; className: string }) {
  const slides = media.slides ?? [];
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false); // mouse encima o foco dentro
  const [visible, setVisible] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || held || !visible || n < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [playing, held, visible, index, n]);

  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  return (
    <div
      ref={rootRef}
      className={`${className} sr-carousel`}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
      role="group"
      aria-roledescription="carrusel"
      aria-label={media.alt}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="sr-carousel-slide"
          data-active={i === index ? '' : undefined}
          role="group"
          aria-roledescription="imagen"
          aria-label={`${i + 1} de ${n}`}
          aria-hidden={i === index ? undefined : true}
        >
          <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
        </div>
      ))}
      {n > 1 ? (
        <div className="sr-carousel-bar">
          <button type="button" className="sr-carousel-btn sr-carousel-btn--prev" onClick={() => go(-1)} aria-label="Imagen anterior">
            <ArrowRight size={16} />
          </button>
          <span className="sr-carousel-count" aria-live={playing && !held ? 'off' : 'polite'}>
            {index + 1} / {n}
          </span>
          <button type="button" className="sr-carousel-btn" onClick={() => go(1)} aria-label="Imagen siguiente">
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="sr-carousel-btn"
            onClick={() => setPlaying((v) => !v)}
            aria-label={playing ? 'Pausar el carrusel' : 'Reanudar el carrusel'}
          >
            {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
