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
  { href: '#servicios', label: 'Servicios' },
  { href: '#caso', label: 'El caso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#guia', label: 'Guía gratis' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const PROJECTS = [
  { name: 'PyP Liquors', detail: 'página web con CRM' },
  { name: 'Venco Oil', detail: 'sistema de gestión' },
  { name: 'GESSEG Colombia', detail: 'web a la medida' },
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
export const MARQUEE_ITEMS = [
  { word: 'Redes', sub: 'contenido' },
  { word: 'Automatización', sub: 'bots' },
  { word: 'Agentes de IA', sub: 'seguridad' },
  { word: 'Web', sub: 'que vende' },
] as const;

/**
 * Las seis caras del cubo de servicios: los cuatro servicios + lo que nos diferencia + cómo empezar.
 * Las caras 01–04 salen de SERVICES; los textos de 05 y 06 son los que ya estaban en la home.
 */
export const CUBE_EXTRA_FACES = [
  {
    kicker: 'Lo que nos diferencia',
    title: 'Con los frenos puestos',
    text: 'Hablamos de ciberseguridad todos los días, y se nota en lo que construimos: cada bot tiene solo los permisos que necesita, las acciones delicadas pasan por una persona y todo se puede apagar con un botón.',
    bullets: ['Permisos mínimos', 'Aprobación humana', 'Apagado con un botón'],
  },
  {
    kicker: 'Empieza aquí',
    title: 'Diagnóstico gratis',
    text: 'Revisamos tu Instagram, tu WhatsApp y tu web, y te decimos qué arreglaríamos primero.',
    bullets: ['15 minutos', 'Sin costo y sin compromiso', 'Te decimos qué cambiaríamos primero'],
  },
] as const;

/** "El caso" partido en frases grandes. La palabra entre *asteriscos* va en color. */
export const MANIFESTO = [
  'Antes de hacerlo por ti,',
  'lo probamos en lo *nuestro*.',
  'Cada reel se *mide*',
  'a las 24 horas y a los 7 días,',
  'y lo que *funciona*',
  'se vuelve *regla*.',
  'Fue un reel, no una garantía:',
  'lo que te ofrecemos es el *método*.',
] as const;

/** Líneas tipo terminal: solo hechos que ya están en la home. */
export const TERMINAL_LINES = [
  'Reel medido a las 24 h',
  'Reel medido a los 7 días',
  'Bot respondiendo en 3 s',
  'Lo que funciona se vuelve regla',
] as const;

/** Franja de cifras del caso (formato mono "VALOR_CLAVE"). */
export const CASE_STATS = [
  { value: 1000000, key: 'vistas_del_reel' },
  { value: 49000, key: 'en_las_primeras_37_h' },
  { text: '+425', key: 'seguidores_nuevos' },
  { text: '99,6 %', key: 'no_nos_seguía' },
] as const;

/** Ficha que se abre al hacer clic en un proyecto: solo hechos que contó el cliente o que se ven en sus capturas. */
export type ProjectMore = {
  intro: string;
  how: readonly { title: string; text: string }[];
  includes: readonly string[];
  results?: readonly string[];
  link?: { href: string; label: string };
};

/**
 * Galería horizontal de proyectos y piezas. `media` apunta a un espacio de foto de media.ts.
 * `detail` es la etiqueta corta junto al nombre; `desc`, una frase con lo que hace; `more`, la ficha.
 */
export const PROJECT_ITEMS: readonly {
  name: string;
  detail: string;
  desc: string;
  media: string;
  href?: string;
  more?: ProjectMore;
}[] = [
  {
    name: 'PyP Liquors',
    detail: 'Página web + CRM',
    desc: 'Una página web con un CRM detrás que gestiona todo el negocio en un solo lugar.',
    media: 'proyecto-pyp',
    more: {
      intro:
        'Una página pública para que la gente conozca el lugar y reserve, y un CRM detrás para que el equipo gestione todo el negocio desde su propio panel.',
      how: [
        {
          title: 'La página pública',
          text: 'Historia, galería, eventos, menú y contacto, con botones directos para reservar mesa y ver los próximos eventos.',
        },
        {
          title: 'Contacto inmediato',
          text: 'Desde cualquier página se puede reservar o escribir por WhatsApp, sin buscar un número.',
        },
        {
          title: 'El panel administrativo',
          text: 'Detrás de la página hay un panel al que solo entra el personal autorizado, con su usuario y contraseña.',
        },
        {
          title: 'El CRM del negocio',
          text: 'Desde ese panel se gestiona el negocio: clientes y operación en un solo lugar, en vez de hojas sueltas y chats.',
        },
      ],
      includes: ['Página web a la medida', 'Reservas y eventos', 'Botón de WhatsApp', 'Panel con acceso restringido', 'CRM del negocio'],
    },
  },
  {
    name: 'Venco Oil',
    detail: 'Sistema de gestión',
    desc: 'Inventario, clientes, facturas y rutas de venta en un solo sistema, también desde el celular.',
    media: 'proyecto-venco',
    more: {
      intro:
        'Un sistema para llevar todo el negocio desde el celular: inventario, clientes, pedidos y facturas, y la ruta de visitas de cada semana.',
      how: [
        {
          title: 'Clientes',
          text: 'La cartera completa con tipo de negocio, zona y prioridad. Marca quién no ha sido visitado, quién está en riesgo y qué seguimientos se vencieron.',
        },
        {
          title: 'Pedidos y facturas',
          text: 'Cada pedido pasa de cotizado a entregado y cobrado, con su número, su fecha, su total y la ganancia que deja.',
        },
        {
          title: 'Ruta de la semana',
          text: 'Qué zonas visitar cada día, cuántas visitas presenciales y llamadas se hicieron, y cómo va la meta acumulada.',
        },
        {
          title: 'Precios e informes',
          text: 'Lista de precios vigente con costos y márgenes, indicadores del negocio y exportación a Excel.',
        },
        {
          title: 'Inventario y respaldo',
          text: 'El inventario vive en el mismo sistema, con respaldo para exportar o restaurar la información y sincronización al día.',
        },
      ],
      includes: ['Inventario', 'Clientes y seguimiento', 'Pedidos y facturas', 'Rutas de visita', 'Meta semanal', 'Informes y Excel', 'Respaldo y sincronización'],
    },
  },
  {
    name: 'GESSEG Colombia',
    detail: 'Web a la medida',
    desc: 'Una página web personalizada, construida según los requerimientos del cliente.',
    media: 'proyecto-gesseg',
    more: {
      intro:
        'Una página web hecha a la medida para GESSEG Colombia, una firma de soluciones en SG-SST (seguridad y salud en el trabajo), según lo que el cliente necesitaba mostrar.',
      how: [
        {
          title: 'Desde los requerimientos',
          text: 'Partimos de lo que el cliente necesitaba: qué ofrece, a quién le habla y qué debe hacer quien entra a la página.',
        },
        {
          title: 'Un mensaje claro',
          text: 'Desde el primer pantallazo se entiende qué hace la empresa, con secciones de nosotros, servicios y planes.',
        },
        {
          title: 'Del interés al contacto',
          text: 'Un botón para solicitar un diagnóstico y contacto directo por WhatsApp en toda la página.',
        },
      ],
      includes: ['Diseño a la medida', 'Nosotros, servicios y planes', 'Solicitud de diagnóstico', 'Botón de WhatsApp'],
      link: { href: 'https://gessegcolombia.com/', label: 'Ver la página' },
    },
  },
  {
    name: 'Eventos deportivos 90+1',
    detail: 'Bot de reservas',
    desc: 'Un bot de alta frecuencia conectado a la página de reservas con una API propia, porque la página no tenía una pública.',
    media: 'proyecto-90mas1',
    more: {
      intro:
        'Un bot que reserva canchas para Eventos deportivos 90+1 en cuanto se liberan. La página de reservas no tenía una API pública, así que construimos una propia para conectarnos directamente.',
      how: [
        {
          title: 'Una API propia',
          text: 'El bot habla directo con la página de reservas, sin depender de abrirla a mano, porque la página no ofrecía una conexión pública.',
        },
        {
          title: 'Alta frecuencia',
          text: 'Revisa la disponibilidad de varias sedes cada pocos segundos y reserva apenas aparece un cupo.',
        },
        {
          title: 'Aviso por Telegram',
          text: 'Envía la cancha, la fecha, el horario, el valor y el enlace de pago. Desde ahí quedan 15 minutos para pagar.',
        },
        {
          title: 'Respeta los límites',
          text: 'Si la página pide bajar la velocidad, el bot hace una pausa y sigue después.',
        },
        {
          title: 'Reporte de cada jornada',
          text: 'Al terminar envía un resumen con las reservas logradas, los cupos vistos y los errores.',
        },
      ],
      includes: ['API propia', 'Reserva automática', 'Avisos por Telegram', 'Enlace de pago', 'Reporte por jornada'],
    },
  },
  {
    name: 'Reel 007',
    detail: 'Contenido propio',
    desc: '1 millón de vistas en nuestra cuenta. Las primeras 49.000 llegaron en 37 horas.',
    media: 'proyecto-reel',
    more: {
      intro:
        '«¿Una IA rompió una regla de 25 años?», un reel de nuestra propia cuenta. Antes de ofrecer el método a un cliente, lo probamos en lo nuestro.',
      how: [
        {
          title: 'El primer segundo decide',
          text: 'Un titular grande desde el primer cuadro. Cuando lo aplicamos, los saltos bajaron de 39 % a 20 %.',
        },
        {
          title: 'Una historia, no un anuncio',
          text: 'Historias reales con pocas cifras, cada una con una comparación. La gente se quedó casi 47 segundos de promedio.',
        },
        {
          title: 'Prometer la continuación',
          text: 'Cerrar con «cuando salga, te lo cuento». Pasamos de un máximo de 2 seguidores por reel a 425.',
        },
        {
          title: 'Medir y repetir',
          text: 'Cada reel se mide a las 24 horas y a los 7 días. Lo que funciona se vuelve regla.',
        },
      ],
      includes: ['Titular desde el primer cuadro', 'Historia real con pocas cifras', 'Cierre que promete continuación', 'Medición a las 24 h y a los 7 días'],
      results: ['1 millón de vistas', '49.000 en las primeras 37 horas', '+425 seguidores nuevos', '99,6 % no nos seguía'],
      link: { href: CONTACT.instagramUrl, label: 'Ver en Instagram' },
    },
  },
  {
    name: 'Guía: 7 trampas con IA',
    detail: 'PDF gratis',
    desc: '11 páginas con las 7 trampas con IA que ya usan contra negocios, explicadas en simple.',
    media: 'guia-7-trampas',
    href: '#guia',
  },
] as const;

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
