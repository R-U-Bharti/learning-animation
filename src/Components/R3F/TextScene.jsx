import { useGSAP } from "@gsap/react";
import { OrbitControls, Text3D } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const TextScene = () => {
   const textRef = useRef();

   useGSAP(() => {
     if (textRef.current) {
       gsap.fromTo(
         textRef.current.position,
         { y: 5, opacity: 0 },
         { y: 1, opacity: 1, duration: 2, ease: "bounce.out" }
       );
       gsap.fromTo(
         textRef.current.rotation,
         { y: -Math.PI },
         { y: 0, duration: 2, ease: "power3.out" }
       );
     }
   });

   return (
     <>
       {/* lights */}
       <ambientLight intensity={0.3} />
       <directionalLight
         position={[5, 8, 4]}
         intensity={1.2}
         castShadow
         shadow-mapSize={[2048, 2048]}
       />

       {/* plane */}
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 0]} receiveShadow>
         <planeGeometry args={[20, 20]} />
         <meshStandardMaterial color="#222" />
       </mesh>

       {/* 3D text */}
       <Text3D
         ref={textRef}
         font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
         size={1}
         height={0.4}
         bevelEnabled
         bevelSize={0.04}
         bevelThickness={0.1}
         castShadow
       >
         R U Bharti
         <meshStandardMaterial
           color="hotpink"
           metalness={0.4}
           roughness={0.3}
         />
       </Text3D>

       {/* orbit controls */}
       <OrbitControls enableDamping />
     </>
   );
}

export default TextScene