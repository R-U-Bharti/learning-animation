import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PinComponent = () => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

//   useGSAP(() => {
//     const st = ScrollTrigger.create({
//       trigger: firstRef.current,
//       start: "top top",
//       end: "+=100%",
//       pin: true,
//       pinSpacing: false,
//       anticipatePin: 1,
//     });

//     return () => st.kill(); // cleanup on unmount
//   });

  useGSAP(() => {
    gsap.to(secondRef.current, {
        scrollTrigger: {
            trigger: firstRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
        }
    })
  })

  return (
    <>
      <div
        ref={firstRef}
        className="relative h-screen w-screen bg-gradient-to-b from-blue-900 via-white to-black"
      />
      <div
        ref={secondRef}
        className="relative h-screen w-screen rounded-t-3xl bg-gradient-to-b from-violet-700 to-slate-950"
      />
    </>
  );
};

export default PinComponent;
