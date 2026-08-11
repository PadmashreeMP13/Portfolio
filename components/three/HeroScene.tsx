"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Reactive particle field — responds to mouse pointer position and time
// to produce an audio-visualizer-like shape. Adjust density for low-power
// devices via particle count.

function Particles({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ff00e5"),
      new THREE.Color("#00fff2"),
      new THREE.Color("#c6ff00"),
      new THREE.Color("#8b00ff"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[i % palette.length];
      arr[i * 3 + 0] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = ref.current;
    if (!m) return;
    const targetX = (mouse.x * viewport.width) / 4;
    const targetY = (mouse.y * viewport.height) / 4;
    m.rotation.y += 0.0009;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, targetY * 0.25, 0.05);
    m.position.x = THREE.MathUtils.lerp(m.position.x, targetX, 0.05);

    // Pulse the geometry — audio-visualizer-like amplitude
    const pos = m.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const amp = 0.6 + Math.sin(t * 1.2 + i * 0.01) * 0.25;
      pos.array[ix + 2] = THREE.MathUtils.lerp(
        pos.array[ix + 2] as number,
        (Math.sin(i + t) * amp),
        0.04
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      dpr={[1, 1.6]}
    >
      <fog attach="fog" args={["#0a0a0f", 4, 18]} />
      <ambientLight intensity={0.6} />
      <Particles count={1800} />
    </Canvas>
  );
}
