// FixedHandWithHorizontalText.jsx
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ---------- ASSETS ----------
import handImage from "./assets/hands.png";
import screen1 from "./assets/screen1.png";
import screen2 from "./assets/Maskgroup.png";
import screen3 from "./assets/Maskgroup1.png";
import screen4 from "./assets/Maskgroup2.png";
import screen5 from "./assets/Maskgroup3.png";
import screen6 from "./assets/Maskgroup4.png";

gsap.registerPlugin(ScrollTrigger);

export default function FixedHandWithHorizontalText() {
  const containerRef = useRef(null);
  const deviceSectionRef = useRef(null);

  const textTrackRef = useRef(null);
  const textTrackRef2 = useRef(null);
  const textCardsRef = useRef([]);
  const screenRefs = useRef([]);

  const deviceScreens = [screen1, screen2, screen3, screen4, screen5, screen6];
  const deviceTexts = [
    {
      heading: "Launch",
      para: "AI-powered merchant dashboard with comprehensive analytics and performance tracking. Maya gets complete oversight of her payment operations from day one.",
    },
    {
      heading: "Integrate",
      para: "Lightning-fast payment gateway with plug-and-play APIs for immediate transaction processing. Maya gets a seamless connection to banking infrastructure in minutes.",
    },
    {
      heading: "Optimize",
      para: "Smart routing reduces failures through intelligent path selection and real-time load balancing. Achieve higher success rates automatically.",
    },
    {
      heading: "Secure",
      para: "Blockchain-based escrow builds customer trust with transparent, immutable transaction records. Advanced security protocols ensure fund safety.",
    },
    {
      heading: "Engage",
      para: "AI rewards engine creates personalized loyalty programs that adapt to customer behavior. Transform transactions into repeat business drivers.",
    },
    {
      heading: "Scale",
      para: "Split payments and enhanced checkout boost transaction volumes. Flexible multi-party transactions with diverse payment options.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trackA = textTrackRef.current;
      const trackB = textTrackRef2.current;
      const firstCard = textCardsRef.current[0];

      if (!trackA || !trackB || !deviceSectionRef.current) return;

      const cardWidth = firstCard
        ? firstCard.offsetWidth
        : window.innerWidth * 0.4;
      const gapPx = 64;
      const totalSteps = deviceTexts.length - 1;
      const scrollDistancePx = (cardWidth + gapPx) * totalSteps;

      // Initialize screen positions
      screenRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          x: idx === 0 ? "0%" : "100%",
          opacity: idx === 0 ? 1 : 0,
        });
      });

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: deviceSectionRef.current,
        start: "top top",
        end: () => `+=${scrollDistancePx}`,
        scrub: true,
        pin: true,
        onUpdate: self => {
          const rawImg = self.progress * totalSteps;

          // Screens slide right → left
          screenRefs.current.forEach((screen, i) => {
            if (!screen) return;
            const progress = rawImg - i;
            const x = `${-progress * 100}%`;
            const opacity = 1 - Math.abs(progress);
            gsap.set(screen, { x, opacity: Math.max(0, opacity) });
          });

          // Text horizontal scroll
          const cardWidthVW = (cardWidth / window.innerWidth) * 100;
          const rawText = self.progress * totalSteps;
          const textPositionVW = -(rawText * cardWidthVW);
          gsap.to([trackA, trackB], {
            x: `${textPositionVW}vw`,
            duration: 0.12,
            ease: "none",
            overwrite: true,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-x-hidden bg-black">
      <section
        ref={deviceSectionRef}
        className="h-screen w-screen bg-white relative flex md:items-center lg:items-end justify-center lg:px-10"
      >
        {/* Pinned Heading */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-40">
          <h2 className="text-[24px] font-normal text-black md:mt-0 md:text-[30px] md:font-bold lg:text-[60px]">
            Payment Solutions
          </h2>
          <p className="mx-auto text-nowrap text-[16px] font-thin text-black lg:text-[20px] mb-10">
            Step-by-step walkthrough of a successful merchant's experience with
            Minnal
          </p>
        </div>

        {/* Hand + Screen */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <img
            src={handImage}
            alt="hand"
            className="w-[500px] h-[500px] object-contain -ml-10"
          />
          <div className="absolute top-[8%] md:left-[28%] lg:left-[30.5%] md:w-[50.2%] lg:w-[43%] h-[84%] overflow-hidden rounded-3xl z-30">
            {deviceScreens.map((src, i) => (
              <img
                key={i}
                ref={el => (screenRefs.current[i] = el)}
                src={src}
                alt={`screen-${i}`}
                className="absolute w-full h-full object-cover rounded-md shadow-lg"
                style={{ top: 0, left: 0 }}
              />
            ))}
          </div>
        </div>

        {/* Text Tracks */}
        <div className="relative overflow-hidden w-full z-10 pt-20">
          <div className="h-[260px] md:h-[280px] lg:h-[300px] w-full grid grid-cols-12">
            {/* Left column (previous content) */}
            <div className="col-span-6 w-[50vw] lg:w-[40vw] overflow-clip">
              <div
                ref={textTrackRef}
                style={{
                  width: `${
                    deviceTexts.length * (window.innerWidth >= 1024 ? 40 : 45)
                  }vw`,
                }}
                className="flex h-full"
              >
                {deviceTexts.map((t, i) => (
                  <div
                    key={i}
                    ref={el => (textCardsRef.current[i] = el)}
                    className="w-[50vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 opacity-30 
                       p-4 md:p-2 px-[8vw] md:px-[6vw] lg:px-[10vw] rounded-xl text-black"
                  >
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-2 text-start">
                      {deviceTexts[i - 1]?.heading ?? ""}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-black/80 text-start">
                      {deviceTexts[i - 1]?.para ?? ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column (current content) */}
            <div className="col-span-6 h-full w-[50vw] lg:w-[40vw] overflow-clip">
              <div
                ref={textTrackRef2}
                style={{
                  width: `${
                    deviceTexts.length * (window.innerWidth >= 1024 ? 40 : 45)
                  }vw`,
                }}
                className="flex h-full"
              >
                {deviceTexts.map((t, i) => (
                  <div
                    key={i}
                    className="w-[50vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 
                       p-4 md:p-2 rounded-xl text-black 
                       pl-[8vw] md:pl-[6vw] lg:pl-[15vw] 
                       pr-[10vw] md:pr-[6vw] lg:pr-[5vw]"
                  >
                    <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-2 text-start">
                      {t.heading}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-black/80 text-start">
                      {t.para}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* End section */}
      <section className="h-screen w-screen flex items-center justify-center bg-black">
        <h1 className="text-white text-6xl font-extrabold">The End</h1>
      </section>
    </div>
  );
}
