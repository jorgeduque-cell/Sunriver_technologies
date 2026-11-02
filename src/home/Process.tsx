import { useEffect, useRef } from 'react';
import { STEPS } from './content';

export function Process() {
  const listRef = useRef<HTMLDivElement>(null);

  // La línea superior se llena de acento según el avance del scroll por los pasos.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>('.sr-step'));
    const paint = (p: number) => {
      list.style.setProperty('--p', p.toFixed(3));
      steps.forEach((step, i) => {
        if (p >= i / steps.length + 0.02) step.dataset.on = '';
        else delete step.dataset.on;
      });
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      paint(1);
      return;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85; // empieza cuando el bloque asoma
      const end = vh * 0.45; // termina cuando el final pasa la mitad de la pantalla
      const p = (start - rect.top) / (rect.height + start - end);
      paint(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    // Solo mide mientras los pasos están en pantalla (nada de lecturas síncronas al montar,
    // y no obliga a renderizar la sección antes de tiempo con content-visibility).
    let active = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (active) onScroll(); // al salir, deja la línea en su estado final (0 o 1)
      }
      active = entry.isIntersecting;
    });
    io.observe(list);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="proceso" className="sr-section sr-dark" aria-labelledby="proceso-title">
      <div className="sr-container">
        <div className="sr-section-head" data-reveal>
          <p className="sr-label">Cómo trabajamos</p>
          <h2 id="proceso-title" className="sr-h2">
            De la primera llamada a <span className="sr-serif sr-accent-text">resultados medidos.</span>
          </h2>
        </div>

        <div ref={listRef} className="sr-steps">
          <div className="sr-steps-track" aria-hidden="true">
            <span className="sr-steps-fill" />
          </div>
          <ol className="sr-steps-list">
            {STEPS.map((step) => (
              <li key={step.title} className="sr-step" data-reveal>
                <p className="sr-step-meta">{step.meta}</p>
                <h3 className="sr-h3">{step.title}</h3>
                <p className="sr-card-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
