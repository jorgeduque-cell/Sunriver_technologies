import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, TrendingUp, Clock, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Workflow,
    value: 50,
    suffix: '+',
    label: 'Negocios Transformados',
    description: 'Páginas web que venden',
    color: 'from-sunriver-orange to-orange-400',
  },
  {
    icon: TrendingUp,
    value: 300,
    suffix: '%',
    label: 'Más Alcance Digital',
    description: 'Clientes que crecen con nosotros',
    color: 'from-blue-500 to-blue-400',
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'IA Trabajando por Ti',
    description: 'Auto-respuestas, agendamiento y más',
    color: 'from-purple-500 to-purple-400',
  },
  {
    icon: Zap,
    value: 15,
    suffix: ' días',
    label: 'Entrega Aproximada',
    description: 'De la idea a tu web en línea',
    color: 'from-green-500 to-green-400',
  },
];

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            // Animate counters
            stats.forEach((stat, index) => {
              gsap.to(
                { value: 0 },
                {
                  value: stat.value,
                  duration: 2,
                  ease: 'power2.out',
                  delay: index * 0.2,
                  onUpdate: function () {
                    setCounts((prev) => {
                      const newCounts = [...prev];
                      newCounts[index] = Math.round(this.targets()[0].value);
                      return newCounts;
                    });
                  },
                }
              );
            });
          }
        },
      });

      // Card animations
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunriver-orange via-sunriver-orange/90 to-sunriver-blue" />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Resultados que <span className="text-white/80">se sienten</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            No prometemos — entregamos. Tu página web con propósito, lista para crecer.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 opacity-0"
              >
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} 
                  flex items-center justify-center mb-6
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-bold text-white">
                    {counts[index]}
                  </span>
                  <span className="text-3xl font-bold text-white/80">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-white/60">
                  {stat.description}
                </p>

                {/* Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity -z-10 blur-xl`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sunriver-orange font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Comienza tu transformación digital
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
