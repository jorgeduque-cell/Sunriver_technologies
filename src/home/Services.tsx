import type { ComponentType, SVGProps } from 'react';
import { SAFEGUARDS, SERVICES, type ServiceIcon } from './content';
import { BotIcon, ReelIcon, ShieldIcon, WebIcon } from './icons';

const ICONS: Record<ServiceIcon, ComponentType<SVGProps<SVGSVGElement> & { size?: number }>> = {
  reel: ReelIcon,
  bot: BotIcon,
  web: WebIcon,
};

export function Services() {
  return (
    <section id="servicios" className="sr-section sr-dark" aria-labelledby="servicios-title">
      <div className="sr-container">
        <div className="sr-section-head" data-reveal>
          <p className="sr-label">Servicios</p>
          <h2 id="servicios-title" className="sr-h2">
            Tres piezas que trabajan <span className="sr-serif sr-accent-text">juntas.</span>
          </h2>
        </div>

        <ul className="sr-services-grid">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.title} className="sr-service" data-reveal>
                <div className="sr-service-top">
                  <Icon size={30} className="sr-icon" />
                  <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="sr-h3">{s.title}</h3>
                <p className="sr-card-text">{s.text}</p>
                <ul className="sr-dash-list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="sr-price">
                  <span className="sr-price-prefix">{s.pricePrefix}</span>{' '}
                  <strong className={s.price.startsWith('[') ? 'sr-placeholder' : undefined}>
                    {s.price}
                  </strong>
                  {s.priceSuffix ? <span className="sr-price-suffix"> {s.priceSuffix}</span> : null}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="sr-diff" data-reveal>
          <div className="sr-diff-head">
            <p className="sr-label sr-label--accent">Lo que nos diferencia</p>
            <h3 className="sr-diff-title">
              Automatización <span className="sr-serif sr-accent-text">con los frenos puestos.</span>
            </h3>
          </div>
          <div className="sr-diff-body">
            <p>
              Hablamos de ciberseguridad todos los días, y se nota en lo que construimos: cada bot
              tiene solo los permisos que necesita, las acciones delicadas pasan por una persona y
              todo se puede apagar con un botón.
            </p>
            <ul className="sr-diff-tags">
              {SAFEGUARDS.map((g) => (
                <li key={g}>
                  <ShieldIcon size={16} className="sr-icon" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
