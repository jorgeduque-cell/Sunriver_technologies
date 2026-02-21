import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  FileText,
  Link2,
  Bot,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Users,
    title: 'Automatización de Leads',
    description: 'Captura, calificación y seguimiento 24/7. Filtra curiosos automáticamente y maximiza el tiempo de tu equipo de ventas.',
    features: ['Respuesta inmediata', 'Calificación automática', 'Seguimiento inteligente'],
    color: 'from-sunriver-orange to-orange-400',
    longDescription: 'Implementamos un ecosistema completo de captura y gestión de leads que trabaja las 24 horas. Desde el primer contacto hasta la calificación SOHI, cada interacción es registrada, analizada y optimizada para maximizar tu tasa de conversión.',
    useCases: [
      'Chatbots inteligentes que capturan leads desde tu web y redes sociales',
      'Scoring automático basado en comportamiento e intención de compra',
      'Seguimiento por email, WhatsApp y SMS sin intervención manual',
      'Integración directa con tu CRM para flujo continuo',
      'Reportes en tiempo real de la calidad de tus leads',
    ],
    results: 'Nuestros clientes ven un aumento promedio del 300% en leads calificados en los primeros 90 días.',
  },
  {
    icon: FileText,
    title: 'Gestión Administrativa',
    description: 'Facturas, conciliación de pagos y gestión documental sin intervención humana. Tu back-office opera solo.',
    features: ['Facturación automática', 'Conciliación bancaria', 'Archivo inteligente'],
    color: 'from-blue-500 to-blue-400',
    longDescription: 'Eliminamos las horas perdidas en tareas administrativas repetitivas. Desde la emisión de facturas hasta la conciliación bancaria, tu back-office se convierte en una máquina autónoma que no comete errores.',
    useCases: [
      'Facturación electrónica automática con integración DIAN',
      'Conciliación bancaria inteligente que detecta discrepancias',
      'Gestión documental con OCR y clasificación automática',
      'Flujos de aprobación digitales con notificaciones',
      'Generación automática de reportes contables',
    ],
    results: 'Reducción del 80% en tiempo de procesos administrativos y eliminación de errores humanos.',
  },
  {
    icon: Link2,
    title: 'Integración de Sistemas',
    description: 'Conectamos lo inconectable. CRM, ERP, WhatsApp, pasarelas de pago - todo en un solo ecosistema.',
    features: ['APIs universales', 'Sincronización real-time', 'Sin límites técnicos'],
    color: 'from-purple-500 to-purple-400',
    longDescription: 'Creamos puentes digitales entre todas tus herramientas. Ya no más copiar datos entre sistemas o mantener hojas de cálculo paralelas. Un solo ecosistema donde la información fluye sin fricción.',
    useCases: [
      'Conexión bidireccional entre CRM, ERP y herramientas de marketing',
      'Integración con WhatsApp Business API para ventas y soporte',
      'Pasarelas de pago conectadas directamente a tu contabilidad',
      'Sincronización en tiempo real entre inventario, ventas y logística',
      'APIs personalizadas para conectar software legacy',
    ],
    results: 'Eliminación completa de la doble digitación y datos siempre sincronizados al instante.',
  },
  {
    icon: Bot,
    title: 'Agentes IA Cognitivos',
    description: 'Inteligencia Artificial que razona, toma decisiones complejas y negocia procesos como un experto humano.',
    features: ['Procesamiento de lenguaje', 'Toma de decisiones', 'Aprendizaje continuo'],
    color: 'from-green-500 to-green-400',
    longDescription: 'Desarrollamos agentes de IA que van más allá de los chatbots tradicionales. Nuestros agentes cognitivos entienden contexto, toman decisiones complejas y mejoran continuamente con cada interacción.',
    useCases: [
      'Agentes de atención al cliente que resuelven el 90% de consultas sin escalamiento',
      'Asistentes de ventas que negocian precios y condiciones dentro de parámetros definidos',
      'Analistas de datos que generan insights y recomendaciones automáticas',
      'Asistentes internos que ayudan a tu equipo con documentación y procesos',
      'Clasificación inteligente de tickets y priorización automática',
    ],
    results: 'Reducción del 70% en tiempo de respuesta y aumento del 40% en satisfacción del cliente.',
  },
  {
    icon: Code2,
    title: 'Desarrollo de Software',
    description: 'Sitios web, aplicaciones móviles y plataformas a medida. Código limpio, escalable y de alto rendimiento.',
    features: ['Websites & landing pages', 'Apps móviles', 'Plataformas web a medida'],
    color: 'from-cyan-500 to-cyan-400',
    longDescription: 'Diseñamos y construimos software que impulsa tu negocio. Desde landing pages de alto rendimiento hasta aplicaciones móviles complejas y plataformas web escalables. Todo con código limpio, arquitectura moderna y diseño centrado en el usuario.',
    useCases: [
      'Sitios web corporativos con diseño premium y optimización SEO',
      'Aplicaciones móviles nativas e híbridas (iOS y Android)',
      'Plataformas SaaS con panel de administración completo',
      'E-commerce personalizado con integración de pagos',
      'PWAs (Progressive Web Apps) que funcionan offline',
    ],
    results: 'Productos digitales que generan resultados desde el día uno, con tiempos de carga menores a 2 segundos.',
  },
];

