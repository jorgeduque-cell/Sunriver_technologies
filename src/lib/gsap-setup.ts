import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ajustes comunes de las animaciones de las páginas internas (antes vivían en MainLayout).
// Se importa al principio de cada vista que anima secciones con ScrollTrigger.
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
});
