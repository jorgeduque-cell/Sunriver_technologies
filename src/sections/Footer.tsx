import { Linkedin, Instagram, Mail, Phone, Github } from 'lucide-react';
import logo from '../assets/logo.png';

const footerLinks = {
  servicios: [
    { label: 'Automatización de Leads', href: '#servicios' },
    { label: 'Gestión Administrativa', href: '#servicios' },
    { label: 'Integración de Sistemas', href: '#servicios' },
    { label: 'Agentes IA', href: '#servicios' },
    { label: 'Desarrollo de Software', href: '#servicios' },
  ],
  compania: [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-sunriver-navy-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <img src={logo} alt="SunRiver Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </a>

            {/* Tagline */}
            <p className="text-gray-400 mb-6 max-w-xs">
              Tecnología que fluye, negocios que crecen. Transformamos procesos manuales en ecosistemas digitales inteligentes.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="mailto:jorge_duque@sunriver.cloud"
                className="flex items-center gap-2 text-gray-400 hover:text-sunriver-orange transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">jorge_duque@sunriver.cloud</span>
              </a>
              <a
                href="https://wa.me/573124183002?text=%F0%9F%9A%80%20Hola%20SunRiver%2C%20estoy%20interesado%20en%20un%20desarrollo%20web%20con%20IA%20para%20mi%20negocio.%20%C2%BFPodemos%20agendar%20una%20consulta%3F"
                className="flex items-center gap-2 text-gray-400 hover:text-sunriver-orange transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+57 312 4183002</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/solutionrssr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-sunriver-orange transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/sunriversolution/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/jorgeduque-cell/Sunriver_technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-sunriver-orange transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Compañía</h3>
            <ul className="space-y-3">
              {footerLinks.compania.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-sunriver-orange transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-sunriver-orange transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SunRiver Solutions. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm">
            Diseñado con <span className="text-sunriver-orange">♥</span> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
