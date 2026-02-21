import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Database, TrendingDown, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    icon: Clock,
    title: 'Los clientes se escapan',
    description: 'El 80% de leads contactan múltiples proveedores. Si tardas más de 5 minutos en responder, la venta se pierde. Los "Clientes Esperando" se enfrían rápidamente.',
    stat: '5 min',
    statLabel: 'Tiempo crítico',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Database,
    title: 'Silos de información',
    description: 'Tus datos viven fragmentados: WhatsApp, Excel, Correo, Notas. Nada se conecta. Duplicas esfuerzos y pierdes información valiosa en el camino.',
    stat: '40%',
    statLabel: 'Tiempo perdido',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: TrendingDown,
    title: 'Escalabilidad rota',
    description: 'Para vender el doble, necesitas contratar el doble de personal. Tu margen se come la operación. No puedes crecer sin que los costos te ahoguen.',
    stat: '2x',
    statLabel: 'Costo por crecer',
    color: 'from-yellow-500 to-amber-500',
  },
];

const PainPoints = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.pain-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -100, rotateZ: -5 },
          {
            opacity: 1,
            x: 0,
            rotateZ: (i) => [-2, 0, 2][i],
            duration: 0.6,
            stagger: 0.15,
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
      ref={sectionRef}
      className="relative py-24 bg-sunriver-navy overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 166, 35, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 166, 35, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-sunriver-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunriver-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 mb-6">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">
              Problemas que resolvemos
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 opacity-0"
          >
            ¿Te suena{' '}
            <span className="text-gradient">familiar?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estos dolores afectan a la mayoría de empresas en crecimiento. 
            La buena noticia: tienen solución.
          </p>
        </div>

        {/* Pain Points Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="pain-card group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-sunriver-orange/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow opacity-0"
              style={{ transform: `rotate(${[-2, 0, 2][index]}deg)` }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sunriver-orange/0 to-sunriver-blue/0 group-hover:from-sunriver-orange/10 group-hover:to-sunriver-blue/10 transition-all duration-500" />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <point.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-white mb-4 group-hover:text-sunriver-orange transition-colors">
                {point.title}
              </h3>
              <p className="relative text-gray-400 mb-6 leading-relaxed">
                {point.description}
              </p>

              {/* Stat */}
              <div className="relative flex items-center gap-3 pt-4 border-t border-white/10">
                <span className={`text-3xl font-bold bg-gradient-to-r ${point.color} bg-clip-text text-transparent`}>
                  {point.stat}
                </span>
                <span className="text-sm text-gray-500">{point.statLabel}</span>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${point.color} opacity-20 group-hover:opacity-40 transition-opacity rotate-45`} />
              </div>
            </div>
          ))}
        </div>

        {/* Solution Teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            No tienes que seguir sufriendo estos dolores
          </p>
          <div className="inline-flex items-center gap-2 text-sunriver-orange font-semibold">
            <span>Descubre la solución</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
