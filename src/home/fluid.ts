// Tinta fluida del hero: tinta naranja (sol) y azul (río) que se mueve como en agua.
// WebGL1 sin librerías: un triángulo de pantalla completa y ruido FBM deformado en el shader.
// El puntero agita la tinta alrededor del cursor. Coste de CPU casi nulo (todo en la GPU).

const VERT = `attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStir;
uniform vec3 uFoam;
uniform vec3 uSun;
uniform vec3 uGold;
uniform vec3 uRiver;
uniform vec3 uRiverDeep;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y) * 1.65;
  vec2 m = vec2(uMouse.x * asp, uMouse.y) * 1.65;
  float t = uTime;

  // Remolino alrededor del puntero
  vec2 dm = p - m;
  float swirl = uStir * exp(-dot(dm, dm) * 2.6);
  p += vec2(-dm.y, dm.x) * swirl * 0.85;

  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.06)), fbm(p + vec2(5.2, 1.3) - t * 0.05));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.08), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.07));
  float f = fbm(p + 3.0 * r);
  float g = fbm(p * 1.25 + 2.4 * q.yx - vec2(t * 0.04, 3.0));

  float sun = smoothstep(0.54, 0.86, f);
  float river = smoothstep(0.52, 0.84, g) * (1.0 - sun * 0.75);
  float sunCore = smoothstep(0.74, 0.94, f);
  float riverCore = smoothstep(0.70, 0.94, g);

  vec3 col = uFoam;
  col = mix(col, mix(uGold, uSun, sunCore), sun * 0.6);
  col = mix(col, mix(uRiver, uRiverDeep, riverCore), river * 0.5);
  col = mix(col, uSun, swirl * 0.16);
  gl_FragColor = vec4(col, 1.0);
}
`;

const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16) / 255,
  parseInt(h.slice(3, 5), 16) / 255,
  parseInt(h.slice(5, 7), 16) / 255,
];

const PALETTE = {
  uFoam: hex('#F7F3EC'),
  uSun: hex('#FF7A1A'),
  uGold: hex('#FFB743'),
  uRiver: hex('#4B8BFF'),
  uRiverDeep: hex('#1565C0'),
};

const AUTOPLAY_MS = 5000; // después solo se mueve con el puntero o el scroll (WCAG 2.2.2)

export type FluidOptions = {
  /** false: un único cuadro fijo (movimiento reducido o ahorro de datos). */
  animate: boolean;
  /** Fracción de la resolución real (0,3–0,6). Menos = más liviano. */
  scale: number;
  /** Límite de cuadros por segundo. */
  maxFps: number;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  // No se consulta COMPILE_STATUS aquí: hacerlo obliga a esperar la compilación (bloquea el hilo).
  return s;
}

/**
 * Monta la tinta en el canvas. Devuelve la función de limpieza (o null si no hay WebGL).
 * El shader se compila en segundo plano (KHR_parallel_shader_compile): en Windows, Chrome lo
 * traduce a DirectX y compilarlo de forma síncrona bloqueaba la página ~0,5–1 s.
 */
export function mountFluid(canvas: HTMLCanvasElement, opts: FluidOptions): (() => void) | null {
  // failIfMajorPerformanceCaveat: si el navegador tuviera que dibujar por software (sin GPU),
  // no se crea el contexto y el hero se queda con las manchas en CSS (no bloquea la página).
  const gl = canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  let disposed = false;
  let pollRaf = 0;
  let teardown: (() => void) | null = null;
  const loseContext = () => gl.getExtension('WEBGL_lose_context')?.loseContext();
  const start = () => {
    if (disposed) return;
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      loseContext();
      return;
    }
    teardown = run(canvas, gl, prog, opts);
  };

  const parallel = gl.getExtension('KHR_parallel_shader_compile');
  if (parallel) {
    const poll = () => {
      pollRaf = 0;
      if (disposed) return;
      if (gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) start();
      else pollRaf = requestAnimationFrame(poll);
    };
    pollRaf = requestAnimationFrame(poll);
  } else {
    start();
  }

  return () => {
    disposed = true;
    cancelAnimationFrame(pollRaf);
    if (teardown) teardown();
    else loseContext();
  };
}

/** Programa ya enlazado: buffers, uniformes, tamaño y bucle. Devuelve su limpieza. */
function run(canvas: HTMLCanvasElement, gl: WebGLRenderingContext, prog: WebGLProgram, opts: FluidOptions): () => void {
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const uRes = u('uRes');
  const uTime = u('uTime');
  const uMouse = u('uMouse');
  const uStir = u('uStir');
  for (const [name, rgb] of Object.entries(PALETTE)) gl.uniform3fv(u(name), rgb);

  let time = 9.0;
  let stir = 0;
  let mouseX = 0.7;
  let mouseY = 0.6;
  let targetX = mouseX;
  let targetY = mouseY;

  const draw = () => {
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, mouseX, mouseY);
    gl.uniform1f(uStir, stir);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2) * opts.scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * Math.min(window.devicePixelRatio || 1, 2) * opts.scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }
    draw();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  canvas.classList.add('is-ready');

  if (!opts.animate) {
    return () => {
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }

  // Bucle: corre mientras hay energía (arranque, puntero o scroll) y el hero está a la vista.
  const started = performance.now();
  const frameMs = 1000 / opts.maxFps;
  let raf = 0;
  let last = started;
  let lastDraw = 0;
  let speed = 1;
  let energy = 1;
  let visible = true;

  const tick = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const auto = now - started < AUTOPLAY_MS ? 1 : 0;
    energy = Math.max(auto, energy * Math.pow(0.3, dt));
    speed += (energy - speed) * Math.min(1, dt * 2.5);
    stir *= Math.pow(0.25, dt);
    time += dt * speed;
    mouseX += (targetX - mouseX) * Math.min(1, dt * 4);
    mouseY += (targetY - mouseY) * Math.min(1, dt * 4);
    if (now - lastDraw >= frameMs) {
      lastDraw = now;
      draw();
    }
    const settled = speed < 0.004 && stir < 0.004;
    if (visible && !document.hidden && !settled) raf = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };

  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    if (e.clientY > r.bottom || e.clientY < r.top) return;
    targetX = (e.clientX - r.left) / r.width;
    targetY = 1 - (e.clientY - r.top) / r.height;
    stir = Math.min(1, stir + 0.08);
    energy = Math.min(1, energy + 0.05);
    wake();
  };
  const onScroll = () => {
    energy = Math.min(1, energy + 0.1);
    wake();
  };
  const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : wake());
  const onLost = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    raf = 0;
    visible = false;
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  io.observe(canvas);
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onLost);
  wake();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onLost);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
