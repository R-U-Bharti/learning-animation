import Lenis from "lenis";
import { useEffect, lazy } from "react";
import "./App.css";
const HorizontalScroll = lazy(() =>
  import("./Components/Horizontal/HorizontalScroll")
);
const Test = lazy(() => import("./Components/Test"));
const SquareRotation = lazy(() => import("./Components/SquareRotation"));
const MapSvg = lazy(() => import("./Components/MapSvg"));
const ThreeIndex = lazy(() => import("./Components/R3F/ThreeIndex"));
const RouteMax = lazy(() => import("./Components/HSection4/RouteMax"));
const PinComponent = lazy(() => import("./Components/R3F/PinComponent"));
const ControlAnimation = lazy(() =>
  import("./Components/R3F/CA/ControlAnimation")
);
const PropertyFallback = lazy(() => import("./Components/PropertyFallback"));
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
      <PropertyFallback />

      {/* <PinComponent /> */}

      {/* <RouteMax /> */}

      {/* <ControlAnimation /> */}
    </>
  );
};

export default App;
