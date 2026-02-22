// Mock conversacional para desarrollo local
// Simula un asistente que diagnostica y explora necesidades antes de vender

interface ConversationState {
  stage: 'greeting' | 'discovery' | 'diagnosis' | 'solution' | 'closing';
  industry?: string;
  hasWebsite?: boolean;
  mainPain?: string;
  sohiLevel?: number;
}

// Estado simple en memoria (por sesión)
let conversationState: ConversationState = { stage: 'greeting' };

const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const analyzeIntent = (message: string): string => {
  const lower = message.toLowerCase();
  
  if (lower.includes('hola') || lower.includes('buenas') || lower.includes('hey')) return 'greeting';
  if (lower.includes('tienda') || lower.includes('restaurante') || lower.includes('consultorio') || lower.includes('gimnasio') || lower.includes('agencia') || lower.includes('constructora')) return 'industry';
  if (lower.includes('web') || lower.includes('página') || lower.includes('sitio')) return 'website';
  if (lower.includes('cliente') || lower.includes('venta') || lower.includes('lead') || lower.includes('automatizar') || lower.includes('ahorrar tiempo') || lower.includes('proceso')) return 'pain';
  if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('valor') || lower.includes('inversión')) return 'pricing';
  if (lower.includes('contacto') || lower.includes('whatsapp') || lower.includes('correo') || lower.includes('llamar')) return 'contact';
  if (lower.includes('gracias') || lower.includes('perfecto') || lower.includes('suena bien') || lower.includes('me interesa')) return 'interest';
  return 'general';
};

