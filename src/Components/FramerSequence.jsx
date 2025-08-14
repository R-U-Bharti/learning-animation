/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import "./App.css";
import { transition } from "./contants";

const TOTAL_FRAMES = 456 + 179 + 227; // Total count of images

const App = () => {
    const canvasRef = useRef(null); // canva ref
    const containerRef = useRef(null); // container ref
    const [videoDone, setVideoDone] = useState(false); // capture video flag
    const [openFrame, setOpenFrame] = useState(0) // capture frame count

    // ✅ Load all images
    const images = useMemo(() => {
        const frames = [];

        for (let i = 0; i < 456; i++) {
            const padded = String(i).padStart(3, "0");
            const img = new Image();
            img.src = `/lap_orange/Laptop---Rays-Effect_Orange-Flare${padded}.png`;
            frames.push(img);
        }
        for (let i = 0; i < 179; i++) {
            const padded = String(i).padStart(3, "0");
            const img = new Image();
            img.src = `/minnal_sphere/Minnal_Sphere-Animation---Final${padded}.png`;
            frames.push(img);
        }
        for (let i = 0; i < 227; i++) {
            const padded = String(i).padStart(3, "0");
            const img = new Image();
            img.src = `/lap_reverse/lap_reverse_final_revised${padded}.png`;
            frames.push(img);
        }

        return frames;
    }, []);

    // ✅ Scroll-driven frame index
    const { scrollYProgress } = useScroll({
        target: containerRef.current ? containerRef : null,
        offset: ["start start", "end end"],
    });

    const frame = useTransform(
        scrollYProgress,
        [0, 0.9],
        [0, TOTAL_FRAMES - 1]
    );

    // useMotionValueEvent(scrollYProgress, 'change', latest => console.log('scroll value: ', latest))

    // ✅ Draw to canvas
    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img?.complete) return;

        const dpr = window.devicePixelRatio || 1;
        const cw = window.innerWidth;
        const ch = window.innerHeight;

        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${ch}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, cw, ch);

        const imgRatio = img.width / img.height;
        const canvasRatio = cw / ch;

        let drawWidth, drawHeight;

        if (canvasRatio > imgRatio) {
            drawWidth = cw;
            drawHeight = cw / imgRatio;
        } else {
            drawHeight = ch;
            drawWidth = ch * imgRatio;
        }

        const offsetX = (cw - drawWidth) / 2;
        const offsetY = (ch - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // ✅ Listen to frame changes
    useEffect(() => {

        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

        const unsub = frame.on("change", (latest) => {
            const index = Math.floor(latest);
            renderFrame(index);
        });

        renderFrame(0);
        return () => unsub();
    }, [frame, images]);

    // ✅ Wait for video to end
    const handleVideoEnd = () => {
        setVideoDone(true);
    };

    // =========== ANIMATION LOGICS ================

    useMotionValueEvent(frame, 'change', latest => {
        setOpenFrame(latest)
    })

    console.log('frame count: ', openFrame < TOTAL_FRAMES - 1)

    return (
        <div>
            {!videoDone && (
                <video
                    src="/videos/logo.mp4"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="fixed top-0 left-0 w-screen h-screen object-cover z-50"
                />
            )}

            {videoDone && (
                <div ref={containerRef} className="relative bg-black overflow-x-hidden">

                    {/* Canvas stays fixed and fullscreen */}
                    <AnimatePresence>
                        {openFrame < TOTAL_FRAMES - 1 &&
                            <motion.div
                                exit={{ opacity: 0 }}
                                transition={transition()}
                                className="h-[6000px]">
                                <canvas
                                    ref={canvasRef}
                                    className="fixed top-0 left-0 w-full h-full z-10"
                                />

                                {/* Content rendered "on top" of canvas */}
                                <div className="absolute top-0 left-0 z-20 bg-black bg-opacity-0">

                                    <AnimatePresence>
                                        {openFrame < 166 &&
                                            <div className="h-screen w-screen overflow-clip flex flex-col items-center justify-center text-white">

                                                <motion.div
                                                    initial={{ y: -100, opacity: 0 }}
                                                    animate={{ y: 600, opacity: 1 }}
                                                    exit={{ y: -100, opacity: 0 }}
                                                    transition={transition()}
                                                    className="flex flex-col items-center gap-2 h-screen">
                                                    <button className="border border-white rounded-xl h-20 w-10 cursor-pointer group">
                                                        <div className="rotate-90 text-xl group-hover:mt-5 ">&gt;</div>
                                                    </button>
                                                    <span>Scroll To Trigger</span>
                                                </motion.div>

                                            </div>}
                                    </AnimatePresence>

                                </div>
                            </motion.div>}
                    </AnimatePresence>
                    {/* ============= Canva Content End ============= */}


                    <div className="mt-[6000px] h-[5000px] bg-black border w-full text-white">
                        My content
                    </div>

                </div>
            )}
        </div>
    );
};

export default App;