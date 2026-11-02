import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from './icons';

export const GUIDE_PDF_URL = '/guias/7-trampas-con-ia-contra-negocios.pdf';
const GUIDE_COVER_URL = '/guias/portada-7-trampas.webp';
const SEEN_KEY = 'sr-guia-popup';
const SHOW_DELAY_MS = 4300; // después de la animación de entrada

/**
 * ¿Llegó de Instagram? Cubre el enlace de los mensajes directos con ?guia (o ?utm_source=instagram)
 * y el navegador interno de Instagram, que manda l.instagram.com como referrer.
 */
function cameFromInstagram() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('guia')) return true;
  const source = (params.get('utm_source') || params.get('ref') || '').toLowerCase();
  if (source === 'instagram' || source === 'ig') return true;
  try {
    return /(^|\.)instagram\.com$/i.test(new URL(document.referrer).hostname);
  } catch {
    return false;
  }
}

/**
 * Pop-up con la descarga directa de la guía para quien llega desde Instagram.
 * Solo existe en el cliente (no está en el HTML prerenderizado) y se muestra una vez por sesión.
 */
export function GuidePopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!cameFromInstagram()) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* sin storage: se muestra igual */
    }
    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    if (!dialog.open) dialog.showModal();
  }, [open]);

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* sin storage */
    }
    dialogRef.current?.close();
    setOpen(false);
  };

  if (!open) return null;

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
            src={GUIDE_COVER_URL}
            width={1167}
            height={1653}
            alt="Portada de la guía: 7 trampas con IA que ya usan contra negocios"
            decoding="async"
          />
        </div>
        <p className="sr-label">Guía gratis · PDF de 11 páginas</p>
        <h2 id="sr-popup-title" className="sr-popup-title">
          7 trampas con IA que ya usan <span className="sr-serif">contra negocios.</span>
        </h2>
        <p className="sr-popup-text">
          Cada trampa con un caso real y tres acciones para frenarla, más una lista para revisar tu negocio en 5 minutos.
        </p>
        <a className="sr-btn sr-btn--primary sr-popup-cta" href={GUIDE_PDF_URL} download onClick={close}>
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
