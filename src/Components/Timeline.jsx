import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Timeline = () => {

  const style = {
    y: -500, rotate: 360, borderRadius: "100%", scale: 0.5, repeat: -1, yoyo: true
  }

  const tl = gsap.timeline()

  useGSAP(() => {

    // const target = document.querySelector("#blue")

    // gsap.to(target, {
    //   x: 1300,
    //   scale: 1,
    //   rotate: 360,
    //   duration: 3,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "linear",
    //   onUpdate: () => {
    //     const x = gsap.getProperty(target, "x")      // get current x
    //     const maxX = 1300

    //     // Calculate progress ratio (0 to 1)
    //     const progress = Math.abs(x) / maxX

    //     // Calculate radius based on x (0% to 100%)
    //     const radius = `${progress * 100}%`

    //     // Set the border radius
    //     target.style.borderRadius = radius
    //   }
    // })

    tl.to("#blue", { ...style, duration: 1 })
      .to("#amber", { ...style, duration: 1 })
      .to("#fuchsia", { ...style, duration: 1 })
      .to("#green", { ...style, duration: 1 })
  })

  return (
    <>
      <div className="h-screen w-screen flex flex-wrap gap-10 justify-center items-end p-10 bg-gradient-to-b from-slate-800 to-slate-950">

        {/* <div id="blue" className="size-[100px] bg-blue-700 scale-50 rounded-full"></div> */}

        <div id="blue" className="size-[100px] mt-[500px] rounded-md bg-blue-700"></div>
        <div id="amber" className="size-[100px] mt-[500px] rounded-md bg-amber-700"></div>
        <div id="fuchsia" className="size-[100px] mt-[500px] rounded-md bg-fuchsia-700"></div>
        <div id="green" className="size-[100px] mt-[500px] rounded-md bg-green-700"></div>

        <div className="flex gap-2 items-center justify-center w-full">
          <button onClick={() => tl.pause()} className="rounded-full px-6 py-2 text-white text-sm bg-red-600 hover:bg-red-700 w-max">Pause</button>
          <button onClick={() => tl.resume()} className="rounded-full px-6 py-2 text-white text-sm bg-green-600 hover:bg-green-700 w-max">Resume</button>
          <button onClick={() => tl.seek(3)} className="rounded-full px-6 py-2 text-white text-sm bg-blue-600 hover:bg-blue-700 w-max">Seek</button>
          <button onClick={() => tl.reverse()} className="rounded-full px-6 py-2 text-white text-sm bg-amber-600 hover:bg-amber-700 w-max">Reverse</button>
        </div>

      </div>

    </>
  )
}

export default Timeline