/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './App.css'
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 862;

const App = () => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const videoRef = useRef();

  const [videoEnded, setVideoEnded] = useState(false);

  const images = useMemo(() => {
    const frames = [];
    for (let i = 1; i < 456; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/lap_orange/Laptop---Rays-Effect_Orange-Flare${padded}.png`;
      frames.push(img);
    }
    for (let i = 0; i < 179; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/minnal_sphere/Minnal_Sphere-Animation---Final${padded}.png`;
      frames.push(img);
    }
    for (let i = 0; i < 227; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/lap_reverse/lap_reverse_final_revised${padded}.png`;
      frames.push(img);
    }
    return frames;
  }, []);


  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = images[index];

    if (!ctx || !img?.complete) return;

    // Get canvas & image dimensions
    const cW = canvas.width;
    const cH = canvas.height;
    const iW = img.width;
    const iH = img.height;

    // Reset transform (for retina)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cW, cH);

    // Calculate scale to cover
    const canvasRatio = cW / cH;
    const imageRatio = iW / iH;

    let drawWidth, drawHeight;

    if (canvasRatio > imageRatio) {
      drawWidth = cW;
      drawHeight = (cW / iW) * iH;
    } else {
      drawHeight = cH;
      drawWidth = (cH / iH) * iW;
    }

    const offsetX = (cW - drawWidth) / 2;
    const offsetY = (cH - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };


  useEffect(() => {

    if (!videoEnded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr); // retina fix

      images[0].onload = () => renderFrame(0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const obj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "5000px",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        // onUpdate: (self) => {
        //   // 🔥 Scroll value & progress here
        //   const scrollY = self.scroll();
        //   const progress = self.progress;
        //   console.log("ScrollY:", scrollY, "Progress:", progress.toFixed(3));
        // },
      },
    });

    tl.to(obj, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => renderFrame(obj.frame),
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.killAll();
    };
  }, [videoEnded, images]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;

      console.log("Global Scroll:", scrollY, "Progress:", progress.toFixed(3));
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useGSAP(() => {
    // Fade IN from 0 → 100px
    gsap.fromTo(
      "#scrollButton",
      { opacity: 0.5, y: "-500px" },
      {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: "#scrollButton",
          start: "top center",
          end: "+=100",
          scrub: true,
        },
      }
    );

    // Fade OUT from 100 → 500px
    gsap.to("#scrollButton", {
      opacity: 0,
      y: '-500px',
      ease: "power1.in",
      scrollTrigger: {
        trigger: "#scrollButton",
        start: "top+=100 top",
        end: "top+=1000 top",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <>
      {!videoEnded && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/logo.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setVideoEnded(true)}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {videoEnded && (
        <div ref={containerRef} id="mainContainer" className="relative bg-black h-[6000px] overflow-x-hidden">

          {/* Canvas stays fixed and fullscreen */}
          <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-10"
          />

          {/* Content rendered "on top" of canvas */}
          <div className="absolute top-0 left-0 z-20 bg-black bg-opacity-0">

            <div className="h-screen w-screen flex flex-col items-center justify-center text-white">

              <div id="scrollButton" className="flex flex-col items-center gap-2 h-screen">
                <button className="border border-white rounded-xl h-20 w-10 cursor-pointer group">
                  <div className="rotate-90 text-xl group-hover:mt-5 transition-all duration-300 ease-in-out">&gt;</div>
                </button>
                <span>Scroll To Trigger</span>
              </div>

            </div>
          </div>

        </div>
      )}

    </>
  );
};

export default App;