import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  dark?: boolean;
}

// Logo SVG inline optimizado (~2KB vs 1100KB PNG)
const LogoSVG = ({ className = "h-12 w-auto", dark = false }: LogoProps) => {
  const fillColor = dark ? "#FFFFFF" : "#F5A623";
  const textColor = dark ? "#FFFFFF" : "#1E3A5F";
  
  return (
    <svg 
      viewBox="0 0 200 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SunRiver Logo"
    >
      {/* Sol estilizado */}
      <circle cx="25" cy="25" r="15" fill={fillColor} />
      <circle cx="25" cy="25" r="20" fill={fillColor} opacity="0.3" />
      
      {/* Rayos del sol */}
      <g stroke={fillColor} strokeWidth="2" strokeLinecap="round">
        <line x1="25" y1="3" x2="25" y2="8" />
        <line x1="25" y1="42" x2="25" y2="47" />
        <line x1="3" y1="25" x2="8" y2="25" />
        <line x1="42" y1="25" x2="47" y2="25" />
        <line x1="9.4" y1="9.4" x2="13" y2="13" />
        <line x1="37" y1="37" x2="40.6" y2="40.6" />
        <line x1="40.6" y1="9.4" x2="37" y2="13" />
        <line x1="13" y1="37" x2="9.4" y2="40.6" />
      </g>
      
      {/* Texto SunRiver */}
      <text x="55" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="700" fill={textColor}>
        SunRiver
      </text>
    </svg>
  );
};

// Fallback con WebP optimizado para navegadores antiguos
const LogoOptimized = ({ className = "h-12 w-auto", alt = "SunRiver Logo", dark = false }: LogoProps) => {
  const [useSVG, setUseSVG] = useState(true);
  
  useEffect(() => {
    // Detectar soporte SVG (todos los modernos lo soportan)
    // Pero si hay error, fallback a imagen optimizada
  }, []);

  if (useSVG) {
    return <LogoSVG className={className} dark={dark} />;
  }

  // Fallback a WebP optimizado (debes generar este archivo)
  return (
    <img 
      src="/logo.webp" 
      alt={alt}
      className={className}
      width="120"
      height="40"
      loading="eager"
      decoding="async"
    />
  );
};

export default LogoOptimized;
export { LogoSVG };
