import { Fragment } from 'react';
import type { CSSProperties } from 'react';

/**
 * Parte un texto en palabras para que entren una a una al hacer scroll.
 * El texto sigue siendo texto normal (se indexa y se lee igual); el estado oculto
 * solo existe cuando el JS marca el contenedor [data-reveal="words"] como pendiente.
 */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="sr-w" style={{ '--i': start + i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

/** Titular de dos tramos: texto en Inter Tight + remate en Instrument Serif itálica. */
export function SplitTitle({
  lead,
  accent,
  accentClass = 'sr-serif',
}: {
  lead: string;
  accent: string;
  accentClass?: string;
}) {
  return (
    <>
      <Words text={lead} />{' '}
      <span className={accentClass}>
        <Words text={accent} start={lead.split(' ').length} />
      </span>
    </>
  );
}
