"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles, Float, Line, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// --- Global Console Silencer for THREE.Clock deprecation ---
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

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
      // Use clock.elapsedTime directly if available to avoid getElapsedTime() warning
      const t = clock.elapsedTime || performance.now() / 1000;
      innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
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
 * --- Advanced DNA Molecular System ---
 * Detailed Biotech representation: 
 * [Phosphate] -- [Sugar] -- [Base] === [Base] -- [Sugar] -- [Phosphate]
 */

const MOLECULAR_COLORS = {
  phosphate: "#f59e0b", // Amber
  sugar: "#22c55e",     // Green
  A: "#ef4444",         // Red
  T: "#3b82f6",         // Blue
  C: "#eab308",         // Yellow
  G: "#8b5cf6",         // Purple
  bond: "#ffffff"
} as const;

type BaseType = "A" | "T" | "C" | "G";

const NUCLEOTIDE_DATA: { type: BaseType, pair: BaseType, bonds: 2 | 3 }[] = [
  { type: "A", pair: "T", bonds: 2 },
  { type: "T", pair: "A", bonds: 2 },
  { type: "C", pair: "G", bonds: 3 },
  { type: "G", pair: "C", bonds: 3 },
];

function HydrogenBonds({ count, length, rotation }: { count: 2 | 3, length: number, rotation: number }) {
  const bondSpacing = 0.2;
  const startY = -((count - 1) * bondSpacing) / 2;

  return (
    <group rotation={[0, -rotation, Math.PI / 2]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, startY + i * bondSpacing, 0]}>
          <cylinderGeometry args={[0.02, 0.02, length, 8]} />
          <meshStandardMaterial 
            color={MOLECULAR_COLORS.bond} 
            emissive={MOLECULAR_COLORS.bond}
            emissiveIntensity={0.5}
            transparent 
            opacity={0.3} 
          />
        </mesh>
      ))}
    </group>
  );
}

function BaseNode({ type, position, rotation }: { type: BaseType, position: [number, number, number], rotation: number }) {
  const color = MOLECULAR_COLORS[type];
  return (
    <mesh position={position} rotation={[0, -rotation, Math.PI / 2]}>
      <capsuleGeometry args={[0.08, 0.6, 4, 12]} />
      <meshPhysicalMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.2}
        metalness={0.5}
        transmission={0.2}
        thickness={0.5}
      />
    </mesh>
  );
}

function MolecularNode({ color, position, size }: { color: string, position: [number, number, number], size: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.15} 
        metalness={0.6}
        transmission={0.3}
        thickness={1}
      />
    </mesh>
  );
}

const NUM_PAIRS = 40;
const RADIUS_PHOSPHATE = 2.8;
const RADIUS_SUGAR = 2.2;
const RADIUS_BASE = 1.3;
const DNA_HEIGHT = 20;

const ANNOTATIONS = [
  { index: 8, title: "Análisis Genómico", side: 1 },
  { index: 18, title: "Biología Molecular", side: -1 },
  { index: 28, title: "Precisión 99.9%", side: 1 },
  { index: 35, title: "Monitorización 24/7", side: -1 },
];

function DNAHelix({ opacity = 1, showAnnotations = false }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Setup deterministic sequence
  const helixData = useMemo(() => {
    return Array.from({ length: NUM_PAIRS }).map((_, i) => {
      const angle = i * 0.4;
      const y = (i / NUM_PAIRS) * DNA_HEIGHT - DNA_HEIGHT / 2;
      const basePair = NUCLEOTIDE_DATA[i % 4];
      
      // Calculate positions for both strands
      const calcPos = (a: number, r: number) => [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number];
      
      return {
        y,
        angle,
        basePair,
        strand1: {
          phosphate: calcPos(angle, RADIUS_PHOSPHATE),
          sugar: calcPos(angle, RADIUS_SUGAR),
          base: calcPos(angle, RADIUS_BASE),
        },
        strand2: {
          phosphate: calcPos(angle + Math.PI, RADIUS_PHOSPHATE),
          sugar: calcPos(angle + Math.PI, RADIUS_SUGAR),
          base: calcPos(angle + Math.PI, RADIUS_BASE),
        }
      };
    }, []);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime || performance.now() / 1000;
      // Primary rotation
      groupRef.current.rotation.y = t * 0.08;
      // Organic micro-osci
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {helixData.map((data, i) => (
        <group key={i}>
          {/* Strand 1: P -- S -- B */}
          <MolecularNode color={MOLECULAR_COLORS.phosphate} position={data.strand1.phosphate} size={0.16} />
          <MolecularNode color={MOLECULAR_COLORS.sugar} position={data.strand1.sugar} size={0.24} />
          <BaseNode type={data.basePair.type} position={data.strand1.base} rotation={data.angle} />

          {/* Strand 2: P -- S -- B */}
          <MolecularNode color={MOLECULAR_COLORS.phosphate} position={data.strand2.phosphate} size={0.16} />
          <MolecularNode color={MOLECULAR_COLORS.sugar} position={data.strand2.sugar} size={0.24} />
          <BaseNode type={data.basePair.pair} position={data.strand2.base} rotation={data.angle + Math.PI} />

          {/* Hydrogen Bonds */}
          <HydrogenBonds count={data.basePair.bonds} length={RADIUS_BASE * 1.6} rotation={data.angle} />

          {/* Annotations */}
          {showAnnotations && ANNOTATIONS.find(a => a.index === i) && (() => {
            const annotation = ANNOTATIONS.find(a => a.index === i)!;
            const pos = annotation.side === 1 ? data.strand1.sugar : data.strand2.sugar;
            return (
              <Html 
                position={[pos[0] * 1.6, pos[1], pos[2] * 1.6]} 
                center 
                distanceFactor={15} 
                className="pointer-events-none"
              >
                <div className="flex items-center gap-3 fade-in-out">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,1)]"></span>
                  </div>
                  <div className="px-3 py-1.5 bg-background/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white/90 shadow-xl whitespace-nowrap uppercase">
                    {annotation.title}
                  </div>
                </div>
              </Html>
            );
          })()}
        </group>
      ))}
    </group>
  );
}

// --- Camera Controller ---

function SceneCameraController() {
  const rotationOffset = useRef(0);
  
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime || performance.now() / 1000;
    
    // Smooth random-like rotation (using nested sines)
    camera.rotation.y = Math.sin(t * 0.1) * 0.2;
    camera.rotation.x = Math.cos(t * 0.07) * 0.1;
    
    // Pulse Zoom In/Out
    // Oscillates between 15 and 22 units on Z
    camera.position.z = 18.5 + Math.sin(t * 0.3) * 3.5;
  });

  return null;
}

// --- Main Scene ---

export function DNAScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
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
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3} position={[6, 0, 0]}>
          <DNAHelix showAnnotations={true} />
        </Float>

        {/* Secondary DNA Helix in background */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
          <group position={[-15, 0, -15]} rotation={[0, 0, Math.PI / 6]}>
             <DNAHelix />
          </group>
        </Float>
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
          <group position={[15, -5, -12]} rotation={[0, 0, -Math.PI / 4]}>
             <DNAHelix />
          </group>
        </Float>
        
        <SceneCameraController />
      </Canvas>
    </div>
  );
}