type ServiceType = typeof services[number];

const ServiceDetailModal = ({
  service,
  isOpen,
  onClose
}: {
  service: ServiceType | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl rounded-3xl p-0">
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-br ${service.color} p-8 pb-12 rounded-t-3xl`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">{service.title}</DialogTitle>
              </DialogHeader>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 -mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <DialogDescription className="text-gray-600 text-base leading-relaxed">
              {service.longDescription}
            </DialogDescription>
          </div>

          {/* Use Cases */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-sunriver-blue mb-4">¿Qué incluye?</h4>
            <ul className="space-y-3">
              {service.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${service.color} text-white rounded-full p-0.5`} />
                  <span className="text-gray-600 text-sm">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results Banner */}
          <div className={`bg-gradient-to-r ${service.color} bg-opacity-10 rounded-2xl p-5 mb-8`}>
            <p className="text-white text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {service.results}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://calendly.com/jorge_duque-sunriver/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white font-semibold rounded-full hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Agendar Consulta Gratis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/573124183002?text=%F0%9F%9A%80%20Hola%20SunRiver%2C%20estoy%20interesado%20en%20un%20desarrollo%20web%20con%20IA%20para%20mi%20negocio.%20%C2%BFPodemos%20agendar%20una%20consulta%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-sunriver-blue text-white font-semibold rounded-full hover:bg-sunriver-blue-light transition-colors"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openServiceDetail = (service: ServiceType) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.services-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards flip animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, rotateX: 90, y: 80 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E3A5F 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-orange/10 rounded-full border border-sunriver-orange/20 mb-6">
            <Sparkles className="w-4 h-4 text-sunriver-orange" />
            <span className="text-sm font-medium text-sunriver-orange">
              Soluciones a Medida
            </span>
          </div>
          <h2 className="services-title text-4xl sm:text-5xl font-bold text-sunriver-blue mb-4 opacity-0">
            Nuestros <span className="text-gradient">Servicios</span>
          </h2>
          <p className="services-title text-gray-600 text-lg max-w-2xl mx-auto opacity-0">
            Ingeniería de automatización robusta, no plantillas genéricas.
            Construimos código a medida para tu negocio.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover opacity-0 cursor-pointer"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                onClick={() => openServiceDetail(service)}
              >
                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sunriver-orange to-sunriver-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 p-[2px]">
                  <div className="w-full h-full bg-white rounded-2xl" />
                </div>

                {/* Icon */}
                <div className={`
                  relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} 
                  flex items-center justify-center mb-6 
                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                  shadow-lg
                `}>
                  <Icon className="w-8 h-8 text-white" />

                  {/* Icon Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-sunriver-blue mb-3 group-hover:text-sunriver-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="flex items-center gap-2 text-sm font-semibold text-sunriver-blue group-hover:text-sunriver-orange transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openServiceDetail(service);
                  }}
                >
                  Saber más
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${service.color} opacity-20 rotate-45`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">
            ¿Necesitas algo específico? No hay límites técnicos.
          </p>
          <button
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-sunriver-blue text-white font-semibold rounded-full hover:bg-sunriver-blue-light transition-colors"
          >
            Hablar de tu proyecto
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Services;
