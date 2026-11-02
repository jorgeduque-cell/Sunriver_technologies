// Contenido de la home. Textos exactos aprobados: no inventar cifras, clientes ni testimonios.

export const SITE_URL = 'https://www.sunriverstech.com/';

export const CONTACT = {
  whatsappDisplay: '+57 312 418 3002',
  whatsappUrl: 'https://wa.me/573124183002',
  whatsappE164: '+573124183002',
  email: 'jdriosol97@gmail.com',
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

// El dato de cada tarjeta cuenta de `from` a `to` al entrar en pantalla (el valor final va en el HTML).
export const CASE_LESSONS = [
  {
    title: 'El primer segundo decide',
    text: 'Un titular grande desde el primer cuadro. Cuando lo aplicamos, los saltos bajaron de 39 % a 20 %.',
    dataLabel: 'Saltos',
    data: { prefix: '39 % → ', from: 39, to: 20, suffix: ' %' },
  },
  {
    title: 'Una historia, no un anuncio',
    text: 'Historias reales con pocas cifras, cada una con una comparación. La gente se quedó casi 47 segundos de promedio.',
    dataLabel: 'Permanencia media',
    data: { prefix: '≈ ', from: 0, to: 47, suffix: ' s' },
  },
  {
    title: 'Prometer la continuación',
    text: 'Cerrar con «cuando salga, te lo cuento». Pasamos de un máximo de 2 seguidores por reel a 425.',
    dataLabel: 'Seguidores por reel',
    data: { prefix: '2 → ', from: 2, to: 425, suffix: '' },
  },
] as const;

export type ServiceIcon = 'reel' | 'bot' | 'agent' | 'web';

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
    title: 'Redes que alcanzan',
    text: 'Manejamos tus redes con reels con guion, edición e IA, pensados para llegar a gente que todavía no te sigue. Medimos cada publicación y ajustamos cada mes.',
    bullets: [
      '8 reels al mes, editados con tu material o creados desde cero',
      'Calendario mensual que tú apruebas antes de producir',
      'Informe mensual con vistas, alcance y mensajes recibidos',
    ],
    pricePrefix: 'Desde',
    price: 'US$500',
    priceSuffix: '/ mes',
  },
  {
    icon: 'bot',
    title: 'Automatizaciones que responden',
    text: 'Cada comentario, mensaje o consulta recibe respuesta en segundos, también a las 11 de la noche. Tus clientes no esperan y tú no pierdes la venta.',
    bullets: [
      'Respuestas automáticas en comentarios, mensajes y WhatsApp',
      'Automatizaciones personalizadas para tu negocio',
      'Agenda de citas y seguimiento a quien no compró',
    ],
    pricePrefix: 'Desde',
    price: 'US$650',
  },
  {
    icon: 'agent',
    title: 'Agentes de IA, probados',
    text: 'Creamos agentes de IA que trabajan para tu negocio y ponemos a prueba los que ya usas: qué pueden hacer, qué datos ven y si alguien los puede engañar.',
    bullets: [
      'Creación de agentes de IA a la medida',
      'Diagnóstico de los agentes que ya tienes',
      'Pruebas de seguridad antes de ponerlos a trabajar',
    ],
    pricePrefix: 'Desde',
    price: 'US$1.000',
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
    pricePrefix: '',
    price: 'US$250',
  },
];

export const SAFEGUARDS = ['Permisos mínimos', 'Aprobación humana', 'Apagado con un botón'] as const;

// Planes de «Redes que alcanzan», según cuánto material pone el cliente.
export const PLANS = [
  {
    name: 'Edición',
    forWho: 'Negocios que pueden grabar: restaurante, tienda, consultorio.',
    reels: '8 reels al mes, editados con tu material',
    price: 'US$500',
    priceNote: '/ mes',
  },
  {
    name: 'Edición + Creación',
    forWho: 'Negocios que graban algo, pero quieren destacar.',
    reels: '8 reels editados + 4 creados desde cero',
    price: 'US$750–800',
    priceNote: '/ mes',
  },
  {
    name: 'Creación total',
    forWho: 'Negocios sin tiempo ni cara para grabar.',
    reels: '8 reels creados desde cero',
    price: '~US$1.000',
    priceNote: '/ mes',
  },
] as const;

export const REEL_TYPES = [
  {
    title: 'Reel editado',
    sub: 'Tú grabas con el celular',
    items: [
      'Corte de silencios y errores',
      'Subtítulos animados palabra por palabra',
      'Música y efectos',
      'Gancho en el primer segundo',
      'Portada y publicación',
    ],
  },
  {
    title: 'Reel creado desde cero',
    sub: 'Tú no grabas nada',
    items: [
      'Investigación y guion',
      'Voz con IA o la tuya',
      'Animación o 3D, e imágenes',
      'Música, portada y caption con hashtags',
      'Temas: noticias de tu sector, explicaciones de tu servicio, mitos y comparativas',
    ],
  },
] as const;

export const PLAN_INCLUDES = [
  'calendario mensual que apruebas antes de producir',
  'guía de grabación',
  'una ronda de cambios por reel',
  'publicación en Instagram y Facebook',
  'informe mensual con los mensajes que llegaron',
] as const;

export const PLAN_TERMS = [
  'Mínimo 3 meses: los resultados en redes no se ven en el primer mes.',
  'Si el material no llega a tiempo, ese reel no se acumula para el mes siguiente.',
  'Pago por adelantado al inicio de cada mes.',
] as const;

// Banda que se desplaza con el scroll (decorativa, oculta a lectores de pantalla).
export const MARQUEE_WORDS = ['Contenido', 'Automatización', 'Agentes de IA', 'Ciberseguridad', 'Web que vende'] as const;

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
