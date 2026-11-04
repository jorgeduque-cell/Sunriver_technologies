import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { CONTACT, NAV_LINKS } from './content';
import { ArrowRight, SunRiverMark, WhatsAppIcon } from './icons';

/**
 * Barra flotante abajo (WhatsApp · logo · menú) y capa de menú a pantalla completa.
 * Accesible: aria-expanded, Esc cierra y devuelve el foco, el foco no sale del menú abierto
 * y el scroll de la página queda bloqueado mientras está abierto.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // El foco da la vuelta dentro de la barra + el menú mientras está abierto.
  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (!open || e.key !== 'Tab' || !headerRef.current) return;
    const focusables = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header ref={headerRef} className="sr-pill-wrap" data-open={open ? 'true' : 'false'} onKeyDown={onKeyDown}>
      <div id="sr-menu" ref={menuRef} className="sr-menu" hidden={!open}>
        <div className="sr-container sr-menu-inner">
          <p className="sr-label">Menú</p>
          <ul className="sr-menu-links">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => close(false)}>
                  <span className="sr-num">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="sr-menu-foot">
            <a href="#contacto" className="sr-btn sr-btn--primary" onClick={() => close(false)}>
              Diagnóstico gratis
              <ArrowRight className="sr-arrow" size={18} />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="sr-menu-mail">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      <nav className="sr-pill" aria-label="Principal">
        <a
          href={CONTACT.whatsappUrl}
          className="sr-pill-btn"
          aria-label="Escribir por WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={21} />
        </a>
        <a href="#top" className="sr-pill-logo" aria-label="SunRiver, ir al inicio">
          <SunRiverMark size={28} />
          <span aria-hidden="true">SunRiver</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="sr-pill-btn sr-menu-toggle"
          aria-expanded={open}
          aria-controls="sr-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-menu-toggle-bar" aria-hidden="true" />
          <span className="sr-menu-toggle-bar" aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
