import { useId, useState } from 'react';
import { FAQS } from './content';
import { SplitTitle } from './Words';

export function Faq() {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="preguntas" className="sr-zone sr-zone--abyss sr-faq-section" aria-labelledby="faq-title">
      <div className="sr-container sr-faq-grid">
        <div className="sr-faq-head" data-reveal="words">
          <h2 id="faq-title" className="sr-h2">
            <SplitTitle lead="Preguntas" accent="frecuentes" />
          </h2>
        </div>

        <div className="sr-faq" data-reveal>
          {FAQS.map((item, i) => {
            const isOpen = open.has(i);
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={item.q} className="sr-faq-item">
                <h3 className="sr-faq-q">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <span className="sr-faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="sr-faq-panel"
                  data-open={isOpen ? 'true' : 'false'}
                >
                  <div className="sr-faq-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
