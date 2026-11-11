import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../components/Logo';

/** `pathname` llega desde la página Astro; el #hash solo existe en el navegador. */
const Navbar = ({ pathname }: { pathname: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Portafolio', path: '/', hash: '#portafolio' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Metodología', path: '/metodologia' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/contacto' },
  ];

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.hash) {
      return pathname === item.path && hash === item.hash;
    }
    if (item.path === '/metodologia') {
      return pathname === item.path && hash !== '#sohi';
    }
    return pathname === item.path;
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.hash && pathname === item.path) {
      // Already on the right page, scroll to the section
      const el = document.querySelector(item.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (!item.hash) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-cinematic ${isScrolled
        ? 'glass shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <Logo className="h-12 w-auto" alt="SunRiver Logo" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = isItemActive(item);
              return (
                <a
                  key={index}
                  href={item.hash ? `${item.path}${item.hash}` : item.path}
                  onClick={() => handleNavClick(item)}
                  className={`relative text-sm font-medium transition-colors duration-300 group ${isActive ? 'text-sunriver-orange' : 'text-gray-700 hover:text-sunriver-orange'}`}
                  style={{ animationDelay: `${100 + index * 80}ms` }}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-1/2 h-0.5 bg-sunriver-orange transition-all duration-300 group-hover:w-full group-hover:left-0 ${isActive ? 'w-full left-0' : 'w-0'}`} />
                </a>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/contacto"
              className="px-6 py-2.5 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105 hover:-translate-y-0.5"
            >
              Auditoría Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-cinematic ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.hash ? `${item.path}${item.hash}` : item.path}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-4 py-3 hover:text-sunriver-orange hover:bg-sunriver-orange/5 rounded-lg transition-colors ${isItemActive(item) ? 'bg-sunriver-orange/10 text-sunriver-orange font-semibold' : 'text-gray-700'}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contacto"
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0, 0); }}
              className="block w-full text-center px-4 py-3 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white font-semibold rounded-lg mt-2"
            >
              Auditoría Gratis
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
