"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

// =============================
// CONFIG
// =============================

const NUM_PAIRS = 60; // Increased for better visual presence
const DNA_HEIGHT = 20;

const COLORS = {
  A: "#ef4444", // Red
  T: "#3b82f6", // Blue
  C: "#eab308", // Yellow
  G: "#8b5cf6", // Purple
} as const;

type BaseType = "A" | "T" | "C" | "G";

const BASE_SEQUENCE: { type: BaseType; pair: BaseType }[] = [
  { type: "A", pair: "T" },
  { type: "T", pair: "A" },
  { type: "C", pair: "G" },
  { type: "G", pair: "C" },
];

// =============================
// DNA HELIX
// =============================

function DNAHelix({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Group>(null);
  const bases1Ref = useRef<THREE.InstancedMesh>(null);
  const bases2Ref = useRef<THREE.InstancedMesh>(null);
  const linksRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const data = useMemo(() => {
    return Array.from({ length: NUM_PAIRS }).map((_, i) => {
      const angle = i * 0.4;
      const y = (i / NUM_PAIRS) * DNA_HEIGHT - DNA_HEIGHT / 2;
      return { angle, y, base: BASE_SEQUENCE[i % 4] };
    });
  }, []);

  const { backboneCurve1, backboneCurve2 } = useMemo(() => {
    const points1 = [];
    const points2 = [];
    for(let i = 0; i <= NUM_PAIRS; i++) {
      const angle = i * 0.4;
      const angle2 = i * 0.4 + Math.PI;
      const y = (i / NUM_PAIRS) * DNA_HEIGHT - DNA_HEIGHT / 2;
      points1.push(new THREE.Vector3(Math.cos(angle) * 2.8, y, Math.sin(angle) * 2.8));
      points2.push(new THREE.Vector3(Math.cos(angle2) * 2.8, y, Math.sin(angle2) * 2.8));
    }
    return {
      backboneCurve1: new THREE.CatmullRomCurve3(points1),
      backboneCurve2: new THREE.CatmullRomCurve3(points2)
    };
  }, []);

  useEffect(() => {
    if (!bases1Ref.current || !bases2Ref.current || !linksRef.current) return;

    data.forEach((d, i) => {
        const r = 2.5;
        const p1 = new THREE.Vector3(Math.cos(d.angle) * r, d.y, Math.sin(d.angle) * r);
        const p2 = new THREE.Vector3(Math.cos(d.angle + Math.PI) * r, d.y, Math.sin(d.angle + Math.PI) * r);
        
        // Base 1
        dummy.position.copy(p1);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        bases1Ref.current!.setMatrixAt(i, dummy.matrix);
        bases1Ref.current!.setColorAt(i, color.set(COLORS[d.base.type]));

        // Base 2
        dummy.position.copy(p2);
        dummy.updateMatrix();
        bases2Ref.current!.setMatrixAt(i, dummy.matrix);
        bases2Ref.current!.setColorAt(i, color.set(COLORS[d.base.pair]));

        // Link
        const mid = p1.clone().lerp(p2, 0.5);
        dummy.position.copy(mid);
        dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p2.clone().sub(p1).normalize());
        dummy.scale.set(1, p1.distanceTo(p2), 1);
        dummy.updateMatrix();
        linksRef.current!.setMatrixAt(i, dummy.matrix);
    });

    bases1Ref.current.instanceMatrix.needsUpdate = true;
    (bases1Ref.current as any).instanceColor.needsUpdate = true;
    bases2Ref.current.instanceMatrix.needsUpdate = true;
    (bases2Ref.current as any).instanceColor.needsUpdate = true;
    linksRef.current.instanceMatrix.needsUpdate = true;
  }, [data, dummy, color]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    
    // Scroll driven rotation + smooth continuous motion
    ref.current.rotation.y = t * 0.15 + scroll * 1.5;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    ref.current.position.y = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <group ref={ref}>
      {/* Bases side 1 */}
      <instancedMesh ref={bases1Ref} args={[undefined, undefined, NUM_PAIRS]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhysicalMaterial 
            roughness={0.2}
            transmission={0.6}
            thickness={0.5}
            clearcoat={1}
            toneMapped={false}
        />
      </instancedMesh>

      {/* Bases side 2 */}
      <instancedMesh ref={bases2Ref} args={[undefined, undefined, NUM_PAIRS]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhysicalMaterial 
            roughness={0.2}
            transmission={0.6}
            thickness={0.5}
            clearcoat={1}
            toneMapped={false}
        />
      </instancedMesh>

      {/* Links connecting bases */}
      <instancedMesh ref={linksRef} args={[undefined, undefined, NUM_PAIRS]}>
        <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
        <meshPhysicalMaterial
            color="#94a3b8"
            roughness={0.3}
            metalness={0.8}
            transparent
            opacity={0.4}
            clearcoat={1}
        />
      </instancedMesh>

      {/* Sugar-phosphate backbones */}
      <mesh>
        <tubeGeometry args={[backboneCurve1, NUM_PAIRS * 2, 0.08, 8, false]} />
        <meshPhysicalMaterial 
            color="#38bdf8"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.5}
            clearcoat={1}
            transmission={0.8}
        />
      </mesh>
      
      <mesh>
        <tubeGeometry args={[backboneCurve2, NUM_PAIRS * 2, 0.08, 8, false]} />
        <meshPhysicalMaterial 
            color="#38bdf8"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.5}
            clearcoat={1}
            transmission={0.8}
        />
      </mesh>
    </group>
  );
}

// =============================
// BACKGROUND GRADIENT (shader-like)
// =============================

function GradientBackground() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = clock.elapsedTime * 0.02;
  });

  return (
    <mesh ref={mesh} scale={50}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#020617" />
    </mesh>
  );
}

// =============================
// CAMERA
// =============================

function CameraController({ scroll }: { scroll: number }) {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;

    camera.position.z = 18 - scroll * 4 + Math.sin(t * 0.2) * 1.2;
    camera.position.y = Math.sin(t * 0.15) * 0.8;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// =============================
// MAIN
// =============================

export function DNAModel() {
  const [scroll, setScroll] = useState(0);
  const [x, setX] = useState(4);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY / window.innerHeight;
      setScroll(s);
    };

    const onResize = () => {
      const w = window.innerWidth;
      if (w < 768) setX(0);
      else if (w < 1280) setX(2);
      else setX(4);
    };

    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />

        <GradientBackground />

        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#38bdf8" />

        {/* Enhanced ambient particles */}
        <Sparkles count={60} scale={25} size={1.5} speed={0.2} opacity={0.3} color="#60a5fa" />
        <Sparkles count={30} scale={15} size={2.5} speed={0.1} opacity={0.15} color="#f87171" />

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6} position={[x, 0, 0]}>
          <DNAHelix scroll={scroll} />
        </Float>

        <CameraController scroll={scroll} />

        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.2} mipmapBlur />
          <DepthOfField focusDistance={0.02} focalLength={0.03} bokehScale={3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

