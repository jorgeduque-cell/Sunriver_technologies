import { useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';
import HeroMobileFallback from '../components/HeroMobileFallback';

const Hero3D = lazy(() => import('../components/Hero3D'));

// Fallback simple mientras carga el 3D
const Hero3DFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-sunriver-orange/20 to-sunriver-blue/20 animate-pulse blur-xl" />
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const deviceConfig = useDeviceType();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background gradient animation
      tl.fromTo(
        '.hero-bg',
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Title animation with clip-path
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
        '-=0.7'
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // Body text animation
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

      // CTA buttons animation
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1 },
        '-=0.2'
      );

      // Emblem animation
      tl.fromTo(
        emblemRef.current,
        { opacity: 0, rotateY: 90 },
        { opacity: 1, rotateY: 0, duration: 1 },
        '-=0.8'
      );

      // Floating particles - reducir en móvil
      const particleCount = deviceConfig.type === 'mobile' ? 5 : 15;
      gsap.to('.particle', {
        y: '-=30',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });

      // Parallax effect on scroll
      gsap.to(emblemRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [deviceConfig.type]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Renderizar contenido visual según el dispositivo
  const renderVisualContent = () => {
    // Móvil: Usar fallback CSS elegante
    if (!deviceConfig.enable3D) {
      return <HeroMobileFallback />;
    }

    // Tablet/Desktop: Usar 3D con lazy loading
    return (
      <Suspense fallback={<Hero3DFallback />}>
        <Hero3D config={{
          sunSegments: deviceConfig.sunSegments,
          planetSegments: deviceConfig.planetSegments,
          starCount: deviceConfig.starCount,
          enableGlow: deviceConfig.enableGlow,
          antialias: deviceConfig.antialias,
        }} />
      </Suspense>
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-sunriver-orange/5 to-sunriver-blue/10"
      aria-label="Hero principal"
    >
      {/* Animated Background */}
      <div className="hero-bg absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sunriver-orange/10 via-transparent to-sunriver-blue/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sunriver-blue/5 to-transparent" />
      </div>

      {/* Floating Particles - optimizadas por dispositivo */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(deviceConfig.type === 'mobile' ? 5 : 15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'rgba(245, 166, 35, 0.3)' : 'rgba(30, 58, 95, 0.2)',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sunriver-orange/10 rounded-full border border-sunriver-orange/20">
              <Sparkles className="w-4 h-4 text-sunriver-orange" />
              <span className="text-sm font-medium text-sunriver-orange">
                Transformación Digital con IA
              </span>
            </div>

            {/* Parallax wrapper for the content */}
            <div ref={(el) => { if (el && heroRef.current) gsap.to(el, { scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 }, y: -80, opacity: 0.3 }); }}>
              {/* Main Title - H1 */}
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-sunriver-blue leading-tight opacity-0"
              >
                <span className="block">Tu negocio</span>
                <span className="block text-gradient">merece brillar</span>
              </h1>
            </div>

            {/* Subtitle - H2 */}
            <h2
              ref={subtitleRef}
              className="text-2xl sm:text-3xl font-bold text-sunriver-blue/80 opacity-0"
            >
              Websites con Propósito a nivel internacional, formato Low-Cost
            </h2>

            {/* Body Text */}
            <p
              ref={bodyRef}
              className="text-lg text-gray-600 max-w-xl leading-relaxed opacity-0"
            >
              Creamos <strong className="text-sunriver-blue">sitios web ultra profesionales</strong> con alcance global.
              Soluciones de <strong>alta ingeniería a precios accesibles</strong> (Low-Cost),
              impulsadas por <strong className="text-sunriver-blue"> Inteligencia Artificial</strong> y automatización que trabaja por ti 24/7.
              No solo construimos páginas — entregamos máquinas de crecimiento.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#contacto')}
                className="group px-8 py-4 bg-gradient-to-r from-sunriver-orange to-sunriver-orange/90 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
                aria-label="Comenzar proyecto web"
              >
                Inicia tu Proyecto
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/metodologia')}
                className="group px-8 py-4 bg-white text-sunriver-blue font-semibold rounded-full border-2 border-sunriver-blue/20 transition-all duration-300 hover:border-sunriver-orange hover:text-sunriver-orange flex items-center gap-2"
                aria-label="Explorar soluciones"
              >
                <Play className="w-5 h-5" />
                Descubre Nuestra Metodología
              </button>
            </div>

          </div>

          {/* Right Content - Visual adaptativo */}
          <div 
            ref={emblemRef}
            className="relative flex items-center justify-center lg:justify-end h-[400px] sm:h-[500px] opacity-0"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {renderVisualContent()}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
