/**
 * Espacios de foto de la home.
 *
 * Mientras `src` no exista se muestra un bloque con la paleta y la etiqueta "FOTO PENDIENTE".
 * Para poner una foto real:
 *   1. Guardarla en public/media/<id>.webp (y <id>-640.webp para celular), con la proporción indicada.
 *   2. Completar `src` (y `srcSmall`) aquí. `width`/`height` reservan el espacio (sin saltos de diseño).
 */
export type MediaId =
  | 'proyecto-reel'
  | 'proyecto-pyp'
  | 'proyecto-venco'
  | 'proyecto-gesseg'
  | 'proyecto-90mas1'
  | 'cuenta-estadisticas'
  | 'cubo-redes'
  | 'cubo-automatizaciones'
  | 'cubo-agentes'
  | 'cubo-web'
  | 'cubo-frenos'
  | 'cubo-diagnostico'
  | 'guia-7-trampas'
  | 'ultimo-reel';

export type Media = {
  /** Etiqueta corta que se ve en el espacio pendiente. */
  label: string;
  /** Qué foto va aquí (para quien la envía). */
  brief: string;
  alt: string;
  width: number;
  height: number;
  src?: string;
  srcSmall?: string;
  /** Imágenes verticales (portadas) que deben verse completas dentro del marco. */
  contain?: boolean;
  /**
   * Varias imágenes: se muestran en carrusel dentro del mismo marco. La primera va en el HTML
   * y es la que se ve donde no cabe un carrusel (tarjetas del inicio).
   */
  slides?: readonly { src: string; alt: string; width: number; height: number }[];
};

export const MEDIA: Record<MediaId, Media> = {
  'proyecto-reel': {
    label: 'Reel 007',
    brief: 'Portada del reel 007 (1 millón de vistas). Lista.',
    alt: 'Portada del reel 007 de @sunriversolution: «¿Una IA rompió una regla de 25 años?»',
    // El marco sigue en 4:3; la portada (vertical, 339×452) se ve completa dentro (contain).
    width: 1200,
    height: 900,
    src: '/media/proyecto-reel.webp',
    contain: true,
  },
  'proyecto-pyp': {
    label: 'PyP Liquors',
    brief: 'Captura de la página web (con el CRM detrás). Horizontal.',
    alt: 'Página web de PyP Liquors, con su CRM detrás',
    width: 1200,
    height: 900,
  },
  'proyecto-venco': {
    label: 'Venco Oil',
    brief: 'Capturas del sistema en el celular (pedidos, clientes, ruta, más): van en carrusel.',
    alt: 'Pantallas del sistema de gestión de Venco Oil: pedidos, clientes, ruta y ajustes',
    width: 1200,
    height: 900,
  },
  'proyecto-gesseg': {
    label: 'GESSEG Colombia',
    brief: 'Captura de la página web de GESSEG Colombia. Horizontal.',
    alt: 'Página web de GESSEG Colombia',
    width: 1200,
    height: 900,
  },
  'proyecto-90mas1': {
    label: 'Eventos deportivos 90+1',
    brief: 'Capturas de los reportes del bot en Telegram: van en carrusel.',
    alt: 'Reportes del bot de reservas de Eventos deportivos 90+1 en Telegram',
    width: 1200,
    height: 900,
  },
  'cuenta-estadisticas': {
    label: 'Estadísticas del reel',
    brief: 'Captura de las estadísticas de Instagram del reel 007 (seguidores nuevos). Horizontal 4:3.',
    alt: 'Estadísticas de Instagram del reel 007',
    width: 1200,
    height: 900,
  },
  'cubo-redes': {
    label: 'Redes',
    brief: 'Foto grabando un reel o una pantalla con reels publicados. Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'cubo-automatizaciones': {
    label: 'Automatizaciones',
    brief: 'Captura de una respuesta automática en Instagram o WhatsApp. Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'cubo-agentes': {
    label: 'Agentes de IA',
    brief: 'Captura de un agente de IA funcionando (chat o panel). Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'cubo-web': {
    label: 'Web',
    brief: 'Captura de un sitio web hecho por ustedes. Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'cubo-frenos': {
    label: 'Ciberseguridad',
    brief: 'Foto o captura que represente seguridad (permisos, aprobación, botón de apagado). Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'cubo-diagnostico': {
    label: 'Diagnóstico',
    brief: 'Foto tuya o del equipo en una llamada o revisando un negocio. Cuadrada 1:1.',
    alt: '',
    width: 1000,
    height: 1000,
  },
  'guia-7-trampas': {
    label: 'Guía 7 trampas',
    brief: 'Ya existe: portada real de la guía.',
    alt: 'Portada de la guía: 7 trampas con IA que ya usan contra negocios',
    width: 1167,
    height: 1653,
    src: '/guias/portada-7-trampas.webp',
    contain: true,
  },
  'ultimo-reel': {
    label: 'Último reel',
    brief: 'Portada del último reel publicado (se enlaza a Instagram). Horizontal 16:9.',
    alt: 'Último reel de @sunriversolution',
    width: 1600,
    height: 900,
  },
};
