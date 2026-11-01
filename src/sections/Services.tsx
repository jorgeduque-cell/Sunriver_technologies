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
    icon: Bot,
    title: 'Automatización de Procesos & Bots',
    description: 'Bots inteligentes que operan 24/7: scraping web, reservas automáticas, notificaciones Telegram y WhatsApp. Probados en producción con tests unitarios.',
    features: ['Bots de producción (VPS)', 'Web Scraping avanzado', 'Integración Telegram & WhatsApp'],
    color: 'from-emerald-500 to-teal-500',
    longDescription: 'Desarrollamos bots de automatización robustos desplegados en servidores VPS con PM2. Desde nuestro ReservationSystem.BOT — un sistema de reservas automatizadas por scraping web con tests Jest — hasta workflows N8N y cron jobs. Todo TypeScript, todo testeado, todo en producción.',
    useCases: [
      'Bots de reservas automáticas con web scraping (proyecto real en GitHub)',
      'Automatización de WhatsApp Business y Telegram para ventas',
      'Workflows N8N para orquestación de procesos',
      'Cron jobs y tareas programadas en VPS con PM2',
      'Tests unitarios con Jest para garantizar estabilidad',
    ],
    results: 'Nuestros bots operan 24/7 en producción sin intervención humana, con código abierto verificable en GitHub.',
  },
  {
    icon: FileText,
    title: 'Sistemas CRM & ERP a Medida',
    description: 'CRM y plataformas administrativas enterprise con Docker, frontend/backend separados y arquitectura escalable.',
    features: ['Arquitectura enterprise', 'Docker & microservicios', 'Dashboards en tiempo real'],
    color: 'from-blue-500 to-blue-400',
    longDescription: 'Construimos sistemas CRM y ERP desde cero con arquitectura enterprise: separación frontend/backend, Docker para despliegue, Prisma ORM para base de datos, y dashboards en tiempo real. No usamos plantillas — escribimos código a medida para cada negocio.',
    useCases: [
      'CRM con gestión de clientes, leads y pipeline de ventas',
      'Paneles administrativos con roles y permisos granulares',
      'Facturación electrónica y conciliación bancaria',
      'Reportes automáticos y exportación de datos',
      'Despliegue containerizado con Docker para escalabilidad',
    ],
    results: 'Sistemas enterprise que procesan miles de transacciones diarias con zero downtime.',
  },
  {
    icon: Link2,
    title: 'Integración de Ecosistemas Digitales',
    description: 'Conectamos CRM, ERP, WhatsApp, pasarelas de pago, Telegram y más en un solo ecosistema fluido.',
    features: ['APIs REST robustas', 'Sincronización real-time', 'Zero doble digitación'],
    color: 'from-purple-500 to-purple-400',
    longDescription: 'Creamos puentes digitales entre todas tus herramientas usando APIs REST con TypeScript estricto. Desde pasarelas de pago hasta bots de Telegram, cada integración es tipada, testeada y documentada.',
    useCases: [
      'APIs REST con TypeScript y validación Zod',
      'Integración WhatsApp Business + CRM + contabilidad',
      'Pasarelas de pago conectadas a facturación automática',
      'Webhooks y event-driven architecture',
      'APIs personalizadas para conectar software legacy',
    ],
    results: 'Ecosistemas donde la información fluye sin fricción entre todos tus sistemas.',
  },
  {
    icon: Users,
    title: 'Agentes IA & Chatbots Cognitivos',
    description: 'IA que razona, toma decisiones y negocia. Framework SOHI propio para medir madurez digital.',
    features: ['Chatbots con IA integrada', 'Framework SOHI exclusivo', 'Aprendizaje continuo'],
    color: 'from-rose-500 to-pink-500',
    longDescription: 'Desarrollamos agentes IA que van más allá de chatbots simples. Nuestro framework SOHI (Sunriver Operational Health Index) mide la madurez digital de tu empresa y traza el roadmap hacia la autonomía operativa. Cada agente entiende contexto y toma decisiones.',
    useCases: [
      'Chatbots IA integrados en tu web que resuelven el 90% de consultas',
      'Diagnóstico SOHI: evaluación de madurez digital en 5 niveles',
      'Asistentes de ventas con negociación automática',
      'Clasificación inteligente de leads y priorización',
      'Análisis de datos con generación automática de insights',
    ],
    results: 'Framework SOHI exclusivo + agentes IA que reducen 70% del tiempo de respuesta.',
  },
  {
    icon: Code2,
    title: 'Desarrollo Web & Móvil Premium',
    description: 'React 19, TypeScript, Three.js, GSAP. Código de alto nivel con animaciones cinematográficas y SEO avanzado.',
    features: ['React 19 + TypeScript', 'Three.js & Animaciones 3D', 'SEO avanzado'],
    color: 'from-cyan-500 to-cyan-400',
    longDescription: 'Construimos con el stack más moderno del mercado: React 19, TypeScript estricto, Three.js para visualizaciones 3D, GSAP para animaciones cinematográficas, Radix UI para accesibilidad, y Tailwind CSS. Esta misma web es prueba de lo que entregamos — verificable en GitHub.',
    useCases: [
      'SPAs con React 19 y Three.js (como esta web — ver GitHub)',
      'Animaciones cinematográficas con GSAP y ScrollTrigger',
      'SEO avanzado con schema markup y meta tags dinámicos',
      'PWAs con funcionamiento offline y notificaciones push',
      'Sistemas de blog y CMS integrados',
    ],
    results: 'Sitios web que cargan en menos de 2 segundos con Lighthouse Score 95+.',
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
