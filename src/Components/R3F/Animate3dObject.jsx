import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Animate3dObject = () => {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const iphoneRef = useRef(null);

  const actionsRef = useRef(null);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, -1, -5]);

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
  const rotationY = [-Math.PI / 4, -Math.PI / 3.5, -Math.PI / 1.5, -Math.PI / 3.5, -Math.PI / 4];

  useGSAP(() => {
    // IPHONE ANIMATION
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: sceneRef.current,
    //     start: "top top",
    //     pin: true,
    //     end: "+=400%",
    //     scrub: true,
    //     onUpdate: self => {
    //       // self.progress → a float (0 at start, 1 at end).
    //       // self.direction → scroll direction (1 = down/forward, -1 = up/backward).
    //       // self.scroll() → method that gives current scroll position.
    //       // self.start, self.end → start/end positions of trigger.
    //       // self.trigger → the element used as trigger (sceneRef.current in your case).

    //       // console.log("progress: ", self.progress); // 0 → 1 (scroll progress inside the trigger)
    //       // console.log("direction: ", self.direction); // 1 = scrolling forward, -1 = scrolling backward
    //       // console.log("isActive: ", self.isActive); // true if trigger is active
    //       // console.log("start: ", self.start); // start position of trigger
    //       // console.log("end: ", self.end); // end position of trigger

    //        if (iphoneRef.current) {
    //          // Example: -45° → +45° → -45° across 4 sections
    //          const p = self.progress; // 0 → 1 across all scroll

    //           let rotationY = 0; // default for section 1

    //             if (p <= 0.25) {
    //             // Section 1 → Section 2
    //             rotationY = gsap.utils.mapRange(
    //               0,
    //               0.25,
    //               -Math.PI / 2,
    //               -Math.PI / 3.5,
    //               p
    //             );
    //           } else if (p <= 0.5) {
    //             // Section 2 → Section 3
    //             rotationY = gsap.utils.mapRange(
    //               0.25,
    //               0.5,
    //               -Math.PI / 3.5,
    //               -Math.PI / 1.5,
    //               p
    //             );
    //           } else if (p <= 0.75) {
    //             // Section 3 → Section 4
    //             rotationY = gsap.utils.mapRange(
    //               0.5,
    //               0.75,
    //               -Math.PI / 1.5,
    //               -Math.PI / 3.5,
    //               p
    //             );
    //           } else {
    //             // Section 4 → End (stay at -45°)
    //             rotationY = -Math.PI / 4;
    //           }

    //           // Apply instantly without GSAP tween (so it updates in real time)
    //           iphoneRef.current.rotation.y = rotationY;
    //        }
    //     },
    //   },
    // });

    // tl.to(sceneRef.current, { x: "-25vw" })
    //   .to(sceneRef.current, { x: "25vw" })
    //   .to(sceneRef.current, { x: "-100vw" });

    // SPHERE BOT ANIMATION
    let currentAction = null;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
        onUpdate: self => {
          // const index = Math.floor(self.progress * (animations.length - 1));
          const index = Math.floor(self.progress * 5);
          const animName = animations[index - 1];
          const nextAction = actionsRef.current?.[animName];

          if (nextAction && currentAction !== nextAction) {
            // fade out previous animation
            currentAction?.fadeOut(0.5);

            if (index > 0) {
              // start new animation
              nextAction.reset().fadeIn(0.5).play();
            }

            // update current action
            currentAction = nextAction;
          }

          if (!nextAction && currentAction && index === 0) {
            currentAction?.fadeOut(0.5);
          }

          // const value = 1 + self.progress * 3;
          // setPosition([0, -1, value]);
          // setRotation([value, value, value]);

          const p = self.progress; // 0 → 1 across all scroll

          let zValue = zIndex[0]; // default for section 1
          let rotationValue = rotationY[0]; // default for section 1

          if (p <= 0.25) {
            // Section 1 → Section 2
            zValue = gsap.utils.mapRange(
              0,
              0.25,
              zIndex[0],
              zIndex[1],
              p
            );
            rotationValue = gsap.utils.mapRange(
              0,
              0.25,
              rotationY[0],
              rotationY[1],
              p
            );
          } else if (p <= 0.5) {
            // Section 2 → Section 3
            zValue = gsap.utils.mapRange(
              0.25,
              0.5,
              zIndex[1],
              zIndex[2],
              p
            );
            rotationValue = gsap.utils.mapRange(
              0.25,
              0.5,
              rotationY[1],
              rotationY[2],
              p
            );
          } else if (p <= 0.75) {
            // Section 3 → Section 4
            zValue = gsap.utils.mapRange(
              0.5,
              0.75,
              zIndex[2],
              zIndex[3],
              p
            );
            rotationValue = gsap.utils.mapRange(
              0.5,
              0.75,
              rotationY[2],
              rotationY[3],
              p
            );
          } else {
            // Section 4 → End (stay at -45°)
            zValue = zIndex[4];
            rotationValue = rotationY[4];
          }

          // Apply instantly without GSAP tween (so it updates in real time)
          setPosition([0, -1, zValue]);
          setRotation([0, rotationValue, 0]);
        },
      },
    });

    tl.to(sceneRef.current, {
      x: "-25vw",
    })
      .to(sceneRef.current, {
        x: "25vw",
      })
      .to(sceneRef.current, { x: "-25vw" })
      .to(sceneRef.current, { x: "25vw" });
  });

  return (
    <main ref={mainRef} className="overflow-hidden bg-gradient-to-b from-slate-800 via-slate-500 to-black">
      <div className="h-screen w-screen bg-gradien-to-t from-slate-700 to-slate-950">
        Section 1
        <div ref={sceneRef} className="h-screen w-screen z-10">
          <Canvas>
            {/* <Scene iphoneRef={iphoneRef} /> */}
            <Scene
              rotation={rotation}
              actionsRef={actionsRef}
              position={position}
            />
          </Canvas>
        </div>
      </div>

      <div className="h-screen w-screen bg-gradien-to-t from-violet-700 to-slate-950">
        Section 2
      </div>
      <div className="h-screen w-screen bg-gradien-to-t from-amber-700 to-slate-950">
        Section 3
      </div>
      <div className="h-screen w-screen bg-gradien-to-t from-sky-700 to-slate-950">
        Section 4
      </div>
    </main>
  );
};

export default Animate3dObject;
