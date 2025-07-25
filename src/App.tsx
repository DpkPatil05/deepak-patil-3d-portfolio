import { Canvas } from "@react-three/fiber";
import Experience from "./pages/experience/Experience";
import "./App.css";

const App = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      shadows
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#111"]} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Experience />
    </Canvas>
  );
};

export default App;
