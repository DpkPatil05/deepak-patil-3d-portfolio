import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

const BIRD_COUNT = 3;
const BOUNDS: {
  x: [number, number];
  y: [number, number];
  z: [number, number];
} = {
  x: [-8, 8],
  y: [0.5, 2],
  z: [-8, 8],
};

function randomPosition() {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(...BOUNDS.x),
    THREE.MathUtils.randFloat(...BOUNDS.y),
    THREE.MathUtils.randFloat(...BOUNDS.z)
  );
}

type BirdInstance = {
  group: THREE.Group;
  target: THREE.Vector3;
  velocity: THREE.Vector3;
  stayTime: number;
  timeElapsed: number;
};

const BirdFlock = () => {
  const { scene } = useGLTF("/models/bird.glb");
  const [birds, setBirds] = useState<BirdInstance[]>([]);

  useEffect(() => {
    const created: BirdInstance[] = Array.from({ length: BIRD_COUNT }).map(
      () => {
        const clone = scene.clone(true) as THREE.Group;
        clone.scale.setScalar(0.018);
        clone.position.copy(randomPosition());

        clone.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        return {
          group: clone,
          target: randomPosition(),
          velocity: new THREE.Vector3(),
          stayTime: Math.random() * 3 + 2,
          timeElapsed: 0,
        };
      }
    );

    setBirds(created);
  }, [scene]);

  useFrame((_, delta) => {
    birds.forEach((bird) => {
      bird.timeElapsed += delta;

      if (bird.timeElapsed > bird.stayTime) {
        bird.target = randomPosition();
        bird.stayTime = Math.random() * 3 + 2;
        bird.timeElapsed = 0;
      }

      const direction = new THREE.Vector3()
        .subVectors(bird.target, bird.group.position)
        .normalize()
        .multiplyScalar(0.02);

      bird.velocity.lerp(direction, 0.03);
      bird.group.position.add(bird.velocity);

      // Prevent jittery or spinning
      if (bird.velocity.lengthSq() > 0.0001) {
        bird.group.lookAt(bird.group.position.clone().add(bird.velocity));
      }
    });
  });

  return (
    <>
      {birds.map((bird, i) => (
        <primitive key={i} object={bird.group} />
      ))}
    </>
  );
};

export default BirdFlock;
