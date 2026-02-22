import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceConfig {
  type: DeviceType;
  sunSegments: number;
  planetSegments: number;
  starCount: number;
  enableGlow: boolean;
  antialias: boolean;
  enable3D: boolean;
}

const getDeviceConfig = (): DeviceConfig => {
  if (typeof window === 'undefined') {
    // Default para SSR/build
    return {
      type: 'desktop',
      sunSegments: 32,
      planetSegments: 24,
      starCount: 800,
      enableGlow: true,
      antialias: true,
      enable3D: true,
    };
  }

  const width = window.innerWidth;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowPower = hardwareConcurrency <= 4;

  // Móvil: < 768px o touch con pantalla pequeña
  if (width < 768 || (isTouch && width < 1024)) {
    return {
      type: 'mobile',
      sunSegments: 16,
      planetSegments: 12,
      starCount: 300,
      enableGlow: false,
      antialias: false,
      enable3D: false, // Usar fallback CSS
    };
  }

  // Tablet: 768px - 1024px
  if (width >= 768 && width < 1024) {
    return {
      type: 'tablet',
      sunSegments: 24,
      planetSegments: 16,
      starCount: 500,
      enableGlow: !isLowPower,
      antialias: !isLowPower,
      enable3D: true,
    };
  }

  // Desktop: > 1024px
  return {
    type: 'desktop',
    sunSegments: 32,
    planetSegments: 24,
    starCount: 800,
    enableGlow: true,
    antialias: true,
    enable3D: true,
  };
};

export const useDeviceType = (): DeviceConfig => {
  const [config, setConfig] = useState<DeviceConfig>(() => getDeviceConfig());

  useEffect(() => {
    const handleResize = () => {
      setConfig(getDeviceConfig());
    };

    // Debounce para evitar muchas actualizaciones
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Actualizar al montar
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return config;
};

export default useDeviceType;
