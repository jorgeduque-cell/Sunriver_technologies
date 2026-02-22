import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroMobileFallback = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const planet1Ref = useRef<HTMLDivElement>(null);
  const planet2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del sol (pulso sutil)
      gsap.to(sunRef.current, {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Órbitas rotando lentamente
      gsap.to(orbit1Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(orbit2Ref.current, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // Planetas flotando
      gsap.to(planet1Ref.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(planet2Ref.current, {
        y: 10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-sunriver-orange/10 via-transparent to-transparent" />
      
      {/* Contenedor central */}
      <div className="relative w-64 h-64">
        
        {/* Corona/glow exterior */}
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-sunriver-orange/20 via-sunriver-orange/10 to-transparent blur-2xl animate-pulse-slow" />
        
        {/* Segunda corona */}
        <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-sunriver-orange/30 to-sunriver-blue/20 blur-xl" />
        
        {/* Sol principal */}
        <div 
          ref={sunRef}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] via-[#F5A623] to-[#E8913A] shadow-[0_0_40px_rgba(245,166,35,0.5),0_0_80px_rgba(245,166,35,0.3)] flex items-center justify-center z-10"
        >
          {/* Brillo interior */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#FFED4A] to-transparent opacity-60" />
          
          {/* Texto SunRiver */}
          <span className="relative z-10 text-white text-2xl font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            SunRiver
          </span>
        </div>

        {/* Órbita 1 - Desarrollo */}
        <div 
          ref={orbit1Ref}
          className="absolute inset-0 -m-12 border-2 border-dashed border-sunriver-blue/30 rounded-full"
        >
          {/* Planeta Desarrollo */}
          <div 
            ref={planet1Ref}
            className="absolute -top-3 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A90D9] to-[#2E5A8C] shadow-[0_0_15px_rgba(74,144,217,0.5)] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold whitespace-nowrap absolute -top-6 bg-sunriver-blue/80 px-2 py-0.5 rounded-full">
                Dev
              </span>
            </div>
          </div>
        </div>

        {/* Órbita 2 - IA */}
        <div 
          ref={orbit2Ref}
          className="absolute inset-0 -m-20 border border-sunriver-orange/20 rounded-full"
        >
          {/* Planeta IA */}
          <div 
            ref={planet2Ref}
            className="absolute top-1/2 -right-3 -translate-y-1/2"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#6C3483] shadow-[0_0_12px_rgba(155,89,182,0.5)] flex items-center justify-center">
              <span className="text-[7px] text-white font-bold whitespace-nowrap absolute -right-8 bg-purple-600/80 px-1.5 py-0.5 rounded-full">
                IA
              </span>
            </div>
          </div>
        </div>

        {/* Partículas estáticas decorativas */}
        <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-sunriver-orange/60" />
        <div className="absolute bottom-4 left-0 w-1.5 h-1.5 rounded-full bg-sunriver-blue/40" />
        <div className="absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-sunriver-orange/50" />
        <div className="absolute top-10 -left-4 w-0.5 h-0.5 rounded-full bg-sunriver-blue/60" />
      </div>

      {/* Etiquetas flotantes adicionales */}
      <div className="absolute bottom-20 left-8 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-sunriver-orange/20 animate-float">
        <span className="text-xs font-semibold text-sunriver-blue">Sistema</span>
      </div>

      <div className="absolute top-24 right-6 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-sunriver-orange/20 animate-float-delayed">
        <span className="text-xs font-semibold text-sunriver-orange">Ahorro</span>
      </div>
    </div>
  );
};

export default HeroMobileFallback;
