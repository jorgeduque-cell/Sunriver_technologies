import { LogoMarkShapes } from './icons';

// Tres corrientes de puntos que fluyen de izquierda a derecha y convergen en el sol.
const RIVERS = [
  { d: 'M-20 250 C120 200 230 305 400 178', colors: ['#FF7A1A', '#FFB743'] },
  { d: 'M-20 190 C150 135 255 245 400 166', colors: ['#4B8BFF', '#8DB6FF'] },
  { d: 'M-20 312 C140 335 265 235 400 190', colors: ['#F2EFE8', '#FF7A1A'] },
];
const DOTS = 9;

/**
 * Animación de entrada: un río tecnológico de puntos corre hacia el sol, el sol aparece con la marca
 * y después se escribe SunRiver. Es SVG con animación SMIL/CSS: va en el HTML prerenderizado, no usa JS.
 */
export function IntroScene() {
  return (
    <svg className="sr-intro" viewBox="0 0 800 400" focusable="false">
      <defs>
        <radialGradient id="sr-intro-glow">
          <stop offset="0" stopColor="#FF9A3D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF7A1A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle className="sr-intro-glow" cx="400" cy="170" r="190" fill="url(#sr-intro-glow)" />

      {RIVERS.map((r, i) => (
        <path key={r.d} className="sr-intro-trail" d={r.d} pathLength={1} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}

      {RIVERS.map((r, ri) =>
        Array.from({ length: DOTS }, (_, i) => {
          const begin = (0.1 + i * 0.1 + ri * 0.07).toFixed(2);
          return (
            <circle key={`${ri}-${i}`} r={i % 3 === 0 ? 4.2 : 2.8} fill={r.colors[i % 2]} opacity="0">
              <animateMotion
                dur="1.25s"
                begin={`${begin}s`}
                fill="freeze"
                path={r.d}
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.45 0 0.2 1"
              />
              <animate
                attributeName="opacity"
                dur="1.25s"
                begin={`${begin}s`}
                values="0;1;1;0"
                keyTimes="0;0.15;0.8;1"
                fill="freeze"
              />
            </circle>
          );
        }),
      )}

      <svg className="sr-intro-mark" x="300" y="70" width="200" height="200" viewBox="0 0 400 400">
        <LogoMarkShapes idPrefix="srm-intro" />
      </svg>
    </svg>
  );
}
