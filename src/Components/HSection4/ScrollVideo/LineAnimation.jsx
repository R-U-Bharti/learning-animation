// Lineanimation.jsx
import{ useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Lineanimation() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const innerRef = useRef(null); // <g> we translate for auto-pan

  const bluePathRef = useRef(null); // main blue path (scroll-draw)
  const orange1Ref = useRef(null); // orange #1 -> draws at corner #1 (0.4s)
  const orange2Ref = useRef(null); // orange #2 -> draws at corner #1 (0.4s)
  const orange3Ref = useRef(null); // orange #3 -> scrubs between corner #1→#2 (TOP→BOTTOM)
  const orange4Ref = useRef(null); // orange #4 (long curve) -> scrubs between corner #3→END

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      const g = innerRef.current;
      const blue = bluePathRef.current;
      const orange1 = orange1Ref.current;
      const orange2 = orange2Ref.current;
      const orange3 = orange3Ref.current;
      const orange4 = orange4Ref.current;
      if (!svg || !g || !blue || !orange1 || !orange2 || !orange3 || !orange4)
        return;

      // --- Prep BLUE for stroke-dash draw
      const blueLen = blue.getTotalLength();
      blue.style.strokeDasharray = `${blueLen}`;
      blue.style.strokeDashoffset = `${blueLen}`;
      blue.setAttribute("stroke-linecap", "round");

      // helper
      const prepDraw = (el) => {
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        el.setAttribute("stroke-linecap", "round");
        return len;
      };

      // --- Prep oranges
      const orange1Len = prepDraw(orange1); // fixed-time at corner #1
      const orange2Len = prepDraw(orange2); // fixed-time at corner #1
      const orange3Len = prepDraw(orange3); // scrub corner #1 → #2
      const orange4Len = prepDraw(orange4); // scrub corner #3 → END

      // --- Blue corners (from the blue path polyline)
      const pts = [
        { x: 361.877, y: 423.995 }, // start
        { x: 876.573, y: 621.097 }, // corner #1
        { x: 939.419, y: 1366.07 }, // corner #2
        { x: 1298.76, y: 1515.75 }, // corner #3
        { x: 968.396, y: 2343.04 }, // end
      ];

      // segment lengths scaled to actual path length
      const segLens = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const dx = pts[i + 1].x - pts[i].x;
        const dy = pts[i + 1].y - pts[i].y;
        segLens.push(Math.hypot(dx, dy));
      }
      const sumSeg = segLens.reduce((a, b) => a + b, 0);
      const segLensScaled = segLens.map((l) => (l * blueLen) / sumSeg);

      // cumulative drawn length at end of each segment
      const cumLens = [];
      segLensScaled.reduce((acc, l, i) => {
        const next = acc + l;
        cumLens[i] = next; // cumLens[0] end seg0, cumLens[1] end seg1, etc.
        return next;
      }, 0);

      // per-segment durations (with small linger at corners)
      const segDur = segLensScaled.map(
        (l, i) => l * 1 + (i < segLensScaled.length - 1 ? 0.35 : 0)
      );
      const totalDur = segDur.reduce((a, b) => a + b, 0);

      // --- Auto-pan to keep tip centered-ish
      const vbHeight = 3455;
      const panToLength = (drawnLen) => {
        const pt = blue.getPointAtLength(drawnLen);
        const rect = svg.getBoundingClientRect();
        const svgH = rect.height;
        const scaleY = svgH / vbHeight;

        const yPx = pt.y * scaleY;
        const center = svgH / 2;

        const first = blue.getPointAtLength(0);
        const last = blue.getPointAtLength(blueLen);
        const minCenter = Math.min(first.y, last.y) * scaleY;
        const maxCenter = Math.max(first.y, last.y) * scaleY;
        const clamped = Math.min(Math.max(yPx, minCenter), maxCenter);

        gsap.to(g, {
          y: -(clamped - center),
          duration: 0.15,
          ease: "power1.out",
          overwrite: true,
        });
      };

      panToLength(0);

      let corner1Played = false;

      // --- Main scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=320%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
        onUpdate: () => {
          const t = tl.time(); // [0, totalDur]
          let drawn = 0;
          let timeSoFar = 0;

          for (let i = 0; i < segLensScaled.length; i++) {
            const d = segDur[i];
            const segStart = timeSoFar;
            const segEnd = timeSoFar + d;

            if (t >= segEnd) {
              drawn = cumLens[i];
              timeSoFar = segEnd;
              continue;
            }
            if (t > segStart && t < segEnd) {
              const local = (t - segStart) / d; // 0..1
              const eased = gsap.parseEase("power2.inOut")(local); // linger near corners
              const prev = i > 0 ? cumLens[i - 1] : 0;
              drawn = prev + segLensScaled[i] * eased;
              break;
            }
            drawn = i > 0 ? cumLens[i - 1] : 0;
            timeSoFar = segEnd;
          }

          // draw blue
          gsap.set(blue, { strokeDashoffset: blueLen - drawn });

          // pan camera
          panToLength(drawn);

          // fixed-time triggers right at corner #1
          const atOrPastCorner1 = drawn >= cumLens[0] - 0.5;
          if (atOrPastCorner1 && !corner1Played) {
            corner1Played = true;
            gsap.to(orange1, {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(orange2, {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          } else if (!atOrPastCorner1 && corner1Played) {
            // remove this reset if you want them to stay filled when scrolling up
            corner1Played = false;
            gsap.set(orange1, { strokeDashoffset: orange1Len });
            gsap.set(orange2, { strokeDashoffset: orange2Len });
          }

          // scrub orange3 while blue travels corner #1 → corner #2 (TOP→BOTTOM)
          const seg1Start = cumLens[0]; // end of seg0 (corner #1)
          const seg1End = cumLens[1]; // end of seg1 (corner #2)
          const span12 = seg1End - seg1Start;

          if (drawn <= seg1Start) {
            gsap.set(orange3, { strokeDashoffset: orange3Len });
          } else if (drawn >= seg1End) {
            gsap.set(orange3, { strokeDashoffset: 0 });
          } else {
            const localP = (drawn - seg1Start) / span12; // 0..1
            const dash = orange3Len * (1 - localP); // TOP→BOTTOM because path was reversed
            gsap.set(orange3, { strokeDashoffset: dash });
          }

          // scrub orange4 while blue travels corner #3 → END
          const seg3Start = cumLens[2]; // end of seg2 (corner #3)
          const seg3End = cumLens[3]; // end of seg3 (blue end)
          const span3E = seg3End - seg3Start;

          if (drawn <= seg3Start) {
            gsap.set(orange4, { strokeDashoffset: orange4Len });
          } else if (drawn >= seg3End) {
            gsap.set(orange4, { strokeDashoffset: 0 });
          } else {
            const localP = (drawn - seg3Start) / span3E; // 0..1
            const dash = orange4Len * (1 - localP); // forward along its own path
            gsap.set(orange4, { strokeDashoffset: dash });
          }
        },
      });

      // timeline blocks (visuals handled in onUpdate)
      segDur.forEach((d) => tl.to({}, { duration: d }));

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // small helper to render the grey "track" with matching caps
  const Track = ({ d, w }) => (
    <path
      d={d}
      stroke="#3E3E3E"
      strokeWidth={w}
      strokeLinecap="round"
      strokeMiterlimit="10"
    />
  );

  return (
    <>
      {/* <div style={{ height: "150vh" }}></div> */}
      <section ref={sectionRef} className="bg-black ">
        <div
          id="finding-route"
          className="border-2 z-1 backdrop-filter bg-transaparent backdrop-blur-sm border-white/30 rounded-full flex w-max text-nowrap pl-40 py-5 text-xl font-thin absolute pr-20 top-14 transfor translate-x-[100%]"
        >
          <span>Finding the best route for you...</span>
        </div>

        <div
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 2501 3455"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <g ref={innerRef}>
              {/* ==== GREY / STATIC PATHS (ALL RAW) ==== */}

              <svg
                viewBox="0 0 2501 3455"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                <path
                  d="M328.665 862.757L659.983 27.2614"
                  stroke="#444444"
                  strokeWidth="2.15"
                  strokeMiterlimit="10"
                />
                <path
                  d="M485.67 127.705L1777.76 640.091"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M179.89 1303.88L362.358 1219.52C362.358 1219.52 409.748 1197.2 431.754 1141.7L523.843 909.465C529.343 895.611 533.242 881.173 535.479 866.43L571.451 629.571C573.9 613.444 572.848 596.971 568.368 581.29L514.737 393.577"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M433.748 597.83L585.081 657.845L654.794 716.897C663.313 724.113 669.837 733.382 673.761 743.83L745.483 934.706L685.713 975.316C668.838 986.781 647.37 989.145 628.411 981.623L246.541 830.185"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1104.66 1351.18L745.444 934.692"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1533.41 1087.87L969.504 864.249L894.188 875.563"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M758.739 236.005L875.429 625.264C875.429 625.264 953.686 619.04 1012.78 583.385C1071.88 547.73 1071.61 532.208 1108.76 571.35C1145.91 610.492 1120.44 619.654 1330.24 702.851C1540.03 786.048 1648.82 829.189 1648.82 829.189"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1141.99 387.971L1078.27 548.65"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1201.92 1023.22C1201.92 1023.22 1183.46 1004.98 1192.04 983.326C1200.63 961.682 1335.99 620.341 1335.99 620.341C1335.99 620.341 1352.98 593.681 1369.63 600.283C1369.63 600.283 1214.24 992.129 1201.92 1023.22ZM1201.92 1023.22C1189.6 1054.29 1199.68 1090.41 1216.85 1121.63C1234.01 1152.84 1148.19 1330.21 1154.5 1405.21C1181.35 1724.86 942.126 1759.29 942.126 1759.29"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1369.73 600.283L1407.46 615.251C1407.46 615.251 1480.14 634.435 1559.17 553.373C1638.2 472.312 1711.42 485.29 1711.42 485.29"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1618.66 576.965L1348.6 1257.97L1666.63 1384.09"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1348.51 1257.97L829.247 1033.8"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M675.145 1414.94C675.145 1414.94 610.951 1244.31 587.276 1224.2C556.269 1197.85 543.935 1153.72 559.772 1113.8L614.389 976.069"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1255.65 1883.79L1563.61 1106.87"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1078.6 2385.4L1265.83 2299.09C1265.83 2299.09 1313.22 2276.78 1335.23 2221.27L1427.31 1989.04C1432.82 1975.19 1436.71 1960.75 1438.95 1946.01L1474.92 1709.15C1477.37 1693.02 1476.32 1676.55 1471.84 1660.87L1418.21 1473.15"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1337.34 1677.44L1488.68 1737.46L1560.74 1790.56C1569.55 1797.05 1576.58 1805.05 1581.17 1813.82L1665.1 1973.93"
                  stroke="#444444"
                  strokeWidth="3.8"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1583.67 2430.25C1583.67 2430.25 1519.47 2259.62 1495.8 2239.51C1464.79 2213.16 1452.46 2169.04 1468.29 2129.11L1522.91 1991.38"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M266.303 838.441L124.334 1196.43L1449.74 1722.02"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M691.21 1378.58L890.076 877.067"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M941.276 1757.99L1205.48 1094.94"
                  stroke="#444444"
                  strokeWidth="4.2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1394.88 1274.7L1165.24 1849.27"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M278.521 1256.28L395.211 1645.54C395.211 1645.54 560.196 1511.68 625.348 1534.46C712.385 1564.89 640.219 1639.93 850.028 1723.12C882.454 1735.98 914.947 1748.55 942.485 1759.49"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M818.312 1058.46L452.36 1976.92L1024.63 2207.08"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M2023.36 2390.05L1664.14 1973.55"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M683.388 2322.41L721.125 2337.38C721.125 2337.38 793.805 2356.57 872.834 2275.5C951.863 2194.44 1025.08 2207.42 1025.08 2207.42"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M514.8 2745.24C514.8 2745.24 496.337 2727.01 504.922 2705.35C513.507 2683.7 648.864 2342.36 648.864 2342.36C648.864 2342.36 665.855 2315.7 682.513 2322.31C682.513 2322.31 527.121 2714.15 514.8 2745.24ZM514.8 2745.24C502.479 2776.32 512.556 2812.43 529.724 2843.66C546.892 2874.87 492.884 3056.42 467.375 3127.23C441.866 3198.05 527.139 3350.8 527.139 3350.8"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M451.604 1976.72L238.442 2088.97"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M2348.6 2732.7L1582.74 2429"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1090.27 2040.17L795.998 1924"
                  stroke="#444444"
                  strokeWidth="4.21"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1777.22 1936.01L1500.09 2635.08"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1471.96 1730.09L1654.43 1645.73C1654.43 1645.73 1701.82 1623.41 1723.82 1567.91L1815.91 1335.68C1821.41 1321.82 1825.31 1307.38 1827.55 1292.64L1863.52 1055.78C1865.97 1039.66 1864.92 1023.18 1860.44 1007.5L1806.81 819.789"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1023.71 2206.63L1140.4 2595.89C1140.4 2595.89 1304.29 2471.25 1369.44 2494.03C1456.48 2524.46 1384.31 2599.5 1594.12 2682.69C1803.93 2765.89 1911.88 2809.08 1911.88 2809.08"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M212.357 2001.08L329.047 2390.33C329.047 2390.33 407.304 2384.11 466.401 2348.46C525.498 2312.8 525.23 2297.28 562.38 2336.42C599.53 2375.56 574.055 2384.72 783.853 2467.92C993.652 2551.12 1140.43 2594.5 1140.43 2594.5"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M633.762 2051.43L531.875 2313.73"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M717.818 2977.22L1025.78 2200.3"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M1140.51 2595.9C1140.51 2595.9 1211.67 2853.66 1398.71 2873.52C1433.74 2788.7 1500.86 2631.43 1500.86 2631.43"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <path
                  d="M679.505 2330.45L537.302 2688.34L1876.63 3192.17"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />

                {/* two small greys */}
                <path
                  d="M260.856 659.46L389 709.919"
                  stroke="#444444"
                  strokeWidth="3.62"
                  strokeMiterlimit="10"
                />
                <path
                  opacity="0.71"
                  d="M938.98 1365.02L884.784 1497.98"
                  stroke="#444444"
                  strokeWidth="4.3"
                  strokeMiterlimit="10"
                />
                <Track
                  d="M387.218 709.456L814.233 877.456C835.737 883.956 845.739 884.956 901.237 873.956"
                  w={4}
                />
                <Track d="M883.498 674.5L1168.5 788.5" w={4} />
                <Track d="M1321.95 408.982L938.498 1365.49" w={4} />
                <Track
                  d="M1664.49 1974.01C1659.15 1977.01 1647.1 1984.31 1641.49 1987.51C1597.99 2015.51 1573.49 2009.51 1553.56 2002.29L941.098 1759.41C930.581 1784.11 908.346 1836.83 903.539 1850.05C849.954 1970.74 750.298 1907.64 740.782 1903.64C644.23 1863.17 509.418 1934.68 455.333 1975.25"
                  w={4}
                />
                <Track
                  d="M361.877 423.995L876.573 621.097L939.419 1366.07L1298.76 1515.75L968.396 2343.04"
                  w={6.44}
                />
              </svg>
              {/* ==== ORANGES (with grey tracks right under them) ==== */}

              {/* Orange #1 (corner trigger) */}
              {/* <Track
                d="M387.218 709.456L814.233 877.456C835.737 883.956 845.739 884.956 901.237 873.956"
                w={4}
              /> */}
              <path
                ref={orange1Ref}
                d="M387.218 709.456L814.233 877.456C835.737 883.956 845.739 884.956 901.237 873.956"
                stroke="#FF7F35"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />

              {/* Orange #2 (corner trigger) */}
              {/* <Track d="M883.498 674.5L1168.5 788.5" w={4} /> */}
              <path
                ref={orange2Ref}
                d="M883.498 674.5L1168.5 788.5"
                stroke="#FF7F35"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />

              {/* Orange #3 (scrub corner #1→#2, reversed TOP→BOTTOM) */}
              {/* <Track d="M1321.95 408.982L938.498 1365.49" w={4} /> */}
              <path
                ref={orange3Ref}
                d="M1321.95 408.982L938.498 1365.49"
                stroke="#FF7F35"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />

              {/* Orange #4 (scrub corner #3→END, long curve) */}
              {/* <Track
                d="M1664.49 1974.01C1659.15 1977.01 1647.1 1984.31 1641.49 1987.51C1597.99 2015.51 1573.49 2009.51 1553.56 2002.29L941.098 1759.41C930.581 1784.11 908.346 1836.83 903.539 1850.05C849.954 1970.74 750.298 1907.64 740.782 1903.64C644.23 1863.17 509.418 1934.68 455.333 1975.25"
                w={4}
              /> */}
              <path
                ref={orange4Ref}
                d="M1664.49 1974.01C1659.15 1977.01 1647.1 1984.31 1641.49 1987.51C1597.99 2015.51 1573.49 2009.51 1553.56 2002.29L941.098 1759.41C930.581 1784.11 908.346 1836.83 903.539 1850.05C849.954 1970.74 750.298 1907.64 740.782 1903.64C644.23 1863.17 509.418 1934.68 455.333 1975.25"
                stroke="#FF7F35"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* ==== BLUE (scroll-draw) with grey track ==== */}
              {/* <Track
                d="M361.877 423.995L876.573 621.097L939.419 1366.07L1298.76 1515.75L968.396 2343.04"
                w={6.44}
              /> */}
              <path
                ref={bluePathRef}
                d="M361.877 423.995L876.573 621.097L939.419 1366.07L1298.76 1515.75L968.396 2343.04"
                stroke="#2EA1FF"
                strokeWidth="6.44"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />

              {/* remaining orange (static) */}
              <path
                d="M1022.94 2207.06L1580.82 2427.56"
                stroke="#FF7F35"
                strokeWidth="4"
                strokeMiterlimit="10"
              />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}

export default Lineanimation;
