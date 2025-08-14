import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const VideoSequence = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // ✅ Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update(); // ✅ Sync GSAP with Lenis
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoaded = () => {
      const duration = video.duration;

      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${duration * 2000}`, // ✅ Smooth scroll range
          scrub: true, // ✅ Lower value = faster sync
          pin: true,
        },
      });
    };

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>

      <div ref={containerRef} style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <video
          ref={videoRef}
          src="/video.mp4"
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ Makes it fullscreen and covered
          }}
        />
      </div>

      <div style={{ height: "200vh", backgroundColor: "#111" }}></div>
    </div>
  );
};

export default VideoSequence;
