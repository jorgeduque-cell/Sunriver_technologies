/**
 * Hidratación diferida por sección.
 *
 * La home llega prerenderizada: el HTML de cada sección ya está completo y visible. Activar
 * (hidratar) todas las secciones al cargar ocupaba el hilo principal cientos de ms. Aquí cada
 * sección espera a acercarse a la pantalla (o a quedar atrás, si el scroll fue un salto), o a
 * que alguien la toque, la enfoque o le haga clic, y recién entonces React la activa.
 *
 * Se usa con `use(gateFor('#servicios'))` dentro de un <Suspense>: mientras la promesa no se
 * cumple, React conserva el HTML del servidor tal cual.
 *
 * La promesa se marca como cumplida en el mismo instante (`status`/`value`, el formato que lee
 * `use`). Así, si el primer clic cae en una sección todavía inactiva, React puede activarla de
 * forma síncrona dentro de ese mismo evento y el clic no se pierde.
 */
type Gate = Promise<void> & { status?: string; value?: undefined };
type Entry = { el: Element | null; release: () => void };

/** Cuánto antes de entrar en pantalla se activa una sección (fracción del alto de la ventana). */
const AHEAD = 0.4;
const INTERACTIONS = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'focusin', 'click'] as const;

const gates = new Map<string, Gate>();
const pending = new Set<Entry>();
let listening = false;
let frame = 0;

function onInteract(e: Event) {
  const target = e.target;
  if (!(target instanceof Node)) return;
  for (const entry of pending) {
    if (entry.el?.contains(target)) entry.release();
  }
}

// Con scroll y no con IntersectionObserver: un salto largo (ancla, scroll rápido en un
// teléfono lento) puede pasar por encima de una sección sin que ningún cuadro la vea
// "intersectando". Comparar contra el borde de abajo activa también las que quedaron atrás.
function check() {
  frame = 0;
  const limit = window.innerHeight * (1 + AHEAD);
  for (const entry of pending) {
    if (!entry.el?.isConnected || entry.el.getBoundingClientRect().top < limit) entry.release();
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(check);
}

function listen(on: boolean) {
  if (listening === on) return;
  listening = on;
  const method = on ? 'addEventListener' : 'removeEventListener';
  // Captura en window: corre antes que los listeners de React en #root.
  for (const type of INTERACTIONS) window[method](type, onInteract, { capture: true, passive: true });
  // Resguardo: si algo de más arriba cambiara con el historial (#ancla, Atrás), React no sabe si
  // una sección aún inactiva depende de ello y la vuelve a renderizar; si siguiera esperando,
  // quedaría vacía. Hoy la home es una isla de Astro sin router, pero se activan igual.
  window[method]('popstate', releaseAll, { capture: true });
  window[method]('scroll', schedule, { passive: true });
  window[method]('resize', schedule, { passive: true });
  if (!on && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** Activa todas las secciones pendientes (al salir de la home). */
export function releaseAll() {
  for (const entry of [...pending]) entry.release();
}

export function gateFor(selector: string): Promise<void> {
  const existing = gates.get(selector);
  if (existing) return existing;

  let resolve!: () => void;
  const gate: Gate = new Promise<void>((r) => {
    resolve = r;
  });
  gates.set(selector, gate);

  const entry: Entry = {
    el: document.querySelector(selector),
    release: () => {
      if (!pending.delete(entry)) return;
      gate.status = 'fulfilled';
      gate.value = undefined;
      resolve();
      if (pending.size === 0) listen(false);
    },
  };
  pending.add(entry);
  listen(true);
  // Primera revisión en el próximo cuadro (no durante el render): cubre recargas a media
  // página y enlaces con #ancla.
  schedule();
  return gate;
}
