import { CategoryInfo } from '../types/blog';

export const categories: CategoryInfo[] = [
  {
    id: 'ia',
    name: 'Inteligencia Artificial',
    description: 'Implementación de IA en desarrollo web, agentes inteligentes, automatización con LLMs y casos de uso prácticos para negocios.',
    color: 'bg-purple-600',
    icon: 'Brain',
  },
  {
    id: 'desarrollo-web',
    name: 'Desarrollo Web',
    description: 'Mejores prácticas de desarrollo, arquitecturas modernas, frameworks, optimización de performance y experiencias de usuario.',
    color: 'bg-blue-600',
    icon: 'Code',
  },
  {
    id: 'automatizacion',
    name: 'Automatización',
    description: 'Workflows automatizados, integraciones n8n, Make, Zapier, y sistemas que trabajan 24/7 sin intervención humana.',
    color: 'bg-orange-600',
    icon: 'Zap',
  },
  {
    id: 'seo',
    name: 'SEO & Marketing',
    description: 'Estrategias de posicionamiento orgánico, optimización Core Web Vitals, contenido SEO y conversión de visitantes en clientes.',
    color: 'bg-green-600',
    icon: 'TrendingUp',
  },
  {
    id: 'negocios-digitales',
    name: 'Negocios Digitales',
    description: 'Transformación digital para PyMEs, estrategias de crecimiento, herramientas low-code y escalabilidad de operaciones.',
    color: 'bg-sunriver-orange',
    icon: 'Building2',
  },
  {
    id: 'tendencias',
    name: 'Tendencias 2025',
    description: 'Lo último en tecnología web, predicciones del sector, nuevas herramientas y oportunidades de negocio emergentes.',
    color: 'bg-indigo-600',
    icon: 'Rocket',
  },
];
