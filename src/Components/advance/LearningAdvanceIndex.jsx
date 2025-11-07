import { Suspense, useEffect, useRef, useState } from "react";
import { WorldScene } from "./WorldScene";
import * as THREE from "three";
import { Loader } from "./Loader";
import {
  Circle,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  useHelper,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import ControlledCamera from "./ControlledCamera";

const getRadians = degrees => {
  return (degrees * Math.PI) / 180;
};

function DirectionalLightWithHelper() {
  const lightRef = useRef();

  // 🎯 Attach a helper to the light (size = 2, color = red)
  useHelper(lightRef, THREE.DirectionalLightHelper, 2, 0xff0000);

  return (
    <directionalLight
      ref={lightRef}
      position={[-2, 2, 0]}
      intensity={0.5}
      castShadow
    />
  );
}

export default function LearningAdvanceIndex() {
  const scenRef = useRef();
  let mat = new THREE.MeshStandardMaterial({ color: "#15224f", side: 2 });

  const modelRef = useRef();

  return (
    <div className="h-screen w-screen overflow-clip">
      <Canvas shadows>
        <Environment files="/sky.exr" background />
        {/* <PerspectiveCamera
          near={0.1}
          far={1000}
          fov={75}
          position={[-10, 22, 80]}
          makeDefault={true}
        /> */}

        <ControlledCamera />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minPolarAngle={getRadians(45)}
          maxPolarAngle={getRadians(90)}
        />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
        <DirectionalLightWithHelper />
        <Circle
          args={[150, 150]}
          position={[0, -2, 0]}
          rotation={[getRadians(90), 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color={"#0c2855"} side={2} />
        </Circle>

        <Suspense fallback={<Loader />}>
          <group ref={modelRef}>
            <WorldScene onClick={e => console.log(e.object?.name)} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
