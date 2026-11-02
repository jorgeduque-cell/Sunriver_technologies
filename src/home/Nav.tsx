import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { NAV_LINKS } from './content';
import { SunLogo } from './icons';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fondo sólido al hacer scroll.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (window.scrollY > 8) update(); // p. ej. al recargar a mitad de página
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Menú abierto: bloquea el scroll, Esc cierra, al pasar a escritorio se cierra.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = () => mq.matches && close(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  // Mantiene el foco dentro de la cabecera mientras el menú cubre la pantalla.
  const onHeaderKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
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
    <header
      ref={headerRef}
      className="sr-nav"
      data-scrolled={scrolled || open ? 'true' : 'false'}
      onKeyDown={onHeaderKeyDown}
    >
      <nav className="sr-container sr-nav-inner" aria-label="Principal">
        <a href="#top" className="sr-logo" aria-label="SunRiver, ir al inicio">
          <SunLogo className="sr-logo-mark" />
          <span>SunRiver</span>
        </a>

        <ul className="sr-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className="sr-btn sr-btn--primary sr-btn--sm sr-nav-cta">
          Diagnóstico gratis
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="sr-menu-toggle"
          aria-expanded={open}
          aria-controls="sr-mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-menu-toggle-bar" aria-hidden="true" />
          <span className="sr-menu-toggle-bar" aria-hidden="true" />
        </button>
      </nav>

      <div id="sr-mobile-menu" ref={menuRef} className="sr-mobile-menu" hidden={!open}>
        <ul className="sr-container sr-mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => close(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="sr-container">
          <a
            href="#contacto"
            className="sr-btn sr-btn--primary sr-btn--block"
            onClick={() => close(false)}
          >
            Diagnóstico gratis
          </a>
        </div>
      </div>
    </header>
  );
}
