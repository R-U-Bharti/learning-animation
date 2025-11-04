import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function PureThree() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Canvas>
        {/* TEST */}
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />

        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial metalness={0.1} color="orange" />
        </mesh>
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  );
}

export default PureThree;
