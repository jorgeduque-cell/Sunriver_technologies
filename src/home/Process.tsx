import { STEPS } from './content';
import { SplitTitle } from './Words';

/** Los cuatro pasos como filas numeradas (estilo lista de capacidades). */
export function Process() {
  return (
    <section id="proceso" className="sr-zone sr-zone--river-deep sr-process" aria-labelledby="proceso-title">
      <div className="sr-container">
        <div className="sr-section-head" data-reveal="words">
          <p className="sr-label">◇ Cómo trabajamos</p>
          <h2 id="proceso-title" className="sr-h2">
            <SplitTitle lead="De la primera llamada a" accent="resultados medidos." accentClass="sr-serif sr-accent-text" />
          </h2>
        </div>

        <ol className="sr-rows">
          {STEPS.map((step, i) => (
            <li key={step.title} className="sr-row sr-row--step" data-reveal>
              <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="sr-row-title">{step.title}</h3>
              <p className="sr-row-text">{step.text}</p>
              <p className="sr-row-data">
                <span className="sr-label">{step.meta.replace(/^\d+ · /, '')}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
