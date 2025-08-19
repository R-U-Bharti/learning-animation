import { Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import TextScene from "./TextScene";

const ThreeDText = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-b from-slate-900 via-slate-700 to-slate-900">
        <Canvas shadows camera={{ position: [4, 3, 7], fov: 55 }}>
          <TextScene />
        </Canvas>
      </div>
    </>
  );
};

export default ThreeDText;
