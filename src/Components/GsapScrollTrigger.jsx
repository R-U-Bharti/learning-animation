import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const GsapScrollTrigger = () => {

    useGSAP(() => {
        gsap.from("#page1 #box",
            {
                rotate: 360,
                duration: 2,
                // scrollTrigger: "#page1 #box",
                scrollTrigger: {
                    trigger: "#page1 #box",
                    scroller: "body",
                    scrub: 2,
                    toggleActions: 'play reverse play reverse'
                }
            }
        )
        // gsap.from("#page2 #box",
        //     {
        //         rotate: 360,
        //         duration: 2,
        //         scrollTrigger: "#page2 #box",
        //         // scrollTrigger: {
        //         //     trigger: "#page2 #box",
        //         //     scroller: "body",
        //         //     start: "top 60%",
        //         //     markers: true,
        //         // }
        //     }
        // )
        gsap.from("#page2 h1",
            {
                x: -300,
                opacity: 0,
                duration: 2,
                // scrollTrigger: "#page2 #box",
                scrollTrigger: {
                    trigger: "#page2 h1",
                    scroller: "body",
                    start: "top 50%",
                    end: "top 15%",
                    markers: true,
                    scrub: 2,
                    pin: true,
                }
            }
        )
        gsap.from("#page2 h2",
            {
                x: 300,
                opacity: 0,
                duration: 2,
                // scrollTrigger: "#page2 #box",
                scrollTrigger: {
                    trigger: "#page2 h2",
                    scroller: "body",
                    start: "top 55%",
                    end: "top 15%",
                    markers: true,
                    scrub: 2, // 1 to 5 for smoothness or true for default
                    pin: true,
                }
            }
        )
    })

    return (
        <>
            <div id="page1" className="h-screen flex items-center">
                <div id='box' className='size-[250px] bg-blue-900 rounded' />
            </div>

            <div id="page2" className="h-screen flex flex-col gap-4 items-center justify-center">
                {/* <div id='box' className='size-[250px] bg-amber-900 rounded' /> */}
                <h1 className="text-xl text-center px-6 py-2 rounded-sm bg-amber-700">Welcome</h1>
                <h2 className="text-xl text-center px-6 py-2 rounded-sm bg-violet-700">GSAP Scroll Trigger</h2>
            </div>
            <div className="h-screen"></div>
        </>
    )
}

export default GsapScrollTrigger