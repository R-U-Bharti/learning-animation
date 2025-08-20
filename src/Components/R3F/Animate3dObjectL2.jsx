import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GalaxyParticles from "./GalaxyParticles";

gsap.registerPlugin(ScrollTrigger);

const Animate3dObjectL2 = () => {
  const sceneRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourthRef = useRef(null);

  const actionsRef = useRef(null);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, -1, 2]);

  const getDegree = value => (value * Math.PI) / 180;

  const animations = [
    "03_Sphere_bot_Open",
    "06_Sphere_bot_Run_Attack",
    "05_Sphere_bot_WalkCycle",
    // "01_Sphere_bot_Roll",
    // "07_Sphere_bot_Jump",
    // "04_Sphere_bot_Attack",
    // "02_Sphere_bot_Run_Cycle",
  ];

  const zIndex = [-5, 0, 3, 1];
  const rotationY = [
    -Math.PI / 4,
    -Math.PI / 3.5,
    -Math.PI / 1.5,
    -Math.PI / 3.5,
    -Math.PI / 4,
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current,
        start: "top top",
        end: "+=600%",
        scrub: true,
        pin: true,
        onUpdate: self => {
          const p = self.progress;
          const steps = Math.ceil(p * 5);
  
          let value = 0;
          actionsRef.current?.[animations[steps - 1]]
            ?.reset()
            .fadeIn(0.5)
            .play();
            
          if (p < 0.79) {
            // if (steps === 1) {
            //   animations.forEach(action =>
            //     actionsRef.current?.[action]?.fadeOut(0.5)
            //   );
            // }

            value = gsap.utils.mapRange(
              0,
              0.79 * 2,
              getDegree(0),
              getDegree(360),
              p
            );
          } else {
            value = getDegree(360);
          }
          setRotation([0, value, 0]);
        },
      },
    });

    tl.to(sceneRef.current, {
      x: "-25vw",
    })
      .to(sceneRef.current, {
        x: "25vw",
      })
      .to(sceneRef.current, {
        x: "25vw",
      })
      .to(sceneRef.current, {
        x: "25vw",
      })
      .to(sceneRef.current, {
        x: "-25vw",
      });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: thirdRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
      },
    });

    tl3.to("#textTransform", {
      x: "-100%",
    });
  });

  return (
    <div className="overflow-hidden ">
      <div ref={sceneRef} className="h-screen w-screen z-10 absolute">
        <Canvas>
          <Scene
            rotation={rotation}
            actionsRef={actionsRef}
            position={position}
          />
        </Canvas>
      </div>

      <div
        ref={firstRef}
        className="h-screen w-screen bg-gradien-to-t from-slate-700 to-slate-950"
      ></div>

      <div
        ref={secondRef}
        className="h-screen w-screen bg-gradien-to-t from-violet-700 to-slate-950"
      />

      <div
        ref={thirdRef}
        className="h-screen w-screen flex items-center bg-gradien-to-t from-amber-700 to-slate-950"
      >
        <div
          id="textTransform"
          className="text-[10rem] transform translate-x-[100%] text-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-white"
        >
          Welcome to Three.js Animation
        </div>
      </div>

      <div
        ref={fourthRef}
        className="h-screen w-screen bg-gradien-to-t from-sky-700 to-slate-950"
      />
    </div>
  );
};

export default Animate3dObjectL2;
