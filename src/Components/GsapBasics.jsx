import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState } from "react"

const GsapBasics = () => {

  const [circle, setCircle] = useState(0)

  const random = gsap.utils.random(-500, 500, 1)

  // ========== 1 ==============
  // useGSAP(() => {
  //   gsap.fromTo(".myBox", {
  //     rotate: 0,
  //     x: 0,
  //     duration: 2,
  //     repeat: Infinity
  //   },
  //     {
  //       rotate: 360,
  //       x: 300,
  //       duration: 2,
  //       repeat: Infinity
  //     })
  // }, { scope: ".container" })

  // ========== 2 ==============
  // useGSAP(() => {
  //   gsap.to(".otherBox", {
  //     x: circle
  //   })
  // }, [circle])

  // ======== 3 =============
  useGSAP(() => {
    gsap.from("h1", {
      // rotateX: "50deg",
      y: 300,
      duration: 1,
      stagger: 0.2,
      repeat: -1,
      yoyo: true
    }, { scope: ".textContainer" })
  })

  return (
    <>

      <main className="container h-screen w-screen flex flex-col gap-20 items-center justify-center bg-gradient-to-t from-blue-950 to-gray-900">

        {/* // ========== 1 ============== */}
        {/* <div className="myBox size-[250px] bg-gradient-to-b from-blue-500 via-violet-600 to-violet-800 rounded-full" /> */}

        {/*   // ========== 2 ============== */}
        {/* <div className="otherBox size-[250px] bg-gradient-to-b from-blue-500 via-violet-600 to-violet-800 rounded-full" />
        <button onClick={() => setCircle(random)} className="bg-gradient-to-r from-green-700 to-green-900 text-white border border-green-700 rounded-full px-6 py-2 hover:scale-90 transition-all duration-200">Animate</button> */}

        <div className="textContainer text-4xl text-white text-center">
          <h1>This is Tamilselvan G.</h1>
          <h1>This is Jeevan</h1>
          <h1>This is Me</h1>

          {/* <h1 className="bg-gradient-to-tr from-green-500 to-green-700 size-11 rounded-full drop-shadow-lg" /> */}
        </div>
      </main>
    </>
  )
}

export default GsapBasics