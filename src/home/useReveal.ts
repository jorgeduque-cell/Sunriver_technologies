import { useEffect } from 'react';

/**
 * Entrada suave al hacer scroll para los elementos con [data-reveal].
 * - Solo se ocultan los elementos que, al cargar, están por DEBAJO de la pantalla:
 *   lo visible en el primer pantallazo nunca parpadea y, sin JS, todo se ve.
 * - Escalonado de 80 ms entre los elementos que entran juntos.
 * - Desactivado con prefers-reduced-motion.
 * - Sin lecturas de layout síncronas: la posición inicial llega en el primer aviso
 *   del IntersectionObserver (asíncrono), así la hidratación no fuerza recálculos.
 * Usa un atributo propio (data-rv) que React no controla.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('.sr [data-reveal]'));
    if (!els.length) return;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        const entering: HTMLElement[] = [];
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!seen.has(el)) {
            // Primer aviso: decide el estado inicial.
            seen.add(el);
            // Comparado con la ventana completa: lo que asoma en el borde inferior no se oculta.
            const rect = entry.boundingClientRect;
            const below = rect.top > window.innerHeight;
            // Rect vacío = su sección aún no se renderiza (content-visibility: auto),
            // es decir, está lejos de la pantalla: también espera su entrada.
            const notRendered = rect.width === 0 && rect.height === 0;
            if (entry.isIntersecting || (!below && !notRendered)) {
              io.unobserve(el); // ya visible (o por encima): se queda como está
            } else {
              el.dataset.rv = 'wait';
            }
            continue;
          }
          if (entry.isIntersecting) entering.push(el);
        }
        entering.forEach((el, i) => {
          el.style.setProperty('--rv-delay', `${Math.min(i, 5) * 80}ms`);
          el.dataset.rv = 'in';
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      els.forEach((el) => {
        delete el.dataset.rv;
        el.style.removeProperty('--rv-delay');
      });
    };
  }, []);
}
