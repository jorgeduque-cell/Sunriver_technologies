import { useEffect, useState } from 'react';
import { CONTACT } from './content';
import { ArrowRight, MailIcon, WhatsAppIcon } from './icons';
import { SplitTitle } from './Words';

export function Testimonial() {
  return (
    <section className="sr-section sr-dark sr-section--flush-top" aria-label="Testimonio">
      <div className="sr-container">
        <figure className="sr-testimonial" data-reveal>
          <span className="sr-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            <p className="sr-serif">
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

export function Contact() {
  return (
    <section id="contacto" className="sr-section sr-dark sr-contact" aria-labelledby="contacto-title">
      <div className="sr-container sr-contact-grid">
        <div data-reveal="words">
          <h2 id="contacto-title" className="sr-h2 sr-h2--xl">
            <SplitTitle lead="¿Hablamos" accent="15 minutos?" accentClass="sr-serif sr-accent-text" />
          </h2>
          <p className="sr-lead">
            Cuéntanos qué vendes y cómo te encuentran tus clientes hoy. Te respondemos el mismo día.
          </p>
          <div className="sr-actions">
            <a
              href={CONTACT.whatsappUrl}
              className="sr-btn sr-btn--primary"
              data-magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Escribir por WhatsApp
              <ArrowRight className="sr-arrow" size={18} />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="sr-btn sr-btn--ghost">
              <MailIcon size={20} />
              Enviar un correo
            </a>
          </div>
        </div>

        <dl className="sr-contact-list" data-reveal>
          <div>
            <dt className="sr-label">WhatsApp</dt>
            <dd>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="sr-label">Correo</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
          </div>
          <div>
            <dt className="sr-label">Instagram</dt>
            <dd>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagramHandle}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sr-footer sr-dark">
      <div className="sr-container sr-footer-inner">
        <p>© 2026 SunRiver Solutions · Bogotá, Colombia</p>
        <p>Contenido de «Más allá de lo artificial»</p>
      </div>
    </footer>
  );
}

/** Botón flotante de WhatsApp: se oculta cuando la sección de contacto está en pantalla. */
export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById('contacto');
    if (!contact || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={CONTACT.whatsappUrl}
      className="sr-wa-float"
      data-hidden={hidden ? 'true' : 'false'}
      aria-label="Escribir por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
