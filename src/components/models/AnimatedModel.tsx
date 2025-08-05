import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface AnimatedModelProps {
  path: string;
  scale?: number;
  position?: [number, number, number];
  float?: boolean;
  rotate?: boolean;
  flutter?: boolean;
}

const AnimatedModel = ({
  path,
  scale = 1,
  position = [0, 0, 0],
  float = false,
  rotate = true,
  flutter = false,
}: AnimatedModelProps) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (modelRef.current) {
      // Rotate gently
      if (rotate) {
        modelRef.current.rotation.y += 0.003;
      }

      // Float or flutter vertically
      if (float || flutter) {
        modelRef.current.position.y =
          position[1] +
          Math.sin(t * (flutter ? 5 : 1)) * (flutter ? 0.05 : 0.2);
      }
    }
  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      position={position}
    />
  );
};

export default AnimatedModel;
