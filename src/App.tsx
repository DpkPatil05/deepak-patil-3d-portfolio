import { Canvas } from "@react-three/fiber";
import MainScene from "./scenes/MainScene";

const App = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }}
      className="h-screen w-screen"
    >
      <MainScene />
    </Canvas>
  );
};

export default App;
