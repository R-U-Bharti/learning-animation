import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function GalaxyParticles() {
  const pointsRef = useRef();

  // generate particle positions once
  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color("#ff6030");
    const colorOutside = new THREE.Color("#1b3984");

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5;
      const spinAngle = radius * 1.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randomX = (Math.random() - 0.5) * 0.3;
      const randomY = (Math.random() - 0.5) * 0.3;
      const randomZ = (Math.random() - 0.5) * 0.3;

      const i3 = i * 3;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 5);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors, count };
  }, []);

  // GSAP animation
  useEffect(() => {
    if (pointsRef.current) {
      gsap.to(pointsRef.current.rotation, {
        y: "+=6.28", // 360°
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
