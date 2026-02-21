import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';

const SOHIChart = lazy(() => import('../components/SOHIChart'));
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  Layers,
  Zap,
  Network,
  Brain,
  ChevronRight,
  Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sohiLevels = [
  {
    level: 1,
    name: 'Supervivencia Analógica',
    range: '0% - 20%',
    status: 'CRÍTICO',
    description: 'Todo se maneja en Excel, libretas o memoria. Si el dueño enferma, el negocio se detiene.',
    symptoms: ['Dependencia humana severa', 'Procesos no documentados', 'Riesgo alto de quiebra'],
    icon: AlertTriangle,
    color: 'from-red-600 to-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  {
    level: 2,
    name: 'Islas Digitales',
    range: '21% - 40%',
    status: 'INEFICIENTE',
    description: 'Tienen CRM o Software Contable, pero llenan los datos manualmente. Herramientas que no se hablan.',
    symptoms: ['Copiar y pegar entre sistemas', 'Duplicidad de tareas', 'Datos desactualizados'],
    icon: Layers,
    color: 'from-orange-600 to-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    level: 3,
    name: 'Automatización Lineal',
    range: '41% - 60%',
    status: 'REACTIVO',
    description: 'Tienen respuestas automáticas simples o algún Zap básico. Aún requiere supervisión constante.',
    symptoms: ['Automatizaciones frágiles', 'Supervisión humana necesaria', 'Sin integración profunda'],
    icon: Zap,
    color: 'from-yellow-600 to-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
  {
    level: 4,
    name: 'Ecosistema Conectado',
    range: '61% - 80%',
    status: 'OPTIMIZADO',
    description: 'Integración perfecta entre Marketing, Ventas y Admin. Dashboards en tiempo real.',
    symptoms: ['Flujo continuo de datos', 'Visibilidad total', 'Operación sólida'],
    icon: Network,
    color: 'from-blue-600 to-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    level: 5,
    name: 'Inteligencia Autónoma',
    range: '81% - 100%',
    status: 'SUNRIVER MASTER',
    description: 'Agentes IA negocian y operan procesos complejos. La empresa funciona sin intervención diaria.',
    symptoms: ['IA toma decisiones', 'Operación autónoma', 'Escalabilidad infinita'],
    icon: Brain,
    color: 'from-green-600 to-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
];

const SOHIFramework = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const displayLevel = hoveredLevel !== null ? hoveredLevel : selectedLevel;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.sohi-title',
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

      // Pyramid levels animation
      const levels = pyramidRef.current?.querySelectorAll('.pyramid-level');
      if (levels) {
        gsap.fromTo(
          levels,
          { opacity: 0, scaleX: 0, y: 50 },
          {
            opacity: 1,
            scaleX: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pyramidRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                // Activate levels sequentially
                sohiLevels.forEach((_, index) => {
                  setTimeout(() => setActiveLevel(index), 500 + index * 200);
                });
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sohi"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Wave */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-64 animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(245, 166, 35, 0.05)"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-blue/10 rounded-full border border-sunriver-blue/20 mb-6">
            <Target className="w-4 h-4 text-sunriver-blue" />
            <span className="text-sm font-medium text-sunriver-blue">
              Framework Exclusivo
            </span>
          </div>
          <h2 className="sohi-title text-4xl sm:text-5xl font-bold text-sunriver-blue mb-4 opacity-0">
            El Índice <span className="text-gradient">SOHI</span>
          </h2>
          <p className="sohi-title text-gray-600 text-lg max-w-2xl mx-auto opacity-0">
            <strong>Sunriver Operational Health Index</strong> - Descubre tu nivel de madurez digital
            y el camino hacia la excelencia operativa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Pyramid Visualization */}
          <div ref={pyramidRef} className="relative">
            <div className="space-y-3">
              {sohiLevels.map((level, index) => {
                const Icon = level.icon;
                const width = 100 - index * 12;
                const isActive = activeLevel !== null && index <= activeLevel;
                const isHovered = hoveredLevel === index;
                const isSelected = selectedLevel === index;

                return (
                  <div
                    key={level.level}
                    className="pyramid-level mx-auto opacity-0"
                    style={{ width: `${width}%` }}
                    onMouseEnter={() => setHoveredLevel(index)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    onClick={() => setSelectedLevel(isSelected ? null : index)}
                  >
                    <div
                      className={`
                        relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer
                        ${level.bgColor} ${level.borderColor}
                        ${isActive ? 'shadow-lg scale-105' : 'opacity-70'}
                        ${isHovered || isSelected ? 'shadow-xl scale-110 z-10 ring-2 ring-offset-2 ring-sunriver-blue/20' : ''}
                      `}
                    >
                      {/* Level Number */}
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${level.color} 
                        flex items-center justify-center text-white font-bold
                        ${isActive ? 'animate-pulse' : ''}
                      `}>
                        {level.level}
                      </div>

                      {/* Level Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sunriver-blue truncate">
                            {level.name}
                          </h3>
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-sunriver-orange' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded bg-gradient-to-r ${level.color} text-white`}>
                            {level.range}
                          </span>
                          <span className="text-xs text-gray-500">{level.status}</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className={`
                        w-5 h-5 transition-all duration-300
                        ${isHovered || isSelected ? 'translate-x-1 text-sunriver-orange' : 'text-gray-400'}
                      `} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pyramid Base Label */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Nivel actual → Nivel objetivo
              </p>
            </div>
          </div>

          {/* Level Details */}
          <div className="lg:sticky lg:top-32">
            {displayLevel !== null ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fade-in">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${sohiLevels[displayLevel].bgColor} mb-4`}>
                  {(() => {
                    const Icon = sohiLevels[displayLevel].icon;
                    return <Icon className="w-4 h-4" />;
                  })()}
                  <span className="text-sm font-medium">Nivel {sohiLevels[displayLevel].level}</span>
                </div>

                <h3 className="text-2xl font-bold text-sunriver-blue mb-2">
                  {sohiLevels[displayLevel].name}
                </h3>

                <p className="text-gray-600 mb-6">
                  {sohiLevels[displayLevel].description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Síntomas característicos:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {sohiLevels[displayLevel].symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sohiLevels[displayLevel].color}`} />
                        {symptom}
                      </li>
                    ))}
                  </ul>

                  {/* Dynamic Radar Chart */}
                  <div className="h-48 w-full mt-4 -ml-4">
                    <Suspense fallback={<div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />}>
                      <SOHIChart level={sohiLevels[displayLevel].level} />
                    </Suspense>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-sunriver-blue to-sunriver-blue-light rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <Target className="w-8 h-8 text-sunriver-orange" />
                  <h3 className="text-2xl font-bold">¿Cuál es tu nivel?</h3>
                </div>
                <p className="text-white/80 mb-6 relative z-10">
                  Descubre en qué nivel se encuentra tu empresa y cuál es el camino
                  para alcanzar la excelencia operativa con nuestro diagnóstico gratuito.
                </p>

                {/* Chart Preview Background */}
                <div className="absolute -right-10 -bottom-10 opacity-10 scale-150 pointer-events-none">
                  <Suspense fallback={null}>
                    <SOHIChart level={5} />
                  </Suspense>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-white/70">Auditoría gratuita de 30 minutos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-white/70">Evaluación de tus procesos actuales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-white/70">Roadmap personalizado al Nivel 5</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SOHIFramework;
