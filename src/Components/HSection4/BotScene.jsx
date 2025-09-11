import {
  Environment,
  Gltf,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Bot from "./Bot";

const BotScene = ({ position, actionRef }) => {
  return (
    <>
      <PerspectiveCamera near={0.1} far={1000} position={[0, 0, 5]} fov={75} />
      <Environment preset="city" />
      <ambientLight intensity={1} />
      {/* Left top light */}
      {/* <directionalLight position={[-1, 1, 0]} /> */}
      {/* Right top light */}
      {/* <directionalLight position={[1, 1, 0]} /> */}
      {/* <gridHelper args={[10, 10]} /> */}
      {/* <axesHelper args={[5]} /> */}
      
      <Gltf position={position} src="/bot.glb" />
      {/* <OrbitControls /> */}
      {/* <Bot
        position={position}
        botActions={action => (actionRef.current = action)}
      /> */}
    </>
  );
};

export default BotScene;
