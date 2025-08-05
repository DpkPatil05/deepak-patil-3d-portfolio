// MainScene.tsx
import { Environment, OrbitControls } from "@react-three/drei";
import FloatingIsland from "../pages/experience/FloatingIsland";
import Lights from "../components/Lights";
import SakuraParticles from "./SakuraParticles";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ButterflySwarm from "../components/models/ButterflySwarm";
import { Suspense } from "react";
import BirdFlock from "../components/models/BirdFlock";

const MainScene = () => {
  return (
    <Suspense fallback={null}>
      <Environment files="/textures/sky.hdr" background />

      <Lights />

      <FloatingIsland />

      <SakuraParticles count={30} />

      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <ButterflySwarm />
      <BirdFlock />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2} // limit to upper hemisphere
        minDistance={3}
        maxDistance={20}
        enableDamping
      />
    </Suspense>
  );
};

export default MainScene;
