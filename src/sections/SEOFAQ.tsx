import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto tiempo toma desarrollar mi website?",
    answer: "Gracias a nuestra metodología SOHI y el uso de Inteligencia Artificial, entregamos proyectos ágilmente sin comprometer la calidad. Un sitio web profesional puede estar listo en aproximadamente 5-7 días hábiles, mientras que proyectos más complejos toman alrededor de 2-3 semanas. La velocidad viene de la eficiencia de nuestros procesos, no de recortar calidad."
  },
  {
    question: "¿Qué hace diferente a SunRiver de otras agencias?",
    answer: "Integramos IA desde el primer día: chatbots automáticos, respuestas inteligentes, y automatización de leads. No entregamos solo una página web, entregamos un sistema de crecimiento. Más de 50 PyMEs colombianas ya confían en nosotros. Ofrecemos soporte local, entendemos el mercado latinoamericano, y nuestros precios están adaptados a emprendedores."
  },
  {
    question: "¿Qué incluye el desarrollo de mi website?",
    answer: "Todos nuestros proyectos incluyen: diseño personalizado responsive, dominio (.com o .co) por un año, hosting incluido, certificado SSL de seguridad, formulario de contacto inteligente, integración con WhatsApp Business, chatbot con IA básico, optimización SEO on-page, y panel de administración intuitivo. Todo pensado para que tu negocio crezca desde el día uno."
  },
  {
    question: "¿El servicio incluye posicionamiento en Google?",
    answer: "Sí, todas nuestras webs incluyen optimización SEO técnica: estructura semántica HTML5, meta tags optimizados, velocidad de carga rápida, diseño mobile-first, y configuración de Google Search Console. Para estrategias SEO avanzadas ofrecemos planes adicionales, pero incluso nuestro desarrollo base incluye las bases necesarias para aparecer en Google cuando buscan tu negocio."
  },
  {
    question: "¿Cómo funciona el modelo Low-Cost sin sacrificar calidad?",
    answer: "Utilizamos tecnología de Inteligencia Artificial y frameworks modernos para ofrecer páginas web de alta ingeniería a precios accesibles. Lo que nos permite optimizar costos es la automatización inteligente y procesos eficientes, nunca la calidad. Cada sitio incluye diseño profesional, optimización móvil, velocidad de carga rápida y soporte técnico. Nuestros clientes obtienen resultados empresariales a inversión accesible."
  },
  {
    question: "¿Ofrecen soporte después de la entrega?",
    answer: "Absolutamente. El lanzamiento es solo el comienzo. Ofrecemos planes de soporte continuo que incluyen: actualizaciones de seguridad, respaldo de datos, mejoras de rendimiento, y asistencia técnica. También te capacitamos para que puedas administrar contenido básico. Estamos comprometidos con el éxito a largo plazo de tu proyecto."
  }
];

const SEOFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-20 bg-white"
      aria-label="Preguntas frecuentes"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-blue/10 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-sunriver-blue" />
            <span className="text-sm font-medium text-sunriver-blue">
              Preguntas Frecuentes
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-sunriver-blue mb-4">
            Resolvemos tus dudas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestro proceso de desarrollo web.
            Transparencia total desde el primer día.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-sunriver-orange/30"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 
                  className="text-lg font-semibold text-sunriver-blue pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <span className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-sunriver-orange" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="p-6 pt-0 text-gray-600 leading-relaxed"
                  itemProp="text"
                >
                  {faq.answer}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Tienes más preguntas? Estamos aquí para ayudarte.
          </p>
          <a
            href="https://wa.me/573124183002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default SEOFAQ;
