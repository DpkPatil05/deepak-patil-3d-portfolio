import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { Float } from "@react-three/drei";

const FloatingIsland = () => {
  const islandRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (islandRef.current) {
      islandRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.1;
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5}>
      <group ref={islandRef} position={[0, -1, 0]}>
        {/* Island Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[3, 4, 1, 8]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>

        {/* Grass Top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <circleGeometry args={[2.8, 32]} />
          <meshStandardMaterial color="#81c784" />
        </mesh>

        {/* Stylized Trees */}
        {[-2, 0, 2].map((x, i) => (
          <group key={i} position={[x, 1, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0, 0.3, 1, 6]} />
              <meshStandardMaterial color="#2e7d32" />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6]} />
              <meshStandardMaterial color="#4e342e" />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

export default FloatingIsland;
