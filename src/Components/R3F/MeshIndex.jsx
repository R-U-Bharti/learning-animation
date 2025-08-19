import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as Three from "three";
import { OrbitControls, useHelper } from "@react-three/drei";

function Lights() {
  const lightRef = useRef();
  useHelper(lightRef, Three.DirectionalLightHelper, 1, "yellow");

  return (
    <directionalLight ref={lightRef} position={[3, 4, 0]} intensity={1.5} />
  );
}

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const MeshIndex = () => {
  useEffect(() => {
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  });

  return (
    <>
      <div className="h-screen w-screen grid place-items-center bg-gradient-to-b from-slate-950 via-slate-500 to-slate-950">
        <Canvas>
          {/* <Canvas id="myThreeCanvas" camera={{ position: [5, 5, 5], fov: 75 }}> */}
          <directionalLight position={[0, 0, 2]} intensity={0.5} />

          <gridHelper args={[10, 10]} />
          {/* <axesHelper args={[5]} /> */}
          {/* <Lights /> */}

          <ambientLight intensity={0.5} />

          {/* Sphere */}
          {/* <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[1.5, 32, 16]} />
            <meshStandardMaterial color={"#0000ff"} />
          </mesh> */}

          {/* Boxes */}
          {/* <group position={[0, -1, 0]}>
            <Cube position={[1, 0, 0]} color={"#ff0000"} size={[1, 1, 1]} />
            <Cube position={[-1, 0, 0]} color={"#00ff00"} />
            <Cube position={[1, 2, 0]} color={"#ffc700"} />
            <Cube position={[-1, 2, 0]} color={"#da16d9"} />
            </group> */}

          <Cube position={[0, 0, 0]} color={"#ff0000"} size={[1, 1, 1]} />

          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default MeshIndex;
