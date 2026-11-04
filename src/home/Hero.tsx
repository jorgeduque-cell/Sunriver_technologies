import { useState } from 'react';
import type { ReactNode } from 'react';
import { CountUp } from './CountUp';
import { FluidHero } from './FluidHero';
import { MediaSlot } from './MediaSlot';
import type { MediaId } from './media';
import { ArrowRight, CheckIcon, PauseIcon, PlayIcon, SunRiverMark } from './icons';

/** Mini conversación del bot de comentarios (se repite: tiene botón de pausa, WCAG 2.2.2). */
function BotDemo() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="sr-bot" data-paused={paused ? 'true' : 'false'}>
      <button
        type="button"
        className="sr-anim-toggle"
        aria-label="Pausar animación"
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
      >
        {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
      </button>
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
          <p className="sr-bubble sr-bubble--out">¡Hola, Laura! Aquí va tu guía. ¿Tienes un negocio? Respóndeme SÍ.</p>
        </div>
        <p className="sr-chat-meta">
          <CheckIcon size={13} />
          Enviado en 3 segundos
        </p>
      </div>
    </div>
  );
}

function Tile({
  num,
  foot,
  media,
  value,
  caption,
  still = false,
  children,
}: {
  num: string;
  foot: string;
  media?: MediaId;
  value?: ReactNode;
  caption?: string;
  /** Si la foto es un carrusel, aquí se muestra solo la primera imagen (la tarjeta es chica). */
  still?: boolean;
  children?: ReactNode;
}) {
  return (
    <li className="sr-tile">
      <figure className="sr-tile-frame sr-tilt" data-tilt="6">
        {media ? <MediaSlot id={media} still={still} sizes="(max-width: 767px) 46vw, 20vw" /> : children}
        {value ? (
          <figcaption className="sr-tile-over">
            <span className="sr-tile-value">{value}</span>
            {caption ? <span className="sr-tile-caption">{caption}</span> : null}
          </figcaption>
        ) : null}
      </figure>
      <p className="sr-tile-foot">
        <span className="sr-num">{num}</span>
        {foot}
      </p>
    </li>
  );
}

export function Hero() {
  return (
    <section className="sr-hero sr-zone sr-zone--foam" aria-labelledby="hero-title">
      <FluidHero />
      <div className="sr-container sr-hero-inner">
        <div className="sr-hero-top">
          <span className="sr-label">SunRiver Solution</span>
          <SunRiverMark size={42} idPrefix="srm-hero" className="sr-hero-mark" />
          <span className="sr-label sr-hero-top-right">Contenido + automatización con IA</span>
        </div>

        <p className="sr-wordmark" aria-hidden="true">
          <span className="sr-wordmark-sun">Sun</span>
          <span className="sr-wordmark-river">River</span>
        </p>

        <div className="sr-hero-body">
          <h1 id="hero-title" className="sr-h1">
            <span className="sr-h1-line">Hacemos que te vean.</span>{' '}
            <span className="sr-h1-line sr-serif sr-accent-text">Y que nadie se quede sin respuesta.</span>
          </h1>
          <div className="sr-hero-side">
            <p className="sr-lead sr-hero-lead">
              Creamos el contenido que lleva tu marca a gente nueva y los bots que atienden a cada
              persona que llega: en Instagram, en WhatsApp y en tu web.
            </p>
            <div className="sr-actions">
              <a href="#contacto" className="sr-btn sr-btn--primary" data-magnetic>
                Agenda tu diagnóstico de 15 min
                <ArrowRight className="sr-arrow" size={18} />
              </a>
              <a href="#caso" className="sr-btn sr-btn--ghost">
                Ver el caso del millón de vistas
              </a>
            </div>
            <p className="sr-hero-note">Sin costo y sin compromiso. Te decimos qué cambiaríamos primero.</p>
          </div>
        </div>

        <ol className="sr-tiles" aria-label="Resultados y proyectos">
          <Tile num="01" foot="Reel 007 · cuenta propia" media="proyecto-reel" value={<CountUp value={1000000} />} caption="vistas · las primeras 49.000 en 37 h" />
          <Tile num="02" foot="El mismo reel" media="cuenta-estadisticas" value="+425" caption="seguidores nuevos" />
          <Tile num="03" foot="Bot de comentarios · en vivo">
            <BotDemo />
          </Tile>
          <Tile num="04" foot="Proyecto" media="proyecto-pyp" still value="PyP Liquors" caption="página web con CRM" />
          <Tile num="05" foot="Proyecto" media="proyecto-venco" still value="Venco Oil" caption="inventario, clientes y rutas" />
        </ol>
      </div>
    </section>
  );
}
