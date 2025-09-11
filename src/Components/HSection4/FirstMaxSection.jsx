import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

const FirstMaxSection = () => {

      const mainRef = useRef(null);
      const textRef = useRef(null);

      useGSAP(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.2,
            pin: true
          }
        });

        tl.to(textRef.current, {
          y: -100,
          autoAlpha: 0,
          opacity: 0,
          duration: 1,
        })
          .to("#circle-gradient", {
            scale: 0,
            autoAlpha: 0,
            opacity: 0,
            duration: 1,
          })
          .to("#firstSectionRoute", {
            display: "none",
          })
      });

  return (
    <>
      <main ref={mainRef} className="h-screen w-screen">
        <section id="firstSectionRoute" className="h-screen">
          <div
            id="circle-gradient"
            style={{
              background: "linear-gradient(180deg, #9C1FD2 6%, #FF8912 70%)",
            }}
            className="absolute top-[20%] left-[33%] size-[35vw] rounded-full blur-3xl opacity-70"
          />
          <div
            ref={textRef}
            className="relative sm:top-16 md:top-20 text-center w-full px-4 sm:px-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Route
              </span>{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Max
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-light">
              Minnal's AI Powered Smart Switch
            </p>

            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold max-w-4xl mx-auto leading-tight px-2">
              Meet Max - Your Intelligent Payment Navigator
            </h2>
          </div>
        </section>

      </main>
    </>
  );
};

export default FirstMaxSection;
