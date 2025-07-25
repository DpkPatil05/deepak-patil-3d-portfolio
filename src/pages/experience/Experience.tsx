import { Float, Text3D, Center } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Experience = () => {
  const { viewport } = useThree(); // Gives you screen dimensions

  return (
    <Float floatIntensity={1.5} speed={2}>
      <Center> {/* This centers the text geometry automatically */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={viewport.width * 0.08} // Scales based on screen width
          height={0.1}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.02}
        >
          Hello, I'm Deepak
          <meshStandardMaterial color="cyan" />
        </Text3D>
      </Center>
    </Float>
  );
};

export default Experience;
