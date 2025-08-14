import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Stagger = () => {

    useGSAP(() => {
        gsap.to("#ball", {
            scale: 0.1,
            duration: 1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
                each: 0.01,
                // amount: 10,
                // from: 'edges',
                // grid: [7, 15]
            }
        })
    })

    return (
        <>
            <div className="overflow-x-clip flex items-center h-screen w-screen flex-wrap justify-center content-center bg-black gap-4">
                {
                    Array.from({ length: 189 }).map((_, index) =>
                        <div
                            id='ball'
                            key={index}
                            className='h-10 w-10 rounded-full bg-amber-400' />
                    )
                }
            </div>
        </>
    )
}

export default Stagger