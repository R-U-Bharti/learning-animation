import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Model from "./Model";
import gsap from "gsap";

const ControlAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (!animationData) return;

    const {actions, names, mixer} = animationData;

    const action = actions[names[0]];
    action.play();
    action.paused = true;

    const duration = action.getClip().duration;

    // GSAP timeline tied to scroll
    gsap.to(action, {
      time: duration, // go from 0 → duration
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container", // element to track
        start: "top top",
        end: "+=500%",
        pin: "#canvas-section",
        scrub: true,
      },
      onUpdate: () => {
        mixer.update(0); // force update to apply pose
      },
    });
  }, [animationData]);

  return (
    <div id="scroll-container" className="h-[500vh]">
      <section id="canvas-section" className="h-screen w-full">
        <Canvas>
          <Suspense
            fallback={
              <Html>
                <div className="text-white mx-auto text-3xl font-semibold">
                  Loading...
                </div>
              </Html>
            }
          >
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 3]}
              near={0.1}
              far={1000}
              fov={75}
            />
            <Suspense
              fallback={
                <Html>
                  <div className="text-white mx-auto text-3xl font-semibold">
                    ENV Loading...
                  </div>
                </Html>
              }
            >
              <Environment preset="city" background={true} />
            </Suspense>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Model animationData={data => setAnimationData(data)} />
          </Suspense>
        </Canvas>
      </section>
    </div>
  );
};

export default ControlAnimation;
