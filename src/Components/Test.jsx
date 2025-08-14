import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion'
import TextFillAnimation from './TextFillAnimation'
import { useRef } from 'react'

const Test = () => {

    const contantVariants = {
        show: {
            transition: {
                staggerChildren: 0.01
            }
        }
    }

    const itemVariants = {
        show: { scale: 1, y: 0, opacity: 1 },
        hidden: { scale: 1.5, y: 0, opacity: 0 }
    }

    const name = " Tamilselvan G. "

    // =====================================================================================

    // const rotation = useMotionValue(0);

    // useAnimationFrame((t) => {
    //     rotation.set((t / 50) % 360);
    // });

    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"], // Triggers from top to bottom of section
    });

    // Translate X from 0 to -200vw (since content is 300vw, and screen is 100vw)
    const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

    const scrollX = useMotionValue(0);

    const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const backgroundImage = useMotionTemplate`linear-gradient(${rotation}deg, blue, red)`;

    return (
        <div className='bg-black'>

            <section ref={sectionRef} className="relative h-[300vh]">
                {/* Sticky viewport */}
                <div className="sticky top-0 h-screen overflow-hidden">
                    <motion.div
                        style={{ x: translateX }}
                        className="flex w-[300vw] h-full bg-gradient-to-r from-violet-700/30 to-amber-700/30 items-center justify-start"
                    >
                        <motion.div
                            className="h-[250px] w-[250px] p-0.5 ml-[80vw] rounded-lg" style={{ backgroundImage }}>
                            <div className="w-full h-full bg-black rounded-lg"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <motion.div variants={contantVariants} initial="hidden" animate="show" className="overflow-x-clip flex items-center h-screen w-screen flex-wrap justify-center content-center bg-black gap-4">
                {
                    Array.from({ length: 54 }).map((_, index) =>
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileTap={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, stagger: 0.1 }}
                            className='h-10 w-10 rounded-full bg-amber-400' />
                    )
                }

                {
                    name.split("").map((letter, index) =>
                        <motion.span
                            style={{
                                perspective: '140rem',
                                transformStyle: 'preserve-3d'
                            }}
                            key={index}
                            animate={{ scale: [10, 1], opacity: [0, 1], rotateX: [180, 0] }}
                            transition={{ delay: (index / 10) + 1 }}
                            className='text-4xl text-white uppercase p-8 font-semibold'>
                            {letter}
                        </motion.span>
                    )
                }

                {
                    Array.from({ length: 54 }).map((_, index) =>
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileTap={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.8, stagger: 0.1 }}
                            className='h-10 w-10 rounded-full bg-amber-400' />
                    )
                }

            </motion.div>

            {/* <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="1186" //988
                height="182" // 151
                viewBox="0 0 988 151"
                fill="none"
            >
                <motion.path
                    initial={{ pathLength: 0, fill: 'none', fillOpacity: 0 }}
                    animate={{ pathLength: 1, fill: "url(#textGradient)", fillOpacity: 1 }}
                    transition={{ duration: 1 }}
                    d="M106.964 148H0.884033V118.305L65.3528 32.7372H2.83763V3.43324H105.011V31.7604L39.5653 118.696H106.964V148ZM164.356 148H132.708V3.43324H188.581C206.163 3.43324 219.708 7.53584 229.216 15.7409C238.853 23.8158 243.672 35.342 243.672 50.3196C243.672 59.6966 241.654 67.7066 237.616 74.3486C233.709 80.9916 227.718 86.3956 219.643 90.5636L245.04 148H210.461L188.776 97.4016H164.356V148ZM164.356 31.565V69.6606H188.385C195.288 69.6606 200.628 67.9676 204.405 64.5806C208.312 61.1946 210.266 56.4406 210.266 50.3196C210.266 44.1986 208.377 39.5748 204.6 36.449C200.954 33.193 195.614 31.565 188.581 31.565H164.356ZM304.718 3.43324V148H273.069V3.43324H304.718ZM403.258 150.344C388.802 150.344 376.299 147.349 365.749 141.358C355.2 135.236 347.06 126.641 341.329 115.57C335.599 104.37 332.733 91.1496 332.733 75.9116C332.733 60.8036 335.729 47.6496 341.72 36.449C347.711 25.2484 356.112 16.5874 366.921 10.4661C377.731 4.21464 390.3 1.08894 404.626 1.08894C416.738 1.08894 427.483 3.30304 436.86 7.73114C446.368 12.029 454.117 18.1503 460.108 26.095C466.099 34.0396 469.811 43.4166 471.244 54.2266H437.837C435.753 46.9336 431.716 41.3326 425.725 37.4258C419.864 33.5186 412.571 31.565 403.845 31.565C396.03 31.565 389.258 33.3233 383.527 36.8398C377.927 40.3562 373.629 45.4356 370.633 52.0776C367.638 58.5896 366.14 66.4696 366.14 75.7166C366.14 84.7026 367.638 92.5176 370.633 99.1596C373.759 105.802 378.122 110.947 383.722 114.593C389.453 118.11 396.16 119.868 403.845 119.868C412.701 119.868 420.19 117.849 426.311 113.812C432.562 109.644 436.665 103.979 438.619 96.8156H471.439C469.746 107.495 465.774 116.873 459.522 124.948C453.401 133.022 445.521 139.274 435.884 143.702C426.246 148.13 415.371 150.344 403.258 150.344ZM530.114 148H498.466V3.43324H554.339C571.921 3.43324 585.466 7.53584 594.974 15.7409C604.612 23.8158 609.43 35.342 609.43 50.3196C609.43 59.6966 607.412 67.7066 603.374 74.3486C599.467 80.9916 593.476 86.3956 585.401 90.5636L610.798 148H576.219L554.534 97.4016H530.114V148ZM530.114 31.565V69.6606H554.144C561.046 69.6606 566.386 67.9676 570.163 64.5806C574.07 61.1946 576.024 56.4406 576.024 50.3196C576.024 44.1986 574.135 39.5748 570.358 36.449C566.712 33.193 561.372 31.565 554.339 31.565H530.114ZM730.647 148H638.828V3.43324H730.647V32.7372H661.685L670.476 24.5321V61.0646H723.809V88.8056H670.476V126.901L661.685 118.696H730.647V148ZM754.391 45.4356C754.391 36.7095 756.67 29.0254 761.228 22.3831C765.787 15.6106 772.038 10.3359 779.983 6.55904C788.058 2.65184 797.24 0.698242 807.528 0.698242C817.948 0.698242 826.934 2.52154 834.488 6.16824C842.042 9.81504 847.838 14.9594 851.875 21.6017C856.043 28.2439 858.127 36.1234 858.127 45.2406H826.674C826.674 40.1609 824.916 36.1886 821.399 33.3233C817.883 30.3278 813.129 28.83 807.138 28.83C800.756 28.83 795.612 30.1975 791.704 32.9326C787.927 35.6676 786.039 39.4446 786.039 44.2636C786.039 48.6916 787.211 52.0776 789.555 54.4226C791.9 56.7666 795.612 58.4596 800.691 59.5016L822.376 63.9946C835.27 66.5996 844.842 71.1576 851.094 77.6696C857.345 84.0516 860.471 92.9736 860.471 104.435C860.471 113.682 858.192 121.822 853.633 128.855C849.075 135.757 842.628 141.097 834.293 144.874C826.088 148.651 816.45 150.54 805.38 150.54C794.7 150.54 785.323 148.716 777.248 145.07C769.303 141.423 763.117 136.278 758.688 129.636C754.391 122.864 752.242 114.984 752.242 105.998H783.695C783.695 111.207 785.583 115.245 789.36 118.11C793.137 120.975 798.542 122.408 805.575 122.408C812.738 122.408 818.404 121.105 822.571 118.501C826.739 115.766 828.823 112.119 828.823 107.56C828.823 103.523 827.781 100.397 825.697 98.1826C823.743 95.9686 820.357 94.4056 815.538 93.4946L793.463 89.0006C780.569 86.3956 770.801 81.4466 764.159 74.1536C757.647 66.8596 754.391 57.2876 754.391 45.4356ZM946.939 18.6713V148H915.291V18.6713H946.939ZM874.265 32.7372V3.43324H987.965V32.7372H874.265Z"
                    // stroke="url(#textGradient)"
                    fill="url(#textGradient)"
                    clipPath="url(#revealClip)"
                />
                <defs>
                    <clipPath id="revealClip">
                        <motion.rect
                            initial={{ width: 0 }}
                            animate={{ width: 988 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            height="151"
                            x="0"
                            y="0"
                        />
                    </clipPath>
                    <linearGradient id="textGradient" gradientTransform="rotate(173)">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.06)" />
                        <stop offset="10%" stopColor="rgba(5, 216, 249, 0.24)" />
                        <stop offset="20%" stopColor="rgba(78, 78, 78, 0.24)" />
                        <stop offset="62%" stopColor="rgba(225, 249, 251, 0.24)" />
                        <stop offset="84%" stopColor="rgba(5, 216, 249, 0.24)" />
                        <stop offset="93%" stopColor="rgba(255, 255, 255, 0.24)" />
                    </linearGradient>
                </defs>

            </motion.svg> */}

            {/* <TextFillAnimation /> */}

        </div>
    )
}

export default Test