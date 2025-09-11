import Lenis from "lenis";
import { useEffect } from "react";
import "./App.css";
import HorizontalScroll from "./Components/Horizontal/HorizontalScroll";
import Test from "./Components/Test";
import SquareRotation from "./Components/SquareRotation";
import MapSvg from "./Components/MapSvg";
import ThreeIndex from "./Components/R3F/ThreeIndex";
import RouteMax from "./Components/HSection4/RouteMax";
import PinComponent from "./Components/R3F/PinComponent";
import ControlAnimation from "./Components/R3F/CA/ControlAnimation";
const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    });

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* <App /> */}
      {/* <Test /> */}
      {/* <GsapBasics /> */}
      {/* <GsapScrollTrigger /> */}
      {/* <GsapScrollTrigger2 /> */}
      {/* <WidthCheck /> */}
      {/* <SVGAnimation /> */}
      {/* <MapSvg /> */}
      {/* <Timeline /> */}
      {/* <Stagger /> */}

      {/* <Cube /> */}

      {/* <VideoSequence /> */}
      {/* <HorizontalScroll /> */}
      {/* <SquareRotation /> */}
      {/* <ThreeIndex /> */}

      {/* <PinComponent /> */}

      {/* <RouteMax /> */}

      <ControlAnimation />
    </>
  );
};

export default App;
