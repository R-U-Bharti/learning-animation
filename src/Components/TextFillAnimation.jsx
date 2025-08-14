import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from 'framer-motion'
import './TextFillEffect.css'

const TextFillAnimation = () => {



    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const text =
        "AI-driven expense management solution designed for modern enterprises, executives, and startups. and real-time analytics, Zricrest streamlines both business and personal expenses into a unified, high-tech platform.";

    const words = text.split(" ");
    const totalLetters = text.replace(/ /g, "").length;

    const startScroll = 0.35;
    const endScroll = 0.5;
    const scrollRange = startScroll - endScroll;

    let letterCount = 0;

    return (
        <>

            <section ref={containerRef} className="sectionText" style={{ background: 'black', height: '300vh' }}>

                <motion.div className="container1">
                    <motion.h2
                        className="text-fill"
                        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                        {words.map((word, wordIndex) => {
                            const letters = word.split("");
                            return (
                                <span
                                    key={wordIndex}
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "nowrap", // Keeps word together
                                        marginRight: "0.4em", // spacing between words
                                    }}
                                >
                                    {letters.map((letter, index) => {
                                        const globalIndex = letterCount++;
                                        const start =
                                            startScroll - (globalIndex / totalLetters) * scrollRange;
                                        const end = start - scrollRange / totalLetters;

                                        const backgroundSize = useTransform(
                                            scrollYProgress,
                                            [start, end],
                                            ["0%", "100%"]
                                        );

                                        return (
                                            <motion.span
                                                key={globalIndex}
                                                transition={{ duration: 5 }}
                                                style={{
                                                    display: "inline-block",
                                                    background:
                                                        "linear-gradient(to right, white, white) no-repeat",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    backgroundSize,
                                                    color: "rgba(250, 250, 250, 0.2)",
                                                }}
                                            >
                                                {letter}
                                            </motion.span>
                                        );
                                    })}
                                </span>
                            );
                        })}
                    </motion.h2>
                </motion.div>
            </section>
        </>
    );
};

export default TextFillAnimation;