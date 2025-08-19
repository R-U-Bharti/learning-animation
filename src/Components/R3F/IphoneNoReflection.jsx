import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Iphone13 } from "./Iphone";

const IphoneNoReflection = ({ref}) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.envMap = null; // remove environment reflections
        child.material.needsUpdate = true;
        child.material.roughness = 1;
      }
    });
  }, [scene]);

  return <Iphone13 ref={ref} />;
};

export default IphoneNoReflection;
