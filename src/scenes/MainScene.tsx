// MainScene.tsx
import { Environment, OrbitControls } from "@react-three/drei";
import FloatingIsland from "../pages/experience/FloatingIsland";
import Lights from "../components/Lights";
import SakuraParticles from "./SakuraParticles";

const MainScene = () => {
  return (
    <>
      <Environment files="/textures/sky.hdr" background />

      <Lights />

      <FloatingIsland />

      <SakuraParticles count={30} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2} // limit to upper hemisphere
        minDistance={3}
        maxDistance={20}
        enableDamping
      />
    </>
  );
};

export default MainScene;
