// Contenido de la home. Textos exactos aprobados: no inventar cifras, clientes ni testimonios.

export const SITE_URL = 'https://www.sunriverstech.com/';

export const CONTACT = {
  whatsappDisplay: '+57 312 418 3002',
  whatsappUrl: 'https://wa.me/573124183002',
  whatsappE164: '+573124183002',
  email: 'jorge_duque@sunriver.cloud',
  instagramHandle: '@sunriversolution',
  instagramUrl: 'https://www.instagram.com/sunriversolution',
} as const;

export const GUIDE_WHATSAPP_URL =
  'https://wa.me/573124183002?text=Hola,%20quiero%20la%20gu%C3%ADa%20de%20las%207%20trampas';

export const NAV_LINKS = [
  { href: '#caso', label: 'El caso' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#guia', label: 'Guía gratis' },
] as const;

export const PROJECTS = [
  { name: 'PyP Liquors', detail: 'club de fidelización' },
  { name: 'Venco Oil', detail: 'datos y asistente' },
  { name: 'GESSEG Colombia', detail: 'sitio web' },
] as const;

export const CASE_LESSONS = [
  {
    title: 'El primer segundo decide',
    text: 'Un titular grande desde el primer cuadro. Cuando lo aplicamos, los saltos bajaron de 39 % a 20 %.',
    dataLabel: 'Saltos',
    dataValue: '39 % → 20 %',
  },
  {
    title: 'Una historia, no un anuncio',
    text: 'Historias reales con pocas cifras, cada una con una comparación. La gente se quedó casi 47 segundos de promedio.',
    dataLabel: 'Permanencia media',
    dataValue: '≈ 47 s',
  },
  {
    title: 'Prometer la continuación',
    text: 'Cerrar con «cuando salga, te lo cuento». Pasamos de un máximo de 2 seguidores por reel a 425.',
    dataLabel: 'Seguidores por reel',
    dataValue: '2 → 425',
  },
] as const;

export type ServiceIcon = 'reel' | 'bot' | 'web';

export const SERVICES: ReadonlyArray<{
  icon: ServiceIcon;
  title: string;
  text: string;
  bullets: readonly string[];
  pricePrefix: string;
  price: string;
  priceSuffix?: string;
}> = [
  {
    icon: 'reel',
    title: 'Contenido que alcanza',
    text: 'Reels con guion, edición e IA, pensados para llegar a gente que todavía no te sigue. Medimos cada publicación y ajustamos cada semana.',
    bullets: [
      'Guiones e investigación verificada',
      'Publicación en Instagram y Facebook',
      'Informe semanal de resultados',
    ],
    pricePrefix: 'Desde',
    price: '$900.000',
    priceSuffix: '/ mes',
  },
  {
    icon: 'bot',
    title: 'Bots que responden',
    text: 'Cada comentario, mensaje o consulta recibe respuesta en segundos, también a las 11 de la noche. Tus clientes no esperan y tú no pierdes la venta.',
    bullets: [
      'Comentario → mensaje privado automático',
      'WhatsApp fuera de horario y agenda de citas',
      'Seguimiento a quien no compró',
    ],
    pricePrefix: 'Instalación desde',
    // PLACEHOLDER: reemplazar por el precio real de instalación.
    price: '[TU PRECIO]',
  },
  {
    icon: 'web',
    title: 'Web que vende',
    text: 'Un sitio rápido, claro y conectado a tus bots, que convierte visitas en conversaciones de WhatsApp. Listo en días, no en meses.',
    bullets: [
      'Diseño a medida, adaptado a celular',
      'Dominio, hosting y SSL el primer año',
      'Conectado a WhatsApp y a tus bots',
    ],
    pricePrefix: 'Desde',
    // PLACEHOLDER: reemplazar por el precio real de la web.
    price: '[TU PRECIO]',
  },
];

export const SAFEGUARDS = ['Permisos mínimos', 'Aprobación humana', 'Apagado con un botón'] as const;

export const STEPS = [
  {
    meta: '01 · 15 min',
    title: 'Diagnóstico gratis',
    text: 'Revisamos tu Instagram, tu WhatsApp y tu web, y te decimos qué arreglaríamos primero.',
  },
  {
    meta: '02 · 2 días',
    title: 'Plan y precio claro',
    text: 'Una propuesta corta: qué hacemos, cuánto cuesta y qué vas a poder medir.',
  },
  {
    meta: '03 · Días, no meses',
    title: 'Montaje',
    text: 'Contenido, bots o web funcionando, con los frenos puestos desde el primer día.',
  },
  {
    meta: '04 · Cada semana',
    title: 'Medimos y ajustamos',
    text: 'Vistas, mensajes y clientes. Lo que no funciona se cambia; lo que funciona se repite.',
  },
] as const;

export const FAQS = [
  {
    q: '¿Cuánto tarda en estar listo?',
    a: 'Un bot de comentarios o de WhatsApp queda funcionando en pocos días. Una web, en una a dos semanas. El contenido arranca la semana en que firmamos.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'No. Nosotros montamos todo, te explicamos lo que hace en palabras simples y te dejamos un botón para apagarlo si algún día lo necesitas.',
  },
  {
    q: '¿Me garantizan un número de vistas?',
    a: 'No, y desconfía de quien lo haga. Te garantizamos el método: publicar con criterio, medir cada semana y ajustar con datos.',
  },
  {
    q: '¿Qué pasa con los datos de mis clientes?',
    a: 'Cada bot accede solo a lo que necesita para su tarea, las acciones delicadas pasan por una persona y nada sale de tu negocio sin que lo sepas.',
  },
] as const;
