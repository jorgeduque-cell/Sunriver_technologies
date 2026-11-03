import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from './icons';

/** Una entrada por guía. El DM de cada reel lleva su enlace (?guia=1, ?guia=atajo…). */
const GUIDES = {
  trampas: {
    pdf: '/guias/7-trampas-con-ia-contra-negocios.pdf',
    cover: '/guias/portada-7-trampas.webp',
    coverWidth: 1167,
    coverHeight: 1653,
    coverAlt: 'Portada de la guía: 7 trampas con IA que ya usan contra negocios',
    label: 'Guía gratis · PDF de 11 páginas',
    title: '7 trampas con IA que ya usan',
    titleAccent: 'contra negocios.',
    text: 'Cada trampa con un caso real y tres acciones para frenarla, más una lista para revisar tu negocio en 5 minutos.',
  },
  atajo: {
    pdf: '/guias/el-atajo-explicado-en-simple.pdf',
    cover: '/guias/portada-el-atajo.webp',
    coverWidth: 1200,
    coverHeight: 1600,
    coverAlt: 'Portada de la guía: El atajo, explicado en simple',
    label: 'Guía gratis · PDF de 6 páginas',
    title: 'El atajo,',
    titleAccent: 'explicado en simple.',
    text: 'Qué dicen las dos IA, qué cambia y qué no, en qué va el veredicto y los enlaces a las pruebas originales.',
  },
} as const;

type GuideId = keyof typeof GUIDES;

export const GUIDE_PDF_URL = GUIDES.trampas.pdf;
const SEEN_KEY_PREFIX = 'sr-guia-popup-';
const SHOW_DELAY_MS = 4300; // después de la animación de entrada

/**
 * ¿Qué guía mostrar? ?guia=atajo abre la del atajo. ?guia=1 (o cualquier otro ?guia), ?utm_source=instagram
 * y el navegador interno de Instagram, que manda l.instagram.com como referrer, abren la de las 7 trampas.
 */
function guideFromVisit(): GuideId | null {
  const params = new URLSearchParams(window.location.search);
  if (params.has('guia')) return (params.get('guia') || '').trim().toLowerCase() === 'atajo' ? 'atajo' : 'trampas';
  const source = (params.get('utm_source') || params.get('ref') || '').toLowerCase();
  if (source === 'instagram' || source === 'ig') return 'trampas';
  try {
    return /(^|\.)instagram\.com$/i.test(new URL(document.referrer).hostname) ? 'trampas' : null;
  } catch {
    return null;
  }
}

/**
 * Pop-up con la descarga directa de la guía para quien llega desde Instagram.
 * Solo existe en el cliente (no está en el HTML prerenderizado) y se muestra una vez por sesión y por guía.
 */
export function GuidePopup() {
  const [guideId, setGuideId] = useState<GuideId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const id = guideFromVisit();
    if (!id) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY_PREFIX + id)) return;
    } catch {
      /* sin storage: se muestra igual */
    }
    const t = window.setTimeout(() => setGuideId(id), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!guideId || !dialog) return;
    if (!dialog.open) dialog.showModal();
  }, [guideId]);

  const close = () => {
    try {
      if (guideId) sessionStorage.setItem(SEEN_KEY_PREFIX + guideId, '1');
    } catch {
      /* sin storage */
    }
    dialogRef.current?.close();
    setGuideId(null);
  };

  if (!guideId) return null;
  const guide = GUIDES[guideId];

  return (
    <dialog
      ref={dialogRef}
      className="sr-popup sr-light"
      aria-labelledby="sr-popup-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        // Clic en el fondo (el propio <dialog>, fuera de la tarjeta) cierra.
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="sr-popup-card">
        <button type="button" className="sr-popup-close" aria-label="Cerrar" onClick={close}>
          <span aria-hidden="true">×</span>
        </button>
        <div className="sr-popup-cover">
          <img
            src={guide.cover}
            width={guide.coverWidth}
            height={guide.coverHeight}
            alt={guide.coverAlt}
            decoding="async"
          />
        </div>
        <p className="sr-label">{guide.label}</p>
        <h2 id="sr-popup-title" className="sr-popup-title">
          {guide.title} <span className="sr-serif">{guide.titleAccent}</span>
        </h2>
        <p className="sr-popup-text">{guide.text}</p>
        <a className="sr-btn sr-btn--primary sr-popup-cta" href={guide.pdf} download onClick={close}>
          Descargar la guía
          <ArrowRight className="sr-arrow" size={18} />
        </a>
        <button type="button" className="sr-popup-skip" onClick={close}>
          Ahora no
        </button>
      </div>
    </dialog>
  );
}
