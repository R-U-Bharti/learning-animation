import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import DrawSVGPlugin from "gsap/DrawSVGPlugin"
import './svgStyle.css'

gsap.registerPlugin(DrawSVGPlugin)

const SVGAnimation = () => {

  useGSAP(() => {
    gsap.from("#path1", {
      duration: 2,
      drawSVG: "0%",
      ease: "power1.inOut"
    })
  })

  return (
    <>
      <div className="w-screen flex justify-center items-center py-20">
        {/* <svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
          <path id="path1" d="M 10 80 Q 95 10 180 80" stroke="white" fill="transparent" />
        </svg> */}

        {/* <svg version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          width="516.3px" height="190px" viewBox="0 0 516.3 190" enableBackground="new 0 0 516.3 211.99"
          xmlSpace="preserve">
          <path id="template" d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37" />
          <path id="path" d="M9.13,99.99c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37" />
        </svg> */}
        
      </div>
    </>
  )
}

export default SVGAnimation