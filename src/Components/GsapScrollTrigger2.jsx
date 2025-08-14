import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const GsapScrollTrigger2 = () => {

    useGSAP(() => {
        gsap.fromTo("#page1 h1", {
            transform: "translateX(80%)",
            duration: 3,
            // scrollTrigger: {
            //     trigger: "#page1 h1",
            //     scroller: 'body',
            //     scrub: true,
            //     pin: true,
            //     start: "top 0%",
            //     end: "top 80%",
            //     markers: true
            // }
        },
            {
                transform: "translateX(-80%)",
                // duration: 3,
                scrollTrigger: {
                    trigger: "#page1",
                    scroller: 'body',
                    start: "top 20%",
                    end: "top -200%",
                    scrub: 2,
                    pin: true,
                    markers: true
                }
            })
    })

    return (
        <>
            <div className="h-[100vh] bg-blue-700/60 flex items-center justify-center text-white text-7xl font-semibold">
                <h1>Scroll Trigger Animations</h1>
            </div>
            
            <div id="page1" className="h-max text-start flex">
                <h1 className="uppercase bg-gradient-to-r from-green-600 to-white bg-clip-text text-transparent font-extrabold text-[300px] text-start text-nowrap">Welcome to GSAP Animations</h1>
            </div>

            <div className="h-[100vh] bg-red-400"></div>
        </>
    )
}

export default GsapScrollTrigger2