import { useEffect, useRef } from 'react';
import { CONTACT, type ProjectMore } from './content';
import type { MediaId } from './media';
import { MediaSlot } from './MediaSlot';
import { ArrowRight } from './icons';

type Project = { name: string; detail: string; media: string; more?: ProjectMore };

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Ficha de un proyecto en un <dialog> modal: fotos en grande, cómo funciona, qué incluye y un
 * botón para pedir algo parecido. Esc, el botón × y un clic en el fondo la cierran; al cerrar,
 * el navegador devuelve el foco a la tarjeta que la abrió. Mientras está abierta, la página no
 * se desplaza por detrás.
 */
export function ProjectDialog({
  project,
  number,
  position,
  total,
  onClose,
  onStep,
}: {
  project: Project & { more: ProjectMore };
  /** Número de la tarjeta en la galería (01, 02…). */
  number: number;
  /** Posición entre los proyectos que tienen ficha, para "Anterior / Siguiente". */
  position: number;
  total: number;
  onClose: () => void;
  onStep: (step: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { more } = project;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  // Al pasar a otro proyecto, se vuelve al principio de la ficha.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
    ref.current?.scrollTo({ top: 0 });
  }, [project.name]);

  const close = () => {
    ref.current?.close();
    onClose();
  };

  const whatsapp = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(
    `Hola, vi el proyecto ${project.name} en su página y quiero algo así para mi negocio.`,
  )}`;

  return (
    <dialog
      ref={ref}
      className="sr-project-dialog"
      aria-labelledby="sr-project-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <div className="sr-project-card sr-zone sr-zone--abyss">
        <button type="button" className="sr-project-close" aria-label="Cerrar" onClick={close}>
          <span aria-hidden="true">×</span>
        </button>

        <div className="sr-project-media">
          <MediaSlot key={project.media} id={project.media as MediaId} sizes="(max-width: 899px) 92vw, 52vw" eager />
        </div>

        <div className="sr-project-body" ref={bodyRef}>
          <p className="sr-label">
            Proyecto {pad(number)} · {project.detail}
          </p>
          <h2 id="sr-project-title" className="sr-project-title">
            {project.name}
          </h2>
          <p className="sr-project-intro">{more.intro}</p>

          {more.results ? (
            <ul className="sr-project-results" aria-label="Resultados">
              {more.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : null}

          <h3 className="sr-project-h3">Cómo funciona</h3>
          <ol className="sr-project-steps">
            {more.how.map((step, i) => (
              <li key={step.title}>
                <span className="sr-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="sr-project-h3">Qué incluye</h3>
          <ul className="sr-project-tags">
            {more.includes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="sr-project-actions">
            <a className="sr-btn sr-btn--primary" href={whatsapp} target="_blank" rel="noopener noreferrer">
              Quiero algo así
              <ArrowRight className="sr-arrow" size={18} />
            </a>
            {more.link ? (
              <a className="sr-btn sr-btn--ghost" href={more.link.href} target="_blank" rel="noopener noreferrer">
                {more.link.label}
              </a>
            ) : null}
          </div>

          {total > 1 ? (
            <nav className="sr-project-nav" aria-label="Otros proyectos">
              <button type="button" onClick={() => onStep(-1)}>
                <ArrowRight size={16} className="sr-project-prev" />
                Anterior
              </button>
              <span>
                {position + 1} / {total}
              </span>
              <button type="button" onClick={() => onStep(1)}>
                Siguiente
                <ArrowRight size={16} />
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
