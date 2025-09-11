import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import BotScene from "./BotScene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lineanimation from "./ScrollVideo/LineAnimation";
import FirstMaxSection from "./FirstMaxSection";

const RouteMax = () => {
  const actionRef = useRef(null);
  const sceneRef = useRef(null);
  const [position, setPosition] = useState([0, -40, -50]);

  let wasStopped = false;
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current,
        start: "top top",
        end: "+=600%",
        scrub: 1.2,
        pin: true,
        onUpdate: self => {
          const p = self.progress * 7;

          let xAxis = 0;
          let yAxis = -40;
          let zAxis = -50;

          if (p > 1) {
            xAxis = gsap.utils.mapRange(1, 5, 0, -65, p);
            yAxis = gsap.utils.mapRange(1, 5, -40, 85, p);
            zAxis = gsap.utils.mapRange(1, 5, -50, -170, p);
          }

          if (p < 3 && wasStopped) {
            actionRef.current["Animation"]?.reset().fadeIn(0.5).play();
            wasStopped = false;
          }

          if (p > 3 && !wasStopped) {
            Object.values(actionRef.current).forEach(action => {
              action.reset().stop();
            });
            wasStopped = true;
          }
          if (p < 4.5) {
            setPosition([xAxis, yAxis, zAxis]);
          }
        },
      },
    });

    tl.to("#firstSectionRoute", {
      opacity: 0,
      duration: 2,
    }).to("#secondRouteSection", {
      opacity: 1,
      duration: 2,
    });
  });

  useEffect(() => {
    if (actionRef.current) actionRef.current["Animation"]?.play();
  }, [actionRef.current]);

  return (
    <>
      <div id="firstRoutSection" className="opacity-1">
        <FirstMaxSection />
      </div>

      <div
        ref={sceneRef}
        className="h-screen w-screen absolute top-0 flex justify-center items-center z-10"
      >
        <Canvas>
          
          <BotScene position={position} actionRef={actionRef} />
        </Canvas>
      </div>

      <div id="secondRouteSection" className="opacity-0">
        <Lineanimation />
      </div>

      <div className="h-screen bg-white"></div>
    </>
  );
};

export default RouteMax;
