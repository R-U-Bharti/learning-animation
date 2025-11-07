import { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { WorldScene } from "./WorldScene";
import { Loader } from "./Loader";
import { Leva, useControls } from "leva";

export default function ControlledCamera() {
  const camRef = useRef();
  const { set } = useThree();

  // 🎛️ Create Leva controls
  const { x, y, z, fov, near, far } = useControls("Camera", {
    x: { value: -14, min: -50, max: 50, step: 0.1 },
    y: { value: 13, min: -50, max: 50, step: 0.1 },
    z: { value: 80, min: -50, max: 500, step: 0.1 },
    fov: { value: 75, min: 10, max: 120, step: 1 },
    near: { value: 0.1, min: 0.01, max: 5, step: 0.01 },
    far: { value: 1000, min: 10, max: 5000, step: 10 },
  });

  // 🧩 Update camera position & projection dynamically
  useThree(({ camera }) => {
    if (camRef.current) {
      camera.position.set(x, y, z);
      camera.fov = fov;
      camera.near = near;
      camera.far = far;
    }
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[x, y, z]}
      fov={fov}
      near={near}
      far={far}
    />
  );
}
