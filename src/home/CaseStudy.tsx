import { Fragment } from 'react';
import { CASE_LESSONS, CASE_STATS, MANIFESTO, TERMINAL_LINES } from './content';
import { CountUp } from './CountUp';
import { SplitTitle } from './Words';

/** "lo probamos en lo *nuestro*." → texto con la palabra entre asteriscos en color. */
function ManifestoLine({ line }: { line: string }) {
  const parts = line.split('*');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="sr-accent-text">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function CaseStudy() {
  return (
    <section id="caso" className="sr-zone sr-zone--river sr-case" aria-labelledby="caso-title">
      <div className="sr-container">
        <div className="sr-section-head" data-reveal="words">
          <p className="sr-label">El caso · Más allá de lo artificial</p>
          <h2 id="caso-title" className="sr-h2">
            <SplitTitle lead="No te mostramos promesas." accent="Te mostramos nuestra cuenta." accentClass="sr-serif sr-accent-text" />
          </h2>
        </div>

        <div className="sr-manifesto">
          {MANIFESTO.map((line) => (
            <p key={line} className="sr-manifesto-line" data-reveal>
              <ManifestoLine line={line} />
            </p>
          ))}
        </div>

        <ul className="sr-terminal" aria-label="Así medimos">
          {TERMINAL_LINES.map((line) => (
            <li key={line} data-reveal>
              {line}
            </li>
          ))}
        </ul>

        <dl className="sr-stats" data-reveal>
          {CASE_STATS.map((s) => (
            <div key={s.key}>
              <dt className="sr-visually-hidden">{s.key.replace(/_/g, ' ')}</dt>
              <dd>
                <span className="sr-stats-value">{'value' in s ? <CountUp value={s.value} /> : s.text}</span>
                <span className="sr-stats-key" aria-hidden="true">
                  _{s.key}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ol className="sr-rows" aria-label="Lo que aprendimos">
          {CASE_LESSONS.map((lesson, i) => (
            <li key={lesson.title} className="sr-row" data-reveal>
              <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="sr-row-title">{lesson.title}</h3>
              <p className="sr-row-text">{lesson.text}</p>
              <p className="sr-row-data">
                <span className="sr-label">{lesson.dataLabel}</span>
                <span className="sr-row-value">
                  {lesson.data.prefix}
                  <CountUp value={lesson.data.to} from={lesson.data.from} />
                  {lesson.data.suffix}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
