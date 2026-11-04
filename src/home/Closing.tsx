import { useRef } from 'react';
import { CONTACT } from './content';
import { ArrowRight, WhatsAppIcon } from './icons';
import { MediaSlot } from './MediaSlot';
import { useScrollVar } from './motion';
import { SplitTitle } from './Words';

export function Testimonial() {
  return (
    <section className="sr-zone sr-zone--river-deep sr-testimonial-section" aria-label="Testimonio">
      <div className="sr-container">
        <figure className="sr-testimonial" data-reveal>
          <span className="sr-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            <p>
              Esta automatización de reservas resolvió el 90 % del trabajo manual que tenía que
              hacer en mi empresa. Estoy muy contento.
            </p>
          </blockquote>
          <figcaption className="sr-label">Nicolás Suárez · CEO · Eventos deportivos 90+1</figcaption>
        </figure>
      </div>
    </section>
  );
}

const SEAL_TEXT = 'SunRiver Solution · Más allá de lo artificial · ';

/** Cierre: "llegaste al fondo", CTA gigante, banda, datos de contacto, último reel y volver arriba. */
export function Contact() {
  const bandRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  useScrollVar(bandRef);
  useScrollVar(sealRef);

  return (
    <section id="contacto" className="sr-zone sr-zone--ink sr-finale" aria-labelledby="contacto-title">
      <div className="sr-container" data-reveal="words">
        <p className="sr-label">Llegaste al fondo — hablemos</p>
        <h2 id="contacto-title" className="sr-finale-title">
          <a href={CONTACT.whatsappUrl} className="sr-finale-link" target="_blank" rel="noopener noreferrer">
            <SplitTitle lead="¿Hablamos" accent="15 minutos?" accentClass="sr-serif sr-accent-text" />
            <ArrowRight className="sr-finale-arrow" size={48} />
          </a>
        </h2>
        <p className="sr-lead">
          Cuéntanos qué vendes y cómo te encuentran tus clientes hoy. Te respondemos el mismo día.
        </p>
      </div>

      <div ref={bandRef} className="sr-band" aria-hidden="true">
        <div className="sr-band-row">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>Más allá de lo artificial</span>
          ))}
        </div>
      </div>

      <div className="sr-container sr-finale-grid">
        <div className="sr-finale-contact" data-reveal>
          <a href={`mailto:${CONTACT.email}`} className="sr-finale-mail">
            {CONTACT.email}
          </a>
          <p className="sr-finale-line">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} />
              {CONTACT.whatsappDisplay}
            </a>
          </p>
          <p className="sr-finale-line sr-finale-muted">Bogotá, Colombia</p>
          <ul className="sr-pills" aria-label="Redes y contacto">
            <li>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>Correo</a>
            </li>
          </ul>
        </div>

        <a
          href={CONTACT.instagramUrl}
          className="sr-finale-reel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver el último reel en Instagram (${CONTACT.instagramHandle})`}
          data-reveal
        >
          <MediaSlot id="ultimo-reel" decorative sizes="(max-width: 767px) 92vw, 36vw" />
          <span className="sr-label sr-finale-reel-tag">Último reel — {CONTACT.instagramHandle}</span>
        </a>
      </div>

      <div className="sr-container sr-finale-bottom">
        <a href="#top" className="sr-btn sr-btn--ghost sr-btn--sm">
          Volver arriba
          <ArrowRight className="sr-arrow sr-arrow--up" size={16} />
        </a>
        <div ref={sealRef} className="sr-seal" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="120" height="120" focusable="false">
            <defs>
              <path id="sr-seal-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
            </defs>
            {/* textLength = circunferencia (2π·46): el texto da la vuelta justa, sin montarse */}
            <text textLength={289} lengthAdjust="spacingAndGlyphs">
              <textPath href="#sr-seal-path" textLength={289} lengthAdjust="spacingAndGlyphs">
                {SEAL_TEXT}
              </textPath>
            </text>
            <circle cx="60" cy="60" r="9" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sr-footer">
      <div className="sr-container sr-footer-inner">
        <p>© 2026 SunRiver Solutions · Bogotá, Colombia</p>
        <p>Contenido de «Más allá de lo artificial»</p>
      </div>
    </footer>
  );
}
