import { useEffect, useRef } from 'react';

/** 49000 → "49.000" (separador de miles colombiano, también para 4 cifras). */
const formatThousands =(n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Cifra que cuenta hacia arriba la primera vez que entra en pantalla.
 * El valor final va escrito en el HTML (prerender): sin JS o para Google se lee completo.
 * Con JS, home.css la oculta un instante hasta que arranca el conteo (con salida de
 * seguridad por CSS si el JS no llega a ejecutarse).
 */
export function CountUp({
  value,
  from = 0,
  className,
}: {
  value: number;
  /** Valor inicial del conteo (puede ser mayor que `value` para contar hacia abajo). */
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = formatThousands(value);

  useEffect(() => {
    const el = ref.current;
    const textNode = el?.firstChild;
    if (!el || !textNode || textNode.nodeType !== Node.TEXT_NODE) return;

    const setText = (t: string) => {
      textNode.nodeValue = t;
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      el.dataset.countup = 'done';
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const duration = 1600;
        const start = performance.now();
        setText(formatThousands(from));
        el.dataset.countup = 'running';
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setText(formatThousands(Math.round(from + (value - from) * eased)));
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setText(finalText);
            el.dataset.countup = 'done';
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      setText(finalText);
    };
  }, [value, from, finalText]);

  return (
    <span ref={ref} className={className} data-countup="pending">
      {finalText}
    </span>
  );
}
