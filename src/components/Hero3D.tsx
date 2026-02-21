import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
    return (
        <mesh>
            <sphereGeometry args={[2.2, 64, 64]} />
            <MeshDistortMaterial
                color="#F5A623"
                emissive="#F5A623"
                emissiveIntensity={0.8}
                roughness={0.2}
                distort={0.4}
                speed={2}
            />
            <pointLight intensity={2} distance={10} decay={2} color="#F5A623" />
        </mesh>
    );
};

const Planet = ({ radius, speed, color, size, offset }: { radius: number; speed: number; color: string; size: number; offset: number }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed + offset;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
        }
    });

    return (
        <Trail width={size * 0.8} length={8} color={new THREE.Color(color)} attenuation={(t) => t * t}>
            <mesh ref={ref}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
                <pointLight intensity={0.5} distance={3} decay={2} color={color} />
            </mesh>
        </Trail>
    );
};

const Scene = () => {
    const planets = useMemo(() => [
        { radius: 3.5, speed: 0.8, color: '#4A90D9', size: 0.15 },
        { radius: 4.8, speed: 0.5, color: '#1E3A5F', size: 0.2 },
        { radius: 6.0, speed: 0.3, color: '#F5A623', size: 0.12 },
        { radius: 7.5, speed: 0.2, color: '#FFFFFF', size: 0.1 },
    ], []);

    return (
        <>
            <ambientLight intensity={0.2} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sun />
            </Float>
            {planets.map((p, i) => (
                <Planet key={i} {...p} offset={i * 2} />
            ))}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const Hero3D = () => {
    return (
        <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
            <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
                <Scene />
                <fog attach="fog" args={['#0f172a', 10, 25]} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