export const mockChatResponse = async (message: string, messageHistory: {role: string, content: string}[] = []): Promise<string> => {
  // Simular delay realista de red + procesamiento
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  const intent = analyzeIntent(message);
  const historyLength = messageHistory.length;
  
  // Actualizar estado según la conversación
  if (historyLength <= 2) conversationState.stage = 'greeting';
  else if (historyLength <= 6) conversationState.stage = 'discovery';
  else if (historyLength <= 10) conversationState.stage = 'diagnosis';
  else conversationState.stage = 'solution';

  // ========== GREETING / PRIMER CONTACTO ==========
  if (intent === 'greeting' || conversationState.stage === 'greeting') {
    const greetings = [
      `¡Hola! 👋 Qué gusto saludarte. Soy el asistente virtual de SunRiver Solution.\n\nAntes de contarte lo que hacemos, me gustaría conocerte mejor. ¿Me cuentas qué tipo de negocio tienes? Por ejemplo: ¿eres tienda, consultorio, agencia, restaurante...?`,
      
      `¡Buenas! 🚀 Bienvenido a SunRiver.\n\nVeo que estás explorando opciones para tu negocio. Para poder orientarte mejor, ¿me dices en qué sector te desempeñas? Así puedo darte información más relevante.`,
      
      `¡Hola! Me alegra que estés aquí. 👋\n\nEn SunRiver no creemos en soluciones genéricas. Cada negocio es diferente. ¿Me cuentas un poco sobre el tuyo? ¿A qué te dedicas?`
    ];
    conversationState.stage = 'discovery';
    return getRandomResponse(greetings);
  }

  // ========== DETECTAR INDUSTRIA ==========
  if (intent === 'industry' || message.length < 50 && conversationState.stage === 'discovery') {
    const industries: Record<string, string[]> = {
      'tienda': [
        `¡Interesante! Una tienda de ropa 👕\n\nCuéntame: ¿actualmente vendes solo físico, online, o ambos? Y una pregunta clave: ¿cuánto tiempo al día pierdes respondiendo los mismos mensajes de "¿tienes en talla X?" o "¿hacen envíos?"?`,
        `¡Me encanta el retail! 👗\n\nLas tiendas de ropa suelen tener un dolor muy específico: atender preguntas repetitivas que podrían automatizarse. ¿Te pasa eso? ¿Cuántas horas al día dedicas a responder WhatsApp/IG?`
      ],
      'restaurante': [
        `¡Restaurante! 🍽️ Uno de mis favoritos.\n\nDéjame hacerte una pregunta rápida: ¿cuántas llamadas/mensajes recibes al día preguntando por el menú, precios o disponibilidad? ¿Y cuántas de esas no terminan en reserva?`,
        `¡Comida! Mi debilidad 🍕\n\nLos restaurantes que atendemos suelen perder clientes porque no responden rápido los mensajes. ¿Te pasa que a veces no puedes atender todos los mensajes de inmediato?`
      ],
      'consultorio': [
        `¡Sector salud! 🏥 Muy noble.\n\nEn consultorios vemos un patrón: mucho tiempo gestionando citas y cancelaciones por WhatsApp. ¿Cuánto tiempo de tu asistente (o el tuyo) se va en eso? ¿Te gustaría que los pacientes pudieran agendar solos?`,
        `¡Un consultorio! 💉\n\nUna pregunta importante: ¿cuántos pacientes pierdes porque no logran comunicarse a la primera? O porque tu asistente está ocupada atendiendo presencial y no puede responder el teléfono/WhatsApp.`
      ],
      'default': [
        `¡Perfecto! Gracias por compartirlo. 📝\n\nAhora, hablemos de tu situación actual: ¿ya tienes una página web o presencia digital? O ¿todo es por redes sociales y referidos?`,
        `Entendido. 👍\n\nVamos a un diagnóstico rápido. En una escala del 1 al 5, donde 1 es "todo manual y caótico" y 5 es "todo automatizado", ¿cómo calificarías tu operación actual?`
      ]
    };
    
    const msg = message.toLowerCase();
    let responses = industries['default'];
    if (msg.includes('tienda') || msg.includes('ropa') || msg.includes('retail')) responses = industries['tienda'];
    else if (msg.includes('restaurant') || msg.includes('comida') || msg.includes('café')) responses = industries['restaurante'];
    else if (msg.includes('consultorio') || msg.includes('médico') || msg.includes('dental') || msg.includes('salud')) responses = industries['consultorio'];
    
    return getRandomResponse(responses);
  }

  // ========== DESCUBRIR SOBRE WEBSITE ==========
  if (intent === 'website' || message.includes('no tengo') || message.includes('solo redes')) {
    const webResponses = [
      `Entiendo, muchos negocios exitosos empiezan así. 📱\n\nPero aquí va mi pregunta clave: ¿cuántos clientes potenciales crees que pierdes porque no te encuentran en Google? O porque tus redes no convencen a alguien que quiere validar que eres confiable.\n\n¿Te ha pasado que alguien dice "te vi en Instagram pero no encontré más info sobre ustedes"?`,
      
      `Vale, las redes son un buen inicio. 📲\n\nPero piensa en esto: ¿cuántas veces has perdido una venta porque el cliente quería pagar online y no podía? O porque no encontraba tu catálogo actualizado?\n\n¿El 90% de tu negocio viene de referidos o también llegan clientes "fríos" por internet?`,
      
      `Ok, trabajas con lo que tienes. 💪\n\nDéjame hacerte una pregunta de diagnóstico SOHI: Cuando un cliente interesado te escribe a las 11pm un sábado, ¿qué pasa? ¿Responde alguien o esperan hasta el lunes? Porque ese delay puede ser la diferencia entre vender o no.`
    ];
    return getRandomResponse(webResponses);
  }

  // ========== DETECTAR DOLOR / PROBLEMA ==========
  if (intent === 'pain' || message.includes('tiempo') || message.includes('mucho') || message.includes('no doy abasto')) {
    const painResponses = [
      `¡Eso es exactamente lo que resolvemos! 🎯\n\nParece que estás en el "infierno de los negocios crecientes": tienes demanda, pero tu operación no escala contigo.\n\nCuéntame más: ¿el cuello de botella está en la atención al cliente, en los procesos administrativos, o en que no tienes presencia digital profesional?`,
      
      `Exacto, ese es el dolor de cabeza #1 de las PyMEs. 😤\n\nTrabajas 12 horas pero sientes que no avanzas. La buena noticia: el 70% de esas tareas repetitivas se pueden automatizar con IA.\n\n¿Me das un ejemplo específico? ¿Qué tarea odias hacer todos los días que crees que una máquina podría hacer por ti?`,
      
      `Te entiendo perfectamente. Eso agota. 😮‍💨\n\nHagamos un mini-diagnóstico SOHI (nuestro índice de madurez digital). Responde rápido:\n\n1️⃣ ¿Tienes forma de capturar leads automáticamente?\n2️⃣ ¿Tus clientes pueden agendar/pagar sin que tú intervengas?\n3️⃣ ¿Tienes una página que venda por ti 24/7?\n\n¿Cuántas de esas tres tienes?`
    ];
    return getRandomResponse(painResponses);
  }

  // ========== PRECIO / INVERSIÓN ==========
  if (intent === 'pricing') {
    const priceResponses = [
      `Muy buena pregunta. 💰\n\nPero antes de hablar de números, necesito entender qué necesitas. Una web básica no es lo mismo que un sistema con IA integrada.\n\n¿Me cuentas: ¿buscas solo presencia digital (que te encuentren), o quieres que la web trabaje por ti (venda, agende, responda)? Porque eso cambia todo.`,
      
      `Honestamente, depende de lo que necesites. 🎯\n\nTenemos proyectos desde websites simples hasta ecosistemas completos con IA.\n\nPero te propongo algo mejor: ¿qué tal si hacemos una auditoría gratuita de 15 minutos? Analizamos tu negocio, te decimos en qué nivel SOHI estás, y ahí sí te damos una propuesta a tu medida. ¿Te funciona?`,
      
      `Inversión justa para el valor que recibes. 📊\n\nPero mira, mejor que te lance números al aire, déjame entender tu caso.\n\nSi pudieras solucionar UN SOLO problema con tecnología (el que más te quita sueño), ¿cuál sería? Con eso ya te puedo decir qué solución y qué rango de inversión aplica.`
    ];
    return getRandomResponse(priceResponses);
  }

  // ========== INTERÉS / CIERRE ==========
  if (intent === 'interest' || intent === 'contact') {
    const closingResponses = [
      `¡Me encanta tu interés! 🚀\n\nVamos a lo concreto. Te propongo dos opciones:\n\n1️⃣ **Auditoría gratuita (15 min)**: Analizo tu negocio y te digo exactamente en qué nivel SOHI estás y qué necesitas para subir al siguiente.\n2️⃣ **Cotización rápida**: Si ya sabes lo que quieres, me das tu email y te envío opciones.\n\n¿Cuál prefieres? O si es más fácil, escríbenos por WhatsApp: +57 312 4183002`,
      
      `¡Perfecto! Vamos avanzando. 💪\n\nPara darte la mejor orientación, ¿te parece si agendamos una llamada rápida? Es gratis, sin compromiso. Solo 15-20 minutos donde:\n\n✅ Evaluamos tu situación actual\n✅ Te decimos tu nivel SOHI\n✅ Te mostramos el camino para escalar\n\nPuedes agendar aquí: https://calendly.com/jorge_duque-sunriver/30min o escribir por WhatsApp. ¿Qué te funciona mejor?`
    ];
    return getRandomResponse(closingResponses);
  }

  // ========== RESPUESTAS GENERALES / CONTEXTO ==========
  const generalResponses = [
    `Interesante. Cuéntame más sobre eso. 🤔\n\n¿Eso es algo que te está frenando ahora mismo, o es más bien una mejora que te gustaría tener en el futuro?`,
    
    `Entiendo. Y si pudieras cambiar una cosa de tu operación hoy mismo, ¿cuál sería? La que más dolor te causa. 💭`,
    
    `Vale, estoy captando. ¿Y eso que me cuentas, ¿afecta tus ventas directamente o más bien tu tiempo/libertad? 🎯`,
    
    `Gracias por compartir eso. 🙏\n\nHagamos un ejercicio rápido: Imagina que es 6 meses después y tu negocio funciona "solo" con la tecnología adecuada. ¿Qué es lo primero que notas que cambió? ¿Más clientes, más tiempo libre, menos estrés...?`
  ];

  // Si ya ha habido varios mensajes, empujar hacia el cierre suavemente
  if (historyLength > 8) {
    return `Veo que hemos conversado bastante y ya tengo una idea clara de tu situación. 🎯\n\nTe propongo concretar: ¿te gustaría que agendemos una llamada gratuita de diagnóstico? En 15 minutos te mostramos exactamente qué necesitas para llevar tu negocio al siguiente nivel con tecnología. Sin compromiso.\n\nAgenda aquí: https://calendly.com/jorge_duque-sunriver/30min o escribe al WhatsApp +57 312 4183002. ¿Cuál prefieres?`;
  }

  return getRandomResponse(generalResponses);
};

// Resetear estado (útil para testing)
export const resetConversation = () => {
  conversationState = { stage: 'greeting' };
};
