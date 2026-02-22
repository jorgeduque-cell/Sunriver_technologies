import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DConfig {
  sunSegments: number;
  planetSegments: number;
  starCount: number;
  enableGlow: boolean;
  antialias: boolean;
}

interface Hero3DProps {
  config?: Hero3DConfig;
}

// Sol con efecto de corona/glow
const Sun = ({ segments = 32, enableGlow = true }: { segments?: number; enableGlow?: boolean }) => {
  return (
    <group>
      {/* Corona exterior - solo si enableGlow */}
      {enableGlow && (
        <mesh>
          <sphereGeometry args={[2.3, segments, segments]} />
          <meshBasicMaterial
            color="#F5A623"
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
      {/* Corona media */}
      <mesh>
        <sphereGeometry args={[2.1, segments, segments]} />
        <meshBasicMaterial
          color="#F5A623"
          transparent
          opacity={enableGlow ? 0.3 : 0.2}
        />
      </mesh>
      {/* Sol principal */}
      <mesh>
        <sphereGeometry args={[1.8, segments, segments]} />
        <meshStandardMaterial
          color="#F5A623"
          emissive="#F5A623"
          emissiveIntensity={enableGlow ? 1.5 : 1.0}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      {/* Núcleo brillante */}
      <mesh>
        <sphereGeometry args={[1.5, Math.max(8, segments / 2), Math.max(8, segments / 2)]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={enableGlow ? 2 : 1.2}
        />
      </mesh>
      {/* Texto SunRiver */}
      <Html
        center
        position={[0, 0, 2]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span 
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textShadow: '0 0 20px #F5A623, 2px 2px 4px rgba(0,0,0,0.8)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            whiteSpace: 'nowrap',
            letterSpacing: '2px',
          }}
        >
          SunRiver
        </span>
      </Html>
      <pointLight intensity={enableGlow ? 4 : 2.5} distance={30} decay={1.5} color="#F5A623" />
    </group>
  );
};

// Línea de órbita visible
const OrbitPath = ({ radius, color = "#F5A623", opacity = 0.2 }: { 
  radius: number; 
  color?: string; 
  opacity?: number;
}) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
};

// Planeta que orbita
const Planet = ({ 
  radius, 
  speed, 
  word, 
  color, 
  offset,
  size = 0.5,
  orbitColor = "#F5A623",
  segments = 16
}: { 
  radius: number; 
  speed: number; 
  word: string; 
  color: string; 
  offset: number;
  size?: number;
  orbitColor?: string;
  segments?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed + offset;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <>
      {/* Línea de órbita */}
      <OrbitPath radius={radius} color={orbitColor} opacity={0.2} />
      
      {/* Grupo del planeta que se mueve */}
      <group ref={groupRef}>
        {/* Esfera del planeta */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[size, segments, segments]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.6}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Atmósfera/glow */}
        <mesh>
          <sphereGeometry args={[size * 1.15, Math.max(8, segments / 2), Math.max(8, segments / 2)]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Texto dentro del planeta */}
        <Html
          center
          position={[0, 0, size * 0.8]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span 
            style={{
              fontSize: `${Math.max(10, size * 16)}px`,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.9)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
              letterSpacing: '0.5px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '4px 8px',
              borderRadius: '12px',
              backdropFilter: 'blur(2px)',
            }}
          >
            {word}
          </span>
        </Html>
      </group>
    </>
  );
};

interface SceneProps {
  config: Hero3DConfig;
}

const Scene = ({ config }: SceneProps) => {
  const planets = useMemo(() => [
    { radius: 4, speed: 0.4, color: '#4A90D9', word: 'Desarrollo', size: 0.6, orbitColor: '#4A90D9' },
    { radius: 5.5, speed: 0.25, color: '#9B59B6', word: 'IA', size: 0.55, orbitColor: '#9B59B6' },
    { radius: 7, speed: 0.18, color: '#1E3A5F', word: 'Sistema', size: 0.7, orbitColor: '#1E3A5F' },
    { radius: 8.8, speed: 0.12, color: '#E67E22', word: 'Ahorro', size: 0.5, orbitColor: '#E67E22' },
  ], []);

  return (
    <>
      {/* Iluminación ambiental */}
      <ambientLight intensity={config.enableGlow ? 0.5 : 0.4} />
      {/* Luz del sol */}
      <pointLight position={[0, 0, 0]} intensity={config.enableGlow ? 3 : 2} distance={50} decay={1} color="#F5A623" />
      {/* Luz de relleno */}
      <directionalLight position={[10, 10, 5]} intensity={config.enableGlow ? 0.5 : 0.4} color="#ffffff" />
      
      {/* Sol con animación flotante */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sun segments={config.sunSegments} enableGlow={config.enableGlow} />
      </Float>
      
      {/* Planetas en órbitas */}
      {planets.map((p, i) => (
        <Planet 
          key={i} 
          {...p} 
          offset={i * 1.5} 
          segments={config.planetSegments}
        />
      ))}
      
      {/* Estrellas de fondo */}
      <Stars 
        radius={100} 
        depth={50} 
        count={config.starCount} 
        factor={config.enableGlow ? 5 : 6} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
    </>
  );
};

// Configuración por defecto (desktop)
const defaultConfig: Hero3DConfig = {
  sunSegments: 32,
  planetSegments: 24,
  starCount: 800,
  enableGlow: true,
  antialias: true,
};

const Hero3D = ({ config = defaultConfig }: Hero3DProps) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing" style={{ minHeight: '400px' }}>
      <Canvas 
        camera={{ position: [0, 8, 15], fov: 50 }}
        gl={{ 
          antialias: config.antialias, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={config.enableGlow ? [1, 2] : [1, 1.5]} // Limitar pixel ratio en dispositivos de baja potencia
      >
        <Scene config={config} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          minDistance={10}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.5}
        />
        <fog attach="fog" args={['#0f172a', 15, 35]} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
export type { Hero3DConfig };
