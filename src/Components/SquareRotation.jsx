import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MaxWidth from "./MaxWidth";
import Droplet from "./Droplet";

gsap.registerPlugin(ScrollTrigger);

export default function SquareDetails() {
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const dropletRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut", duration: 0.8 },
    });

    // Droplet 3 (starts first)
    tl.fromTo(
      "#droplet3",
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1 }
    ).to("#droplet3", { scaleY: 0, transformOrigin: "top center" });

    // Droplet 2 (starts halfway through droplet3’s stretch)
    tl.fromTo(
      "#droplet2",
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1 },
      "-=1.2" // overlaps by half
    ).to("#droplet2", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

    // Droplet 1 (starts halfway through droplet2’s stretch)
    tl.fromTo(
      "#droplet1",
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1 },
      "-=1.2"
    ).to("#droplet1", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

     const tl2 = gsap.timeline({
       repeat: -1,
       defaults: { ease: "power2.inOut", duration: 0.8 },
     });

     // Droplet 3 (starts first)
     tl2.fromTo(
       "#droplet4",
       { scaleY: 0, transformOrigin: "bottom center" },
       { scaleY: 1 }
     ).to("#droplet4", { scaleY: 0, transformOrigin: "top center" });

     // Droplet 2 (starts halfway through droplet3’s stretch)
     tl2.fromTo(
       "#droplet5",
       { scaleY: 0, transformOrigin: "bottom center" },
       { scaleY: 1 },
       "-=1.2" // overlaps by half
     ).to("#droplet5", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

     // Droplet 1 (starts halfway through droplet2’s stretch)
     tl.fromTo(
       "#droplet6",
       { scaleY: 0, transformOrigin: "bottom center" },
       { scaleY: 1 },
       "-=1.2"
     ).to("#droplet6", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

    let activeFace = null;

    // Create droplet timelines but paused
    // const dropletGroup1 = gsap.timeline({
    //   paused: true,
    //   defaults: { ease: "power2.inOut", duration: 0.8 },
    // });
    // dropletGroup1
    //   .fromTo(
    //     "#droplet3",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 }
    //   )
    //   .to("#droplet3", { scaleY: 0, transformOrigin: "top center" })
    //   .fromTo(
    //     "#droplet2",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 },
    //     "-=1.2"
    //   )
    //   .to("#droplet2", { scaleY: 0, transformOrigin: "top center" }, "-=0.4")
    //   .fromTo(
    //     "#droplet1",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 },
    //     "-=1.2"
    //   )
    //   .to("#droplet1", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

    // const dropletGroup2 = gsap.timeline({
    //   paused: true,
    //   defaults: { ease: "power2.inOut", duration: 0.8 },
    // });
    // dropletGroup2
    //   .fromTo(
    //     "#droplet6",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 }
    //   )
    //   .to("#droplet6", { scaleY: 0, transformOrigin: "top center" })
    //   .fromTo(
    //     "#droplet5",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 },
    //     "-=1.2"
    //   )
    //   .to("#droplet5", { scaleY: 0, transformOrigin: "top center" }, "-=0.4")
    //   .fromTo(
    //     "#droplet4",
    //     { scaleY: 0, transformOrigin: "bottom center" },
    //     { scaleY: 1 },
    //     "-=1.2"
    //   )
    //   .to("#droplet4", { scaleY: 0, transformOrigin: "top center" }, "-=0.4");

   
    const faces = cubeRef.current.children;

    gsap.to(cubeRef.current, {
      rotationY: "+=270",
      ease: "linear",
      transformOrigin: "center center",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000", // control rotation length
        // pin: true,
        scrub: true,
      },
      onUpdate: () => {
        const rotationY = gsap.getProperty(cubeRef.current, "rotationY") % 360;

        for (let i = 0; i < faces.length; i++) {
          const face = faces[i];
          const baseRotY =
            face.dataset.ry !== undefined ? Number(face.dataset.ry) : 0;

          let relativeY = (rotationY + baseRotY) % 360;
          if (relativeY < 0) relativeY += 360;

          face.style.opacity = relativeY > 89 && relativeY < 271 ? "0" : "1";

          // if (activeFace !== face.id) {
          //   activeFace = face.id;

          //   // Trigger droplets depending on which face is visible
          //   if (face.id === "FrontFace" || face.id === "BackFace") {
          //     dropletGroup1.restart();
          //   } else {
          //     dropletGroup2.restart();
          //   }
          // }
        }
      },
    });

    gsap.to("#lines", {
      y: "-500px",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: true,
      },
    });
  });

  const numberStyle =
    "bg-gradient-to-r from-[#FF7A40] to-[#9C91FF] text-transparent bg-clip-text text-[180px] leading-[220px] font-extrabold";
  const textStyle = "text-white text-2xl font-bold text-center";

  return (
    <>
      <MaxWidth
        ref={containerRef}
        className="bg-black px-5 py-5 lg:px-10 lg:py-0"
      >
        <div className="flex h-screen items-center justify-center overflow-clip">
          <div className="h-screen py-20 w-[40%] justify-start flex gap-28">
            <Droplet
              id={"droplet1"}
              style={{ marginTop: "200px", position: "sticky" }}
            />
            <Droplet
              id={"droplet2"}
              style={{ marginTop: "100px", position: "sticky" }}
            />
            <Droplet
              id={"droplet3"}
              style={{ marginTop: "200px", position: "sticky" }}
            />
          </div>

          <div id="lines" className="w-[280px] translate-x-[300] transform">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className="mb-5 h-1.5 w-full rounded-full bg-white/20 shadow-2xl shadow-white blur-[1px]"
                style={{
                  transform: `translateY(${i * 1}px)`,
                }}
              />
            ))}
          </div>

          <div className="h-screen py-20 w-[40%] justify-end flex gap-28">
            <Droplet
              id={"droplet4"}
              style={{ marginTop: "200px", position: "sticky" }}
            />
            <Droplet
              id={"droplet5"}
              style={{ marginTop: "100px", position: "sticky" }}
            />
            <Droplet
              id={"droplet6"}
              style={{ marginTop: "200px", position: "sticky" }}
            />
          </div>

          <header className="absolute top-5 z-10 flex justify-center lg:top-10">
            <h1 className="w-full text-center text-3xl font-bold text-white md:w-[60%] md:text-4xl lg:text-5xl">
              Transform Your Business Into a Profit Machine
            </h1>
          </header>

          <div className="absolute flex h-full w-full items-center justify-center bg-gradient-to-b from-black/90 via-transparent to-black/90">
            <div
              className="absolute size-[350px] md:mt-24"
              style={{ transformStyle: "preserve-3d" }}
              ref={cubeRef}
            >
              <div
                id="FrontFace"
                data-ry="0"
                className="absolute flex h-full w-full flex-col items-center justify-start text-white"
                style={{ transform: "translateZ(12rem)" }}
              >
                <div className={numberStyle}>12%</div>
                <p className={textStyle}>Increase in Revenue</p>
              </div>

              <div
                id="BackFace"
                data-ry="180"
                className="absolute flex h-full w-full flex-col items-center justify-start text-white"
                style={{ transform: "rotateY(180deg) translateZ(11rem)" }}
              >
                <div className={numberStyle}>10X</div>
                <p className={textStyle}>Better Roughting Efficiency</p>
              </div>

              <div
                id="RightFace"
                data-ry="90"
                className="absolute flex h-full w-full flex-col items-center justify-start text-white"
                style={{ transform: "rotateY(90deg) translateZ(11rem)" }}
              >
                <div className={numberStyle}>2X</div>
                <p className={textStyle}>
                  Faster Payment Gateway Integerations
                </p>
              </div>

              <div
                id="LeftFace"
                data-ry="-90"
                className="absolute flex h-full w-full flex-col items-center justify-start text-white"
                style={{ transform: "rotateY(-90deg) translateZ(10rem)" }}
              >
                <div className={numberStyle}>8%</div>
                <p className={textStyle}>Increase in Approval Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidth>
    </>
  );
}
