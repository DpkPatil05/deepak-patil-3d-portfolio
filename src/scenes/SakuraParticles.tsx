import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const SakuraParticles = ({ count = 50 }) => {
  const texture = useTexture("/textures/sakura.png");
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = [];
    const speeds = [];

    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 6,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 6
      );
      speeds.push(0.01 + Math.random() * 0.02);
    }

    return {
      positions: new Float32Array(positions),
      speeds,
    };
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] -= particles.speeds[i];
      if (pos.array[i * 3 + 1] < -2) {
        pos.array[i * 3 + 1] = 6; // reset to top
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.3}
        transparent
        alphaTest={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default SakuraParticles;
