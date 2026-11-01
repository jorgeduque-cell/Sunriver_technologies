import type { Article } from '../types/blog';
import jorgeAvatar from '../assets/team/jorge-duque.jpg';

export const authors = {
  jorgeDuque: {
    name: 'Jorge Duque',
    role: 'CEO & Lead Developer',
    avatar: jorgeAvatar,
    bio: 'Especialista en desarrollo web y transformación digital para PyMEs. 3 años creando soluciones tecnológicas escalables.',
    linkedin: 'https://linkedin.com/in/jorgeduque',
  },
};

export const articles: Article[] = [
  {
    id: '1',
    slug: 'implementar-chatbot-ia-pagina-web-2025',
    title: 'Cómo Implementar un Chatbot IA en tu Página Web en 2025: Guía Completa',
    excerpt: 'Descubre cómo los chatbots con IA están revolucionando la atención al cliente. Guía paso a paso para integrar un asistente virtual que convierte visitantes en clientes 24/7.',
    content: `
## El Chatbot IA: Tu Vendedor Que Nunca Duerme

En 2025, tener un sitio web sin un chatbot con inteligencia artificial es como tener una tienda física sin vendedores. Los visitantes llegan, miran, y se van sin obtener respuestas a sus preguntas específicas.

### ¿Por Qué los Chatbots Tradicionales Ya No Funcionan?

Los chatbots basados en reglas ("si el usuario dice X, responde Y") son frustrantes:
- Solo entienden palabras clave preprogramadas
- No pueden mantener conversaciones naturales
- Fallan ante preguntas inesperadas
- Ofrecen experiencias robóticas

Los nuevos chatbots con Large Language Models (LLMs) como GPT-4 entienden contexto, mantienen conversaciones fluidas y aprenden de cada interacción.

## Caso Real: Agencia Inmobiliaria de Medellín

Un cliente nuestro, una agencia inmobiliaria mediana en Medellín, implementó nuestro chatbot IA personalizado:

Antes:
- 15 consultas diarias respondidas manualmente
- 3 horas diarias de atención al cliente
- 40% de leads perdidos fuera de horario

Después (3 meses con chatbot IA):
- 80+ conversaciones diarias atendidas automáticamente
- 0 tiempo de equipo en atención inicial
- 85% de leads capturados 24/7
- Resultado: +120% en citas agendadas

## Implementación Técnica: Arquitectura Moderna

### Stack Tecnológico Recomendado

Frontend: React/Vue + Componente de chat
Backend: Node.js/Python FastAPI
IA: OpenAI GPT-4 / Google Gemini
Base de datos: PostgreSQL + Redis (cache)
Hosting: Vercel (frontend) + Railway/Render (backend)

### Flujo de Conversación Inteligente

1. Captación Inicial
   - Saludo personalizado según página de origen
   - Pregunta abierta para entender necesidad

2. Clasificación del Lead (Automática)
   - IA detecta: información general, cotización, soporte, urgencia
   - Enrutamiento inteligente

3. Recolección de Datos Contextual
   - No pregunta "nombre y email" de inmediato
   - Primero entrega valor, luego solicita información
   - Conversación natural, no formulario robótico

4. Escalamiento Humano Inteligente
   - Detecta cuándo un humano es necesario
   - Transfiere toda la conversación + contexto
   - Notificación por WhatsApp/Email al equipo

## Métricas que Debes Monitorear

| Métrica | Objetivo | Cómo Mejorar |
|---------|----------|--------------|
| Tasa de resolución | Mayor al 70% | Entrenar con FAQs reales |
| Satisfacción usuario | Mayor a 4.2/5 | Ajustar tono conversacional |
| Leads capturados | +30% mensual | Optimizar CTA contextual |
| Tiempo respuesta | Menos de 2s | Cache + optimización |

## Errores Comunes al Implementar Chatbots

Error #1: Querer Automatizar Todo
Problema: Intentar que el bot resuelva 100% de casos.
Solución: Define claramente qué maneja el bot y cuándo escalar a humanos.

Error #2: Personalidad Robótica
Problema: "Hola, soy el asistente virtual. ¿En qué puedo ayudarle?"
Solución: Dale personalidad de marca. En SunRiver, nuestros bots usan emojis, humor ligero y lenguaje cercano.

Error #3: Falta de Contexto del Negocio
Problema: Bot genérico que no conoce tus servicios.
Solución: Entrena el modelo con:
- Catálogo de servicios detallado
- Precios y paquetes
- Preguntas frecuentes reales de clientes
- Casos de éxito
- Objecciones comunes y respuestas

## Implementación en 4 Semanas

Semana 1: Diseño Conversacional
- Mapear journey del cliente ideal
- Definir tono y personalidad del bot
- Crear flujos principales (cotización, información, soporte)

Semana 2: Desarrollo y Entrenamiento
- Integración API (OpenAI/Google)
- Construcción base de conocimiento
- Pruebas internas intensivas

Semana 3: Testing con Usuarios Reales
- Lanzamiento a 20% de tráfico
- Recolección de conversaciones fallidas
- Ajustes y refinamiento

Semana 4: Lanzamiento Completo + Optimización
- Rollout 100%
- Monitoreo de métricas
- Iteración continua basada en datos

## Retorno de Inversión Típico

Inversión inicial (desarrollo custom):
Depende de la complejidad del proyecto. Generalmente incluye diseño conversacional, integraciones y entrenamiento inicial.

Costo mensual operación:
- API de IA: Variable según volumen de conversaciones
- Hosting: Infraestructura cloud estándar
- Mantenimiento: Ajustes y mejoras continuas

Retorno típico (clientes PyMEs):
- Captura de 20-50 leads adicionales por mes
- Conversión promedio del 5-10%
- Valor cliente promedio entre $500-$2,000
- ROI positivo generalmente en los primeros 3 meses

## El Futuro: Chatbots Multimodales 2025

Las tendencias que ya estamos implementando:

1. Voz + Texto: Reconocimiento de voz nativo
2. Imágenes: Usuario envía imagen, bot analiza y responde
3. Integración WhatsApp API: Mismo bot en web y WhatsApp
4. Personalización predictiva: Bot anticipa necesidades según comportamiento

## Conclusión: ¿Por Dónde Empezar?

1. Audita tu situación actual: ¿Cuántas consultas pierdes por no tener atención 24/7?
2. Define objetivo claro: ¿Captar leads? ¿Reducir tickets de soporte? ¿Ambos?
3. Empieza simple: Un bot que maneje 5 preguntas principales vale más que uno complejo que falle.

En SunRiver desarrollamos chatbots personalizados que se integran con tu sitio web existente. Desde la consultoría inicial hasta el entrenamiento continuo de la IA.

¿Listo para que tu sitio web trabaje por ti mientras duermes?
    `,
    author: authors.jorgeDuque,
    publishDate: '2025-02-20',
    readTime: 12,
    category: 'ia',
    tags: ['chatbot', 'inteligencia artificial', 'atención al cliente', 'automatización', 'lead generation'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    featured: true,
    meta: {
      title: 'Cómo Implementar un Chatbot IA en tu Web 2025 | Guía Completa SunRiver',
      description: 'Guía paso a paso para integrar chatbots con IA en tu sitio web. Caso real: +120% en leads. Arquitectura técnica y errores comunes a evitar.',
      keywords: ['chatbot ia', 'chatbot página web', 'asistente virtual', 'ia para negocios', 'automatización atención cliente'],
    },
    relatedArticles: ['core-web-vitals-guia-completa-desarrolladores', 'automatizacion-leads-n8n'],
  },
  {
    id: '2',
    slug: 'core-web-vitals-guia-completa-desarrolladores',
    title: 'Core Web Vitals 2025: Guía Completa para Desarrolladores',
    excerpt: 'Todo lo que necesitas saber sobre LCP, INP y CLS. Cómo pasar de 50 a 95 en PageSpeed Insights y posicionar mejor en Google.',
    content: `
## Core Web Vitals: El Factor de Ranking que Ignoras

Desde 2021, Google usa Core Web Vitals como factor de ranking. Pero en 2025, la barra subió: ahora son diferenciadores competitivos, no solo "buenas prácticas".

Un sitio lento no solo posiciona mal; pierde clientes. Estudios recientes muestran:
- 53% de usuarios móviles abandonan si la página tarda más de 3 segundos
- Cada segundo de delay reduce conversiones en 7%
- Amazon reportó pérdida significativa por cada segundo de lentitud extra

## Las 3 Métricas que Importan

### 1. LCP (Largest Contentful Paint)

¿Qué mide? Tiempo de carga del elemento más grande visible.
Objetivo: Menos de 2.5 segundos (bueno), menos de 4 segundos (necesita mejora)

Elementos típicos que causan LCP lento:
- Imágenes hero sin optimizar
- Videos de fondo pesados
- Fuentes web que bloquean render
- Servidores lentos (TTFB alto)

Soluciones técnicas:
Precarga imagen LCP con fetchpriority="high"
Dimensiones explícitas en todas las imágenes para evitar CLS

### 2. INP (Interaction to Next Paint) - ¡NUEVO 2024!

Reemplaza a FID. Mide todas las interacciones, no solo la primera.
Objetivo: Menos de 200ms

Causas comunes de INP lento:
- JavaScript pesado en thread principal
- Animaciones complejas sin GPU
- Event listeners ineficientes
- Third-party scripts bloqueantes

Optimización en React:
Usa Web Workers para cálculos pesados fuera del thread principal. Mueve procesamiento intensivo a workers para mantener la interfaz fluida.

### 3. CLS (Cumulative Layout Shift)

¿Qué mide? Estabilidad visual durante carga.
Objetivo: Menor a 0.1

Ejemplo frustrante: Intentas hacer click en "Comprar" y de repente aparece un banner que empuja el botón hacia abajo. Clickas donde no es.

Causas y soluciones:

| Problema | Solución |
|----------|----------|
| Imágenes sin dimensiones | Siempre incluye width/height |
| Fuentes que causan FOUT/FOIT | Usa font-display: swap |
| Anuncios dinámicos | Reserva espacio con min-height |
| Contenido lazy-loaded | Placeholder con aspect-ratio |

## Caso de Estudio: E-commerce Colombiano

Situación inicial:
- LCP: 6.2 segundos (pésimo)
- INP: 580ms (pésimo)
- CLS: 0.25 (pésimo)
- Score PageSpeed: 38

Optimizaciones implementadas:

1. Imágenes: Convertidas a WebP, lazy loading, srcset responsive
2. Código: Code-splitting, tree-shaking, preload recursos críticos
3. Servidor: CDN Cloudflare, compresión Brotli, HTTP/3
4. Terceros: Analytics y chat cargados con requestIdleCallback

Resultados (4 semanas):
- LCP: 1.4 segundos ✅
- INP: 120ms ✅
- CLS: 0.02 ✅
- Score PageSpeed: 96 ✅
- Tráfico orgánico: +65%
- Tasa de rebote: -40%

## Herramientas Esenciales de Medición

### 1. PageSpeed Insights (oficial Google)
URL: pagespeed.web.dev
- Usa datos reales de Chrome UX Report
- Muestra field data vs lab data
- Recomendaciones priorizadas

### 2. Lighthouse (Chrome DevTools)
Presiona F12 → Lighthouse → Generate report
- Mide en tu máquina local
- Útil para iteraciones rápidas
- Configura: Mobile + Simulated Slow 4G

### 3. Web Vitals Extension
Extensión Chrome oficial.
- Muestra LCP, INP, CLS en tiempo real
- Identifica qué elemento causa cada métrica

### 4. Search Console
Sección "Experience" → "Core Web Vitals"
- Datos de todos tus usuarios reales
- Agrupado por URL
- Alertas de degradación

## Optimizaciones de Alto Impacto (Prioridad)

Crítico (hacer primero):
1. Optimizar imagen hero: WebP, comprimida, dimensiones correctas
2. Eliminar JavaScript no usado: Tree-shaking, code-splitting
3. Mejorar TTFB: Hosting rápido, CDN, edge functions

Medio (mejora adicional):
4. Preconnect a dominios externos: Google Fonts, Analytics
5. Inline CSS crítico: Estilos above-the-fold
6. Defer/async en scripts: No bloquear render

Bajo (pulir):
7. Service Worker para cache: Persistencia de assets
8. Resource hints: Prefetch, preload estratégico

## Errores que Matan tu Performance

Error #1: "En mi máquina va rápido"
Tu WiFi de 200Mbps no es representativo. El 60% de usuarios móviles en LATAM usan 3G/4G variable.

Solución: Testea siempre con throttling de red en DevTools.

Error #2: Instalar 20 plugins de WordPress
Cada plugin añade JS/CSS. Un sitio con 20 plugins típicamente tiene:
- 50+ requests HTTP
- 2-5MB de JavaScript
- 15+ trackers

Solución: Revisa plugins cada 3 meses. Elimina los que no aportan valor real.

Error #3: Imágenes "optimizadas" a 1920px de ancho
Subes una foto de 5000px y crees que poner width="100%" la optimiza.

Realidad: El navegador descarga los 5MB originales.

Solución: Usa responsive images con srcset para servir el tamaño correcto según el dispositivo.

## El Futuro: Core Web Vitals 2025+

Google anunció nuevas métricas en desarrollo:

1. Input Latency (latencia de entrada): Mide delay entre acción y respuesta visual
2. Smoothness: Detecta jank en animaciones (60fps)
3. Privacy-preserving metrics: Datos de performance sin identificar usuarios

Mantente actualizado: web.dev/vitals

## Checklist de Implementación

Descarga esta lista y úsala en cada proyecto:

Pre-lanzamiento:
- Todas las imágenes tienen width/height explícitos
- Fuentes usan font-display: swap
- CSS crítico está inlineado
- JavaScript se carga async/defer
- API calls usan stale-while-revalidate

Post-lanzamiento:
- Monitoreo continuo con Real User Monitoring (RUM)
- Alertas si LCP mayor a 2.5s o INP mayor a 200ms
- Revisión mensual de Core Web Vitals en Search Console
- Competitor benchmarking cada trimestre

## Conclusión

Core Web Vitals no son "nice to have". Son requisito técnico para competir en 2025.

En SunRiver incluimos optimización de performance como estándar en todos nuestros desarrollos. No es un add-on; es parte de nuestra metodología SOHI.

¿Tu sitio actual está por debajo de 70 en PageSpeed?
Podemos hacer una auditoría gratuita y entregarte un plan de optimización específico.
    `,
    author: authors.jorgeDuque,
    publishDate: '2025-02-15',
    readTime: 15,
    category: 'desarrollo-web',
    tags: ['core web vitals', 'performance', 'seo técnico', 'pagespeed', 'optimización'],
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
    featured: true,
    meta: {
      title: 'Core Web Vitals 2025: Guía Completa para Desarrolladores | SunRiver',
      description: 'Guía técnica completa sobre LCP, INP y CLS. Cómo mejorar de 50 a 95 en PageSpeed Insights. Caso real: +65% tráfico orgánico.',
      keywords: ['core web vitals', 'pagespeed insights', 'lcp', 'inp', 'cls', 'seo técnico', 'performance web'],
    },
    relatedArticles: ['implementar-chatbot-ia-pagina-web-2025', 'automatizacion-leads-n8n'],
  },
  {
    id: '3',
    slug: 'automatizacion-leads-n8n',
    title: 'Automatización de Leads con n8n: De la Captación al Cierre sin Intervención Humana',
    excerpt: 'Tutorial completo para construir un sistema automatizado que capture, califique y nutra leads mientras duermes. Integración con WhatsApp, CRM y email.',
    content: `
## El Problema: Leads que se Enfrían

Una verdad incómoda: el 78% de los leads se compran al primer vendedor que responde. Si tardas más de 5 minutos en responder, tus probabilidades de cierre caen drásticamente.

Pero como humanos tenemos que dormir, comer, tomar fines de semana. ¿La solución? Automatización inteligente con n8n.

## ¿Qué es n8n y Por Qué lo Usamos?

n8n (pronunciado "n-eight-n") es una herramienta de automatización workflow open-source:
- Self-hosted: Tus datos permanecen en tus servidores
- Visual: Drag-and-drop, no requiere código
- Potente: 400+ integraciones nativas
- Económico: Gratis para uso personal, planes accesibles para equipos

vs Zapier/Make: n8n ofrece control total, ejecuciones ilimitadas self-hosted, y costos significativamente menores a escala.

## Caso Real: Consultora de Marketing Digital

Cliente: Agencia de 12 personas en Bogotá, 50+ leads semanales.

Problema:
- Leads llegaban a email y se perdían
- Respuesta promedio: 4-6 horas
- Calificación manual toma 15 min por lead
- Seguimiento inconsistente

Solución implementada:

### Flujo de Automatización Completo

FORMULARIO WEB
      ↓
Webhook n8n ← Trigger inmediato
      ↓
Validación Email ← ZeroBounce API
      ↓
Enriquecimiento Datos ← Clearbit API
      ↓
Clasificación IA ← GPT-4 evalúa calidad
      ↓
├─ Lead Caliente (score 8-10)
│  ├─ WhatsApp instantáneo al vendedor
│  ├─ Crear oportunidad en Pipedrive
│  └─ Email personalizado al lead (menos de 2 min)
│
├─ Lead Tibio (score 5-7)
│  ├─ Añadir a secuencia email (7 días)
│  ├─ Tarea en CRM para seguimiento en 24h
│  └─ Alerta Slack al equipo de marketing
│
└─ Lead Frío (score menor a 5)
   ├─ Añadir a newsletter mensual
   └─ No crear tarea (evita ruido)

Resultados después de 2 meses:
- Tiempo de respuesta: 4 horas → 45 segundos
- Leads calificados automáticamente: 100%
- Conversión visitante-cliente: +85%
- Tiempo ahorrado equipo: 20 horas semanales

## Tutorial Paso a Paso: Tu Primer Workflow

### Paso 1: Instalación de n8n

Opción A: Cloud (rápida)
1. Crea cuenta en n8n.io/cloud
2. Plan starter para 5k ejecuciones

Opción B: Self-hosted (recomendado)
Con Docker:
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

Accede a http://localhost:5678

### Paso 2: Crear Webhook de Entrada

1. Añade nodo "Webhook"
2. Método: POST
3. Path: /nuevo-lead
4. Copia la URL del webhook

### Paso 3: Conectar Formulario Web

En tu formulario (React/Vue/WordPress):
Envía POST al webhook de n8n con:
- nombre
- email
- teléfono
- servicio de interés
- presupuesto estimado
- fuente (página de origen)
- timestamp

### Paso 4: Validación de Email

Añade nodo "HTTP Request":
- URL: https://api.zerobounce.net/v2/validate
- Method: GET
- Query: api_key y email del lead

¿Por qué validar? El 20-30% de emails en formularios son inválidos o spam. Limpia antes de procesar.

### Paso 5: Enriquecimiento con Clearbit

Añade nodo "HTTP Request":
- URL: https://person.clearbit.com/v2/combined/find
- Headers: Authorization Bearer + API key
- Query: email del lead

Datos que obtienes automáticamente:
- Nombre completo
- Empresa y cargo
- Tamaño de empresa
- Industria
- Redes sociales
- Ubicación

### Paso 6: Calificación con IA (GPT-4)

Añade nodo "OpenAI":
- Operation: Create Completion
- Model: gpt-4
- Prompt personalizado para evaluar calidad del lead

Criterios de calificación:
- 8-10: Empresa mediana/grande, cargo decisorio, presupuesto alto
- 5-7: Empresa pequeña/media, cargo relevante, presupuesto medio
- 1-4: Estudiante, competidor, presupuesto muy bajo

Parsea la respuesta JSON y almacena en variables.

### Paso 7: Enrutamiento Condicional

Añade nodo "IF":
- Condition: score mayor o igual a 8

Rama "true" (Lead caliente):
1. Nodo "WhatsApp Business API" → Mensaje al vendedor
2. Nodo "Pipedrive" → Crear deal
3. Nodo "Gmail/SendGrid" → Email personalizado

Rama "false":
1. Nodo "Google Sheets" → Añadir a lista de newsletter

### Paso 8: Notificación WhatsApp

Usa la API de WhatsApp Business con plantillas aprobadas para notificar al equipo de ventas sobre leads calificados.

## Métricas de Éxito de tu Automatización

| Métrica | Antes | Objetivo | Cómo Medir |
|---------|-------|----------|------------|
| Tiempo respuesta lead | 2-4 horas | Menos de 5 minutos | Timestamp en n8n |
| Tasa de calificación | 0% (manual) | 100% | Logs de ejecución |
| Leads perdidos | 30% | Menos de 5% | CRM vs formularios |
| Costo por lead procesado | $2-3 | $0.10 | API costs / leads |

## Errores Comunes en Automatización

Error #1: Sobre-automatización
Automatizar hasta el último detalle sin considerar edge cases.

Solución: Siempre incluye camino de escape humano. Añade nodo "Wait" con notificación si algo falla 3 veces.

Error #2: Ignorar GDPR/Privacidad
Enviar datos personales a 5 APIs diferentes sin consentimiento explícito.

Solución: Checkbox en formulario: "Acepto que mi información sea procesada para enviarme información relevante".

Error #3: No Testear Antes de Activar
Lanzar workflow sin probar con datos reales.

Solución: Usa nodo "No Operation, do nothing" para capturar datos de prueba sin ejecutar acciones reales.

## Escalabilidad: De 10 a 10,000 Leads

Fase 1: MVP (0-100 leads/mes)
- n8n self-hosted en VPS básico
- Webhook → Email → Google Sheets
- Calificación manual

Fase 2: Crecimiento (100-1,000 leads/mes)
- n8n cloud o VPS dedicado
- Integración CRM (Pipedrive/HubSpot)
- Calificación IA básica
- Seguimiento automatizado email

Fase 3: Escala (1,000+ leads/mes)
- n8n enterprise o custom infrastructure
- Machine learning propio para scoring
- WhatsApp API oficial
- Dashboard analytics en tiempo real

## Inversión y Retorno

Componentes de inversión mensual:
- n8n Cloud (Starter): $20
- Validación email (ZeroBounce): $15 (1,000 validaciones)
- Enriquecimiento (Clearbit): $99 (100 enriquecimientos)
- OpenAI API: $30-50
- WhatsApp Business API: $0.005 por mensaje

Retorno: Si capturas 200 leads calificados adicionales y conviertes 10% a $1,000 cada uno = $20,000/mes generados.

ROI típico: 10,000% o más en los primeros meses.

## Conclusión

La automatización de leads no es el futuro; es el presente competitivo. Mientras tu competencia responde en horas, tú respondes en segundos.

En SunRiver implementamos sistemas de automatización personalizados para PyMEs. Desde la consultoría inicial hasta el deployment y optimización continua.

¿Cuántos leads estás perdiendo esta semana por no tener automatización?
    `,
    author: authors.jorgeDuque,
    publishDate: '2025-02-10',
    readTime: 18,
    category: 'automatizacion',
    tags: ['n8n', 'automatización', 'lead generation', 'crm', 'whatsapp api', 'tutorial'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    meta: {
      title: 'Automatización de Leads con n8n: Tutorial Completo 2025 | SunRiver',
      description: 'Cómo automatizar captación, calificación y seguimiento de leads con n8n. Tutorial paso a paso con WhatsApp, CRM e IA. Caso real: +85% conversión.',
      keywords: ['n8n', 'automatización leads', 'workflow automation', 'crm automation', 'lead scoring ia'],
    },
    relatedArticles: ['implementar-chatbot-ia-pagina-web-2025', 'mejorar-core-web-vitals'],
  },
];

// Helper functions
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getRecentArticles = (limit: number = 6): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};

export const getRelatedArticles = (currentSlug: string): Article[] => {
  const current = getArticleBySlug(currentSlug);
  if (!current?.relatedArticles) return [];
  
  return articles.filter(article => 
    current.relatedArticles?.includes(article.slug) && article.slug !== currentSlug
  );
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
