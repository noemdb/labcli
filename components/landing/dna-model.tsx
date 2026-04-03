"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Sparkles, Float, Line, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// --- Components ---

/**
 * Floating Glass Panel (Data interfaces)
 */
function DataPanel({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: { position: [number, number, number], scale?: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation as any} scale={scale as any}>
      {/* Translucent Plane */}
      <mesh>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial 
          color="#0ea5e9"
          transparent
          opacity={0.05}
          metalness={1}
          roughness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border Lines */}
      <Line 
        points={[[-1, -1.25, 0], [1, -1.25, 0], [1, 1.25, 0], [-1, 1.25, 0], [-1, -1.25, 0]]} 
        color="#0ea5e9" 
        lineWidth={0.5} 
        transparent 
        opacity={0.3} 
      />
      {/* Inner UI details (Dots) */}
      <mesh position={[-0.8, -1.05, 0]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.65, -1.05, 0]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/**
 * Floating Microscopic Cell
 */
function MicroCell({ position, color = "#3b82f6", scale = 1 }: { position: [number, number, number], color?: string, scale?: number }) {
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Outer Membrane */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
          roughness={0} 
          metalness={0.5} 
        />
      </mesh>
      {/* Inner Nucleus */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={3} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    </group>
  );
}

/**
 * Plexus Effect (Connecting lines and dots)
 */
function Plexus({ count = 30, scale = 10 }: { count?: number, scale?: number }) {
  const points = useMemo(() => {
    return Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * scale * 2,
      (Math.random() - 0.5) * scale * 2,
      (Math.random() - 0.5) * scale * 2
    ));
  }, [count, scale]);

  return (
    <group>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
          </mesh>
          {/* Connect to nearest 2 points if distance < limit */}
          {points.slice(i + 1, i + 3).map((p2, j) => (
            p.distanceTo(p2) < 4 && (
              <Line 
                key={j}
                points={[p, p2]}
                color="#3b82f6"
                lineWidth={0.2}
                transparent
                opacity={0.15}
              />
            )
          ))}
        </group>
      ))}
    </group>
  );
}

/**
 * Detailed DNA Helix
 */
const NUM_PAIRS = 40;
const RADIUS = 2;
const DNA_HEIGHT = 20;

const ANNOTATIONS = [
  { index: 8, title: "Análisis Genómico", side: 1 },
  { index: 18, title: "Biología Molecular", side: -1 },
  { index: 28, title: "Precisión 99.9%", side: 1 },
  { index: 35, title: "Monitorización 24/7", side: -1 },
];

function DNAHelix({ accentColor = "#3b82f6", secondaryColor = "#8b5cf6", opacity = 1, showAnnotations = false }) {
  const groupRef = useRef<THREE.Group>(null);

  const pairs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NUM_PAIRS; i++) {
      const angle = i * 0.4;
      const y = (i / NUM_PAIRS) * DNA_HEIGHT - DNA_HEIGHT / 2;
      const x1 = Math.cos(angle) * RADIUS;
      const z1 = Math.sin(angle) * RADIUS;
      const x2 = Math.cos(angle + Math.PI) * RADIUS;
      const z2 = Math.sin(angle + Math.PI) * RADIUS;
      arr.push({ x1, z1, x2, z2, y, angle });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {pairs.map((pair, i) => {
        const hasAnnotation = showAnnotations && ANNOTATIONS.find(a => a.index === i);
        return (
          <group key={i}>
            {/* Strand 1 Node */}
            <mesh position={[pair.x1, pair.y, pair.z1]}>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial 
                color={accentColor} 
                emissive={accentColor} 
                emissiveIntensity={0.6 * opacity} 
                transparent 
                opacity={0.8 * opacity} 
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>
            
            {/* Strand 2 Node */}
            <mesh position={[pair.x2, pair.y, pair.z2]}>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial 
                color={secondaryColor} 
                emissive={secondaryColor} 
                emissiveIntensity={0.6 * opacity} 
                transparent 
                opacity={0.8 * opacity} 
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>

            {/* Connection Bridge */}
            <mesh position={[0, pair.y, 0]} rotation={[0, -pair.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, RADIUS * 2, 8]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.2 * opacity} 
                transparent 
                opacity={0.2 * opacity} 
              />
            </mesh>

            {/* Annotation */}
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

// --- Main Scene ---

export function DNAScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
        <fog attach="fog" args={["#020617", 10, 40]} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#8b5cf6" />
        <spotLight position={[0, 20, 0]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
        
        {/* Environment - Extra Layers of Atmosphere */}
        <Sparkles count={150} scale={25} size={3} speed={0.1} opacity={0.3} color="#0ea5e9" />
        <Sparkles count={80} scale={20} size={5} speed={0.2} opacity={0.5} color="#8b5cf6" />
        
        {/* Floating elements from reference image */}
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
          <MicroCell position={[8, 4, -5]} color="#0ea5e9" scale={1.2} />
        </Float>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
          <MicroCell position={[-10, -3, -2]} color="#8b5cf6" scale={0.9} />
        </Float>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
          <MicroCell position={[5, -6, 2]} color="#3b82f6" scale={0.7} />
        </Float>

        {/* Glass Data Panels */}
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.5}>
          <DataPanel position={[-12, 5, -8]} rotation={[0.2, 0.4, 0.1]} scale={[1.5, 1.5, 1.5]} />
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
          <DataPanel position={[10, -8, -10]} rotation={[-0.1, -0.3, -0.2]} scale={[2, 2, 2]} />
        </Float>

        {/* Plexus effect */}
        <Plexus count={40} scale={15} />

        {/* Primary DNA Helix */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <DNAHelix accentColor="#0ea5e9" secondaryColor="#6366f1" showAnnotations={true} />
        </Float>

        {/* Secondary DNA Helix in background */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
          <group position={[-15, 0, -15]} rotation={[0, 0, Math.PI / 6]}>
             <DNAHelix accentColor="#4f46e5" secondaryColor="#312e81" opacity={0.3} />
          </group>
        </Float>
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
          <group position={[15, -5, -12]} rotation={[0, 0, -Math.PI / 4]}>
             <DNAHelix accentColor="#8b5cf6" secondaryColor="#4c1d95" opacity={0.2} />
          </group>
        </Float>
        
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
