import { useRef } from 'react';
import { CONTACT } from './content';
import { RingsLogo } from './icons';
import { LeadForm } from './LeadForm';
import { useScrollVar } from './motion';
import { SplitTitle } from './Words';

/**
 * La guía como libro 3D (CSS preserve-3d): portada, lomo, cantos y contraportada.
 * Gira con el scroll (--p) y, en escritorio, también hacia el mouse (data-tilt).
 */
function GuideBook() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVar(ref);
  return (
    <div
      ref={ref}
      className="sr-book-scene"
      data-tilt="16"
      role="img"
      aria-label="Portada de la guía: 7 trampas con IA que ya están usando contra negocios. Más allá de lo artificial."
    >
      <div className="sr-book">
        <div className="sr-book-face sr-book-front sr-cover">
          <span className="sr-cover-label">Guía · Para negocios</span>
          <span className="sr-cover-title">
            7 trampas con IA que ya están usando{' '}
            <span className="sr-serif sr-accent-text">contra negocios.</span>
          </span>
          <RingsLogo className="sr-cover-logo" size={84} />
          <span className="sr-cover-foot">Más allá de lo artificial</span>
        </div>
        <div className="sr-book-face sr-book-back" />
        <div className="sr-book-face sr-book-spine">
          <span>Más allá de lo artificial · 7 trampas</span>
        </div>
        <div className="sr-book-face sr-book-pages" />
        <div className="sr-book-face sr-book-top" />
        <div className="sr-book-face sr-book-bottom" />
      </div>
      <div className="sr-book-shadow" />
    </div>
  );
}

export function Guide() {
  return (
    <section id="guia" className="sr-section sr-light" aria-labelledby="guia-title">
      <div className="sr-container sr-guide-grid">
        <div className="sr-cover-wrap" data-reveal>
          <GuideBook />
        </div>

        <div className="sr-guide-copy" data-reveal="words">
          <p className="sr-label">Guía gratis · 11 páginas</p>
          <h2 id="guia-title" className="sr-h2">
            <SplitTitle lead="Las 7 trampas con IA que ya usan" accent="contra negocios como el tuyo." />
          </h2>
          <p className="sr-lead">
            Videollamadas falsas del jefe, proveedores que «cambian de cuenta», datos pegados en chats
            de IA… Cada trampa con un caso real y tres acciones para frenarla. Al final, una lista
            para revisar tu negocio en 5 minutos.
          </p>
          <LeadForm />
          <p className="sr-guide-note">
            ¿Nos sigues en Instagram? Comenta <strong>MAPA</strong> en el{' '}
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
              último reel
            </a>{' '}
            y te llega al instante.
          </p>
        </div>
      </div>
    </section>
  );
}
