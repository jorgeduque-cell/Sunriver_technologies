import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, LayoutTemplate, Code2, TrendingUp, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description: 'Auditoría gratuita de 30 minutos. Identificamos tus dolores, cuellos de botella y oportunidades de automatización.',
    details: ['Mapeo de procesos', 'Análisis de herramientas actuales', 'Identificación de quick wins'],
    color: 'from-sunriver-orange to-orange-400',
  },
  {
    number: '02',
    icon: LayoutTemplate,
    title: 'Arquitectura',
    description: 'Diseñamos tu Cerebro Digital a medida. Planificamos integraciones, automatizaciones y flujos de datos.',
    details: ['Diseño de arquitectura', 'Selección de herramientas', 'Roadmap de implementación'],
    color: 'from-blue-500 to-blue-400',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Implementación',
    description: 'Construimos las integraciones y automatizaciones. Código robusto, documentado y escalable.',
    details: ['Desarrollo ágil', 'Testing exhaustivo', 'Documentación completa'],
    color: 'from-purple-500 to-purple-400',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimización',
    description: 'Monitoreo continuo y mejora constante. Tu sistema evoluciona con tu negocio.',
    details: ['Métricas en tiempo real', 'Ajustes basados en datos', 'Soporte continuo'],
    color: 'from-green-500 to-green-400',
  },
];

const Methodology = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.methodology-title',
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

      // Path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.step-card');
      if (stepElements) {
        gsap.fromTo(
          stepElements,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stepsRef.current,
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
      id="metodologia"
      ref={sectionRef}
      className="relative py-24 bg-sunriver-navy overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sunriver-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sunriver-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
            <CheckCircle2 className="w-4 h-4 text-sunriver-orange" />
            <span className="text-sm font-medium text-white">
              Proceso Probado
            </span>
          </div>
          <h2 className="methodology-title text-4xl sm:text-5xl font-bold text-white mb-4 opacity-0">
            Nuestra <span className="text-gradient">Metodología</span>
          </h2>
          <p className="methodology-title text-gray-400 text-lg max-w-2xl mx-auto opacity-0">
            De lo imposible a lo inevitable en 4 pasos. Un proceso probado 
            que garantiza resultados medibles.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Path - Desktop */}
          <svg
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M0,10 Q150,10 200,10 L300,10 Q350,10 400,10 L500,10 Q550,10 600,10 L700,10 Q750,10 800,10 L900,10 Q950,10 1000,10 L1200,10"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5A623" />
                <stop offset="100%" stopColor="#1E3A5F" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps Grid */}
          <div
            ref={stepsRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="step-card group relative opacity-0"
                >
                  {/* Step Node */}
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-sunriver-orange/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-6">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} text-white font-bold text-sm shadow-lg`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="pt-4 mb-4">
                      <div className={`
                        w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} 
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sunriver-orange transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity -z-10`} />
                  </div>

                  {/* Connector Dot */}
                  <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.color}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">Sin costo inicial</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">Resultados en 30 días</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">Soporte continuo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
