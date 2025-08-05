import { useGLTF, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

const BUTTERFLY_COUNT = 5;
const BOUNDS: {
  x: [number, number];
  y: [number, number];
  z: [number, number];
} = {
  x: [-5, 5],
  y: [1, 2.5],
  z: [-5, 5],
};

function randomPosition() {
  return new THREE.Vector3(
    THREE.MathUtils.randFloat(...BOUNDS.x),
    THREE.MathUtils.randFloat(...BOUNDS.y),
    THREE.MathUtils.randFloat(...BOUNDS.z)
  );
}

type ButterflyInstance = {
  group: THREE.Group;
  target: THREE.Vector3;
  velocity: THREE.Vector3;
  stayTime: number;
  timeElapsed: number;
};

const ButterflySwarm = () => {
  const { scene } = useGLTF("/models/butterfly.glb");
  const [butterflies, setButterflies] = useState<ButterflyInstance[]>([]);

  const sparkleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "white",
      emissive: new THREE.Color("hotpink"),
      emissiveIntensity: 1.5,
      roughness: 0.3,
      metalness: 0.5,
    });
  }, []);

  useEffect(() => {
    const created: ButterflyInstance[] = Array.from({
      length: BUTTERFLY_COUNT,
    }).map(() => {
      const clone = scene.clone(true) as THREE.Group;
      clone.scale.setScalar(0.0005);
      clone.position.copy(randomPosition());

      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = sparkleMaterial.clone();
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      return {
        group: clone,
        target: randomPosition(),
        velocity: new THREE.Vector3(),
        stayTime: Math.random() * 2 + 1,
        timeElapsed: 0,
      };
    });

    setButterflies(created);
  }, [scene, sparkleMaterial]);

  useFrame((_, delta) => {
    butterflies.forEach((butterfly) => {
      butterfly.timeElapsed += delta;

      if (butterfly.timeElapsed > butterfly.stayTime) {
        butterfly.target = randomPosition();
        butterfly.stayTime = Math.random() * 2 + 1;
        butterfly.timeElapsed = 0;
      }

      const direction = new THREE.Vector3()
        .subVectors(butterfly.target, butterfly.group.position)
        .normalize()
        .multiplyScalar(0.015);

      butterfly.velocity.lerp(direction, 0.05);
      butterfly.group.position.add(butterfly.velocity);

      const desiredLook = new THREE.Quaternion();
      const lookDirection = butterfly.velocity.clone().normalize();

      if (lookDirection.lengthSq() > 0.0001) {
        const dummy = new THREE.Object3D();
        dummy.position.copy(butterfly.group.position);
        dummy.lookAt(butterfly.group.position.clone().add(lookDirection));
        desiredLook.copy(dummy.quaternion);

        butterfly.group.quaternion.slerp(desiredLook, 0.1); // Smoothly rotate
      }
    });
  });

  return (
    <>
      {butterflies.map((butterfly, index) => (
        <Trail
          key={index}
          width={0.08}
          length={4}
          decay={1.6}
          color={"hotpink"}
          attenuation={(t) => t * t}
        >
          <primitive object={butterfly.group} />
        </Trail>
      ))}
    </>
  );
};

export default ButterflySwarm;
