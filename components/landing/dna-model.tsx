"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

// Constants for the DNA structure
const NUM_PAIRS = 40;
const RADIUS = 2;
const HEIGHT = 20;

const ANNOTATIONS = [
  { index: 8, title: "Análisis Genómico", side: 1 },
  { index: 18, title: "Biología Molecular", side: -1 },
  { index: 28, title: "Precisión 99.9%", side: 1 },
  { index: 35, title: "Monitorización 24/7", side: -1 },
];

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate the coordinates for the DNA structure
  const pairs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_PAIRS; i++) {
      const angle = i * 0.4;
      const y = (i / NUM_PAIRS) * HEIGHT - HEIGHT / 2;
      
      const x1 = Math.cos(angle) * RADIUS;
      const z1 = Math.sin(angle) * RADIUS;
      
      const x2 = Math.cos(angle + Math.PI) * RADIUS;
      const z2 = Math.sin(angle + Math.PI) * RADIUS;
      
      arr.push({ x1, z1, x2, z2, y, angle });
    }
    return arr;
  }, []);

  // Rotate the entire helix
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {pairs.map((pair, i) => {
        const hasAnnotation = ANNOTATIONS.find(a => a.index === i);
        
        return (
          <group key={i}>
            {/* Strand 1 */}
            <mesh position={[pair.x1, pair.y, pair.z1]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial 
                color="#3b82f6" 
                emissive="#1e3a8a" 
                emissiveIntensity={0.8} 
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            
            {/* Strand 2 */}
            <mesh position={[pair.x2, pair.y, pair.z2]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial 
                color="#8b5cf6" 
                emissive="#4c1d95" 
                emissiveIntensity={0.8} 
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>

            {/* Connecting Bridge */}
            <mesh position={[0, pair.y, 0]} rotation={[0, -pair.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.06, 0.06, RADIUS * 2, 8]} />
              <meshStandardMaterial 
                color="#e2e8f0" 
                emissive="#94a3b8" 
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
            </mesh>

            {/* Floating Annotation (attached to matching side) */}
            {hasAnnotation && (
              <Html 
                position={hasAnnotation.side === 1 ? [pair.x1 * 1.5, pair.y, pair.z1 * 1.5] : [pair.x2 * 1.5, pair.y, pair.z2 * 1.5]}
                center
                distanceFactor={15}
                className="pointer-events-none"
              >
                <div className="flex items-center gap-3 fade-in-out">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]"></span>
                  </div>
                  <div className="px-3 py-1.5 bg-background/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-white/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] whitespace-nowrap">
                    {hasAnnotation.title}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function DNAScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }} dpr={[1, 2]}>
        {/* Seamless blend with background */}
        <fog attach="fog" args={["#000000", 10, 30]} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#8b5cf6" />
        
        {/* Background Atmosphere (Microscopic particles) */}
        <Sparkles count={100} scale={20} size={2} speed={0.2} opacity={0.3} color="#8b5cf6" />
        <Sparkles count={50} scale={15} size={4} speed={0.3} opacity={0.4} color="#3b82f6" />

        {/* Interactive structure */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <DNAHelix />
        </Float>
        
        {/* Subtle controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false} 
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
