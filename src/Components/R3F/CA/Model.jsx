import { Html, useAnimations, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Model = ({ animationData }) => {
  const getDegree = value => (value * Math.PI) / 180;
  const group = useRef();

  const { scene, animations } = useGLTF("/laptop.glb");
  const animData = useAnimations(animations, group);

  useEffect(() => {
    animationData(animData);
  }, [animData]);

  return (
    <>
      <Suspense
        fallback={
          <Html>
            <div className="text-white mx-auto text-3xl font-semibold">
              Model Loading...
            </div>
          </Html>
        }
      >
        <primitive
          position={[0, -0.12, 2.5]}
          rotation={[0, getDegree(-90), 0]}
          ref={group}
          object={scene}
          dispose={null}
        />
      </Suspense>
    </>
  );
};

export default Model;
