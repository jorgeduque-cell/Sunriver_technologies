import { useEffect } from 'react';
import type { RefObject } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// any-*: también cubre portátiles con pantalla táctil que además tienen touchpad o mouse.
const hasFinePointer = () => window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches;

/**
 * Escribe en el elemento la variable CSS --p (0 → 1) según cuánto ha recorrido la pantalla:
 * 0 cuando su borde superior asoma por abajo, 1 cuando su borde inferior sale por arriba.
 * Solo escucha el scroll mientras el elemento está visible. Es movimiento ligado al scroll
 * (lo controla quien navega), así que no corre solo.
 */
export function useScrollVar(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    let raf = 0;
    let active = false;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (active) onScroll();
      }
      active = entry.isIntersecting;
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/**
 * Interacciones con el mouse (solo con puntero fino y sin movimiento reducido):
 * - [data-tilt="6"]: inclinación 3D hacia el cursor (escribe --rx, --ry y --mx/--my para el brillo).
 * - [data-magnetic]: el botón se acerca un poco al cursor.
 */
export function useInteractiveMotion() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('.sr [data-tilt]').forEach((el) => {
      const max = Number(el.dataset.tilt) || 6;
      let rect: DOMRect | null = null;
      let raf = 0;
      let px = 0;
      let py = 0;
      const apply = () => {
        raf = 0;
        el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`);
        el.style.setProperty('--mx', `${((px + 1) * 50).toFixed(1)}%`);
        el.style.setProperty('--my', `${((py + 1) * 50).toFixed(1)}%`);
      };
      const enter = () => {
        rect = el.getBoundingClientRect();
        el.dataset.tilting = '';
      };
      const move = (e: PointerEvent) => {
        if (!rect) rect = el.getBoundingClientRect();
        px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        if (!raf) raf = requestAnimationFrame(apply);
      };
      const leave = () => {
        rect = null;
        cancelAnimationFrame(raf);
        raf = 0;
        delete el.dataset.tilting;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        cancelAnimationFrame(raf);
      });
    });

    document.querySelectorAll<HTMLElement>('.sr [data-magnetic]').forEach((el) => {
      let rect: DOMRect | null = null;
      const move = (e: PointerEvent) => {
        if (!rect) rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.translate = `${(dx * 0.16).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px`;
      };
      const leave = () => {
        rect = null;
        el.style.translate = '';
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

/**
 * Brillo y anillo que siguen al cursor (puntero fino y sin movimiento reducido).
 * El anillo se agranda sobre enlaces, botones y tarjetas. El bucle se detiene al asentarse.
 */
export function useCursorGlow() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>('.sr');
    if (!root) return;

    const glow = document.createElement('div');
    glow.className = 'sr-glow';
    const ring = document.createElement('div');
    ring.className = 'sr-ring';
    glow.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    root.append(glow, ring);

    let tx = 0;
    let ty = 0;
    let gx = 0;
    let gy = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    const tick = () => {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.4 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!glow.dataset.on) {
        gx = rx = tx;
        gy = ry = ty;
        glow.dataset.on = '';
        ring.dataset.on = '';
      }
      const hot = (e.target as Element | null)?.closest('a, button, [data-tilt], summary, input, textarea');
      if (hot) ring.dataset.hot = '';
      else delete ring.dataset.hot;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      delete glow.dataset.on;
      delete ring.dataset.on;
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
      glow.remove();
      ring.remove();
    };
  }, []);
}

/** Inclina las filas del marquee según la velocidad del scroll; se asientan solas al parar. */
export function useScrollSkew() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const rows = Array.from(document.querySelectorAll<HTMLElement>('.sr .sr-marquee'));
    if (!rows.length) return;
    let last = window.scrollY;
    let skew = 0;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const v = y - last;
      last = y;
      skew += (Math.max(-12, Math.min(12, v * -0.35)) - skew) * 0.14;
      rows.forEach((el) => el.style.setProperty('--skew', skew.toFixed(2)));
      raf = Math.abs(skew) > 0.02 || Math.abs(v) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}
