import { CASE_LESSONS } from './content';
import { CountUp } from './CountUp';
import { SplitTitle } from './Words';

export function CaseStudy() {
  return (
    <section id="caso" className="sr-section sr-light" aria-labelledby="caso-title">
      <div className="sr-container">
        <div className="sr-split-head">
          <div data-reveal="words">
            <p className="sr-label">El caso · Más allá de lo artificial</p>
            <h2 id="caso-title" className="sr-h2">
              <SplitTitle lead="No te mostramos promesas." accent="Te mostramos nuestra cuenta." />
            </h2>
          </div>
          <p className="sr-lead" data-reveal>
            Antes de hacerlo por ti, lo probamos en lo nuestro. Cada reel de @sunriversolution se mide
            a las 24 horas y a los 7 días, y lo que funciona se vuelve regla. Así llegó un reel a
            49.000 vistas en 37 horas. Fue un reel, no una garantía: lo que te ofrecemos es el método.
          </p>
        </div>

        <ol className="sr-case-grid">
          {CASE_LESSONS.map((lesson, i) => (
            <li key={lesson.title} data-reveal>
              <div className="sr-case-card sr-tilt" data-tilt="5">
                <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="sr-h3">{lesson.title}</h3>
                <p className="sr-card-text">{lesson.text}</p>
                <p className="sr-case-data">
                  <span className="sr-label">{lesson.dataLabel}</span>
                  <span className="sr-case-value">
                    {lesson.data.prefix}
                    <CountUp value={lesson.data.to} from={lesson.data.from} />
                    {lesson.data.suffix}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
