import { useState } from 'react';
import { CountUp } from './CountUp';
import { ArrowRight, CheckIcon, PauseIcon, PlayIcon } from './icons';
import { PROJECTS } from './content';

function ReelCard() {
  return (
    <article className="sr-card sr-card--panel sr-reel" aria-label="Resultado del reel 007">
      <div className="sr-card-top">
        <span className="sr-label">Reel 007 · Cuenta propia</span>
        <span className="sr-label sr-label--accent">37 horas</span>
      </div>
      <p className="sr-reel-num">
        <CountUp value={49000} />
      </p>
      <p className="sr-reel-caption">vistas en Instagram y Facebook</p>
      <dl className="sr-reel-stats">
        <div>
          <dt>seguidores nuevos</dt>
          <dd>+425</dd>
        </div>
        <div>
          <dt>gente que no nos seguía</dt>
          <dd>99,6 %</dd>
        </div>
      </dl>
    </article>
  );
}

function BotCard() {
  // La conversación se repite sola: WCAG 2.2.2 pide poder pausarla.
  const [paused, setPaused] = useState(false);
  return (
    <article
      className="sr-card sr-card--paper sr-bot"
      aria-label="Ejemplo del bot de comentarios"
      data-paused={paused ? 'true' : 'false'}
    >
      <div className="sr-card-top">
        <span className="sr-label">
          <span className="sr-live-dot" aria-hidden="true" />
          Bot de comentarios · En vivo
        </span>
        <button
          type="button"
          className="sr-anim-toggle"
          aria-label="Pausar animación"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
        </button>
      </div>
      <div className="sr-chat">
        <p className="sr-bubble sr-bubble--in">
          <strong>@laura.cafe</strong> comentó: MAPA
        </p>
        <div className="sr-chat-reply">
          <span className="sr-bubble sr-bubble--typing" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <p className="sr-bubble sr-bubble--out">
            ¡Hola, Laura! Aquí va tu guía. ¿Tienes un negocio? Respóndeme SÍ y te digo qué aplica al
            tuyo.
          </p>
        </div>
        <p className="sr-chat-meta">
          <CheckIcon size={14} />
          Enviado en 3 segundos
        </p>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <>
      <section className="sr-hero sr-dark" aria-labelledby="hero-title">
        <div className="sr-container sr-hero-grid">
          <div className="sr-hero-copy">
            <p className="sr-label sr-hero-label">Contenido + automatización con IA · Bogotá</p>
            <h1 id="hero-title" className="sr-h1">
              <span className="sr-h1-line">Hacemos que te vean.</span>{' '}
              <span className="sr-h1-line sr-serif sr-accent-text">
                Y que nadie se quede sin respuesta.
              </span>
            </h1>
            <p className="sr-lead sr-hero-lead">
              Creamos el contenido que lleva tu marca a gente nueva y los bots que atienden a cada
              persona que llega: en Instagram, en WhatsApp y en tu web.
            </p>
            <div className="sr-actions">
              <a href="#contacto" className="sr-btn sr-btn--primary">
                Agenda tu diagnóstico de 15 min
                <ArrowRight className="sr-arrow" size={18} />
              </a>
              <a href="#caso" className="sr-btn sr-btn--ghost">
                Ver el caso de las 49.000 vistas
              </a>
            </div>
            <p className="sr-hero-note">
              Sin costo y sin compromiso. Te decimos qué cambiaríamos primero.
            </p>
          </div>

          <div className="sr-hero-cards">
            <ReelCard />
            <BotCard />
          </div>
        </div>
      </section>

      <section className="sr-projects sr-dark" aria-label="Proyectos">
        <div className="sr-container sr-projects-inner">
          <p className="sr-label">Proyectos</p>
          <ul className="sr-projects-list">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong>
                <span aria-hidden="true" className="sr-projects-dot">
                  ·
                </span>
                <span>{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
