import { CONTACT } from './content';
import { RingsLogo } from './icons';
import { LeadForm } from './LeadForm';

function GuideCover() {
  return (
    <div
      className="sr-cover"
      role="img"
      aria-label="Portada de la guía: 7 trampas con IA que ya están usando contra negocios. Más allá de lo artificial."
    >
      <span className="sr-cover-label">Guía · Para negocios</span>
      <span className="sr-cover-title">
        7 trampas con IA que ya están usando{' '}
        <span className="sr-serif sr-accent-text">contra negocios.</span>
      </span>
      <RingsLogo className="sr-cover-logo" size={92} />
      <span className="sr-cover-foot">Más allá de lo artificial</span>
    </div>
  );
}

export function Guide() {
  return (
    <section id="guia" className="sr-section sr-light" aria-labelledby="guia-title">
      <div className="sr-container sr-guide-grid">
        <div className="sr-cover-wrap" data-reveal>
          <GuideCover />
        </div>

        <div className="sr-guide-copy" data-reveal>
          <p className="sr-label">Guía gratis · 11 páginas</p>
          <h2 id="guia-title" className="sr-h2">
            Las 7 trampas con IA que ya usan{' '}
            <span className="sr-serif">contra negocios como el tuyo.</span>
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
