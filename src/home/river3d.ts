// Río de luz en WebGL para el fondo del hero (solo escritorio, carga diferida).
// Una sola nube de puntos con shader propio: barata para la GPU y casi nada de CPU.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float t = uTime;
    // Corriente principal de izquierda a derecha + oleaje cruzado
    float w = sin(p.x * 0.30 - t * 0.95) * 0.30
            + sin(p.z * 0.52 + p.x * 0.10 - t * 1.15) * 0.22
            + sin((p.x * 0.55 - p.z * 0.35) - t * 0.65) * 0.14;
    p.y += w;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = uSize * (7.0 / depth);
    float fadeFar = smoothstep(26.0, 6.0, depth);
    float fadeEdge = 1.0 - smoothstep(13.0, 18.0, abs(p.x));
    vAlpha = fadeFar * fadeEdge * (0.22 + 0.78 * smoothstep(-0.45, 0.55, w));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.08, d) * vAlpha * 0.8);
  }
`;

const AUTOPLAY_MS = 4500; // tras esto solo se mueve con la interacción (WCAG 2.2.2)

export function mountRiver(container: HTMLElement): () => void {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  } catch {
    return () => {};
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'sr-hero-3d-canvas';
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 60);
  camera.position.set(0, 1.7, 6.5);
  camera.lookAt(0, -0.3, -6);

  const COLS = 210;
  const ROWS = 64;
  const WIDTH = 36;
  const DEPTH = 22;
  const positions = new Float32Array(COLS * ROWS * 3);
  let k = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      positions[k++] = (c / (COLS - 1) - 0.5) * WIDTH;
      positions[k++] = 0;
      positions[k++] = 4 - (r / (ROWS - 1)) * DEPTH;
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: 2.1 * dpr },
    // #F5A623 en sRGB directo (el shader no pasa por la gestión de color de three)
    uColor: { value: new Vector3(245 / 255, 166 / 255, 35 / 255) },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  scene.add(new Points(geometry, material));

  // Tamaño
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderOnce();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // Bucle: corre solo mientras hay movimiento que mostrar y el hero está visible
  const started = performance.now();
  let raf = 0;
  let last = started;
  let time = 0;
  let speed = 1;
  let energy = 1;
  let targetX = 0;
  let targetY = 1.7;
  let visible = true;

  const renderOnce = () => renderer.render(scene, camera);

  const tick = (now: number) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const auto = now - started < AUTOPLAY_MS ? 1 : 0;
    energy = Math.max(auto, energy * Math.pow(0.35, dt));
    speed += (energy - speed) * Math.min(1, dt * 2.5);
    time += dt * speed;
    uniforms.uTime.value = time;
    camera.position.x += (targetX - camera.position.x) * Math.min(1, dt * 2);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, dt * 2);
    camera.lookAt(camera.position.x * 0.4, -0.3, -6);
    renderOnce();
    const settled =
      speed < 0.003 && Math.abs(targetX - camera.position.x) < 0.002 && Math.abs(targetY - camera.position.y) < 0.002;
    if (visible && !document.hidden && !settled) raf = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };

  const onPointer = (e: PointerEvent) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 1.6;
    targetY = 1.7 - (e.clientY / window.innerHeight - 0.5) * 0.5;
    energy = Math.min(1, energy + 0.06);
    wake();
  };
  const onScroll = () => {
    energy = Math.min(1, energy + 0.12);
    wake();
  };
  const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : wake());

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  io.observe(container);
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  resize();
  wake();
  requestAnimationFrame(() => canvas.classList.add('is-ready'));

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVisibility);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
