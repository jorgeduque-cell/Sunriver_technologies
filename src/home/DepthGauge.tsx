import { useEffect, useRef } from 'react';

const MAX_DEPTH = 3600; // metros "del sol al fondo del río"
const MARKS = [0, 900, 1800, 2700, 3600];
const pad = (n: number) => String(n).padStart(4, '0');

/**
 * Regla de profundidad fija a la derecha (escritorio): marcas, un rombo que baja con el scroll
 * y la lectura en metros. Decorativa (aria-hidden). Un solo listener de scroll con rAF.
 */
export function DepthGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const read = readRef.current;
    if (!el || !read) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    let raf = 0;
    let lastText = '';
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty('--depth', p.toFixed(4));
      const text = `-${pad(Math.round(p * MAX_DEPTH))} m`;
      if (text !== lastText) {
        lastText = text;
        // Se cambia el nodo de texto existente (React lo creó y lo sigue siendo dueño).
        if (read.firstChild) read.firstChild.nodeValue = text;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const listen = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (!mq.matches) return;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    };
    listen();
    mq.addEventListener('change', listen);
    return () => {
      mq.removeEventListener('change', listen);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="sr-gauge" aria-hidden="true">
      <span className="sr-gauge-surface">Superficie</span>
      <div className="sr-gauge-rule">
        {MARKS.map((m) => (
          <span key={m} className="sr-gauge-mark" style={{ top: `${(m / MAX_DEPTH) * 100}%` }}>
            {pad(m)}
          </span>
        ))}
        <span className="sr-gauge-diamond" />
      </div>
      <span ref={readRef} className="sr-gauge-read">
        -0000 m
      </span>
    </div>
  );
}
