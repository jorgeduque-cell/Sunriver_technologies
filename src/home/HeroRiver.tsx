import { useEffect, useRef } from 'react';

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/**
 * Contenedor del río 3D. En el HTML prerenderizado es un div vacío; three.js solo se
 * descarga en escritorio con mouse, sin "ahorro de datos" ni movimiento reducido, y
 * después de que la página terminó de cargar. En móvil no se descarga nada.
 */
export function HeroRiver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (!desktop || reduce || saveData) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    let idleId = 0;
    let timeoutId = 0;

    const mount = () => {
      import('./river3d')
        .then((m) => {
          if (!cancelled) dispose = m.mountRiver(el);
        })
        .catch(() => {
          /* sin WebGL o sin red: el hero se queda sin fondo, no pasa nada */
        });
    };
    const schedule = () => {
      // Safari no tiene requestIdleCallback: usa un temporizador.
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(mount, { timeout: 2500 });
      } else {
        timeoutId = globalThis.setTimeout(mount, 1200) as unknown as number;
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) globalThis.clearTimeout(timeoutId);
      dispose?.();
    };
  }, []);

  return <div ref={ref} className="sr-hero-3d" aria-hidden="true" />;
}
