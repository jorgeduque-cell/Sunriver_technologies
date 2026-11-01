import { Bot, Globe, Code2, type LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'automation' | 'web' | 'platform';
  color: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'reservation-bot',
    title: 'ReservationSystem.BOT',
    subtitle: 'Bot de Reservas Automatizadas',
    description:
      'Sistema de automatización inteligente que realiza reservas automáticas mediante web scraping, con monitoreo continuo y notificaciones en tiempo real vía Telegram.',
    longDescription:
      'Bot de producción desplegado en VPS que opera 24/7. Automatiza el proceso completo de búsqueda y reserva de canchas deportivas mediante scraping web. Incluye integración con Telegram para comandos y notificaciones, sistema de pagos automatizado, y tests unitarios con Jest. Arquitectura robusta con PM2 para process management.',
    icon: Bot,
    technologies: ['TypeScript', 'Web Scraping', 'Telegram API', 'Jest', 'PM2', 'VPS'],
    githubUrl: 'https://github.com/jorgeduque-cell/ResevationSystem.BOT',
    category: 'automation',
    color: 'from-emerald-500 to-teal-600',
    metrics: [
      { label: 'Lenguaje', value: '98% TS' },
      { label: 'Operación', value: '24/7' },
      { label: 'Tests', value: 'Jest' },
    ],
  },
  {
    id: 'pachanga-website',
    title: 'Pachanga Website',
    subtitle: 'Plataforma Web para Entretenimiento',
    description:
      'Sitio web profesional para discoteca con diseño inmersivo, sistema de eventos y experiencia de usuario optimizada para conversión.',
    longDescription:
      'Plataforma web completa para el sector de entretenimiento nocturno. Diseño visual impactante con animaciones fluidas, galería de eventos, sistema de reservas integrado y optimización SEO para búsquedas locales. Construido con arquitectura moderna en TypeScript para máxima escalabilidad.',
    icon: Globe,
    technologies: ['TypeScript', 'React', 'CSS Animations', 'SEO', 'Responsive'],
    githubUrl: 'https://github.com/jorgeduque-cell/pachanga-website',
    category: 'web',
    color: 'from-violet-500 to-purple-600',
    metrics: [
      { label: 'Lenguaje', value: '94% TS' },
      { label: 'Tipo', value: 'Web App' },
      { label: 'SEO', value: 'Optimizado' },
    ],
  },
  {
    id: 'sunriver-platform',
    title: 'Sunriver Technologies',
    subtitle: 'Ecosistema Digital Propio',
    description:
      'Plataforma tecnológica de SunRiver: React 19, Three.js, GSAP, IA integrada y sistema de blog con CMS. La web que estás viendo ahora.',
    longDescription:
      'Ecosistema digital construido con las tecnologías más avanzadas del mercado: React 19, TypeScript estricto, Three.js para visualizaciones 3D, GSAP para animaciones cinematográficas, Radix UI para accesibilidad, y Tailwind CSS. Incluye chatbot con IA, sistema de blog con categorías, formulario de contacto con validación Zod, y SEO avanzado con schema markup.',
    icon: Code2,
    technologies: [
      'React 19',
      'TypeScript',
      'Three.js',
      'GSAP',
      'Tailwind',
      'Radix UI',
      'Zod',
      'Vite',
    ],
    githubUrl: 'https://github.com/jorgeduque-cell/Sunriver_technologies',
    liveUrl: 'https://sunriver.solutions',
    category: 'platform',
    color: 'from-sunriver-orange to-amber-500',
    metrics: [
      { label: 'Lenguaje', value: '94% TS' },
      { label: 'Stack', value: 'React 19' },
      { label: '3D', value: 'Three.js' },
    ],
  },
];

export const projectCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'automation', label: 'Automatización' },
  { id: 'web', label: 'Desarrollo Web' },
  { id: 'platform', label: 'Plataformas' },
] as const;
