import { useEffect, useRef } from 'react';
import { mountFluid } from './fluid';

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Fondo del hero: tinta fluida en WebGL (pantallas de 768 px o más). Debajo siempre hay manchas
 * en CSS con los mismos colores: sin JS, sin WebGL, mientras carga y en celular se ve eso
 * (en celular las manchas se desplazan con el scroll, por CSS, sin costo de JS).
 * Arranca después del load. Con movimiento reducido o ahorro de datos se pinta un cuadro fijo.
 */
export function FluidHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // En celular la tinta WebGL competiría con la carga de la página: se quedan las manchas CSS.
    if (window.matchMedia('(max-width: 767px)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    let dispose: (() => void) | null = null;
    let idleId = 0;
    let timeoutId = 0;
    const start = () => {
      dispose = mountFluid(canvas, {
        animate: !reduce && !saveData,
        scale: 0.5,
        maxFps: 60,
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timeoutId = globalThis.setTimeout(start, 600) as unknown as number;
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) globalThis.clearTimeout(timeoutId);
      dispose?.();
    };
  }, []);

  return (
    <div className="sr-fluid" aria-hidden="true">
      <span className="sr-fluid-blob sr-fluid-blob--sun" />
      <span className="sr-fluid-blob sr-fluid-blob--gold" />
      <span className="sr-fluid-blob sr-fluid-blob--river" />
      <canvas ref={canvasRef} className="sr-fluid-canvas" />
    </div>
  );
}
