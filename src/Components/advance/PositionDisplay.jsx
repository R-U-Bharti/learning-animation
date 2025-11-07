// PositionDisplay.jsx
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export function PositionDisplay({ targetRef }) {
  const [pos, setPos] = useState({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    if (targetRef.current) {
      const { x, y, z } = targetRef.current.position;
      setPos({
        x: x.toFixed(2),
        y: y.toFixed(2),
        z: z.toFixed(2),
      });
    }
  });

  return (
    <Html>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "8px 12px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "6px",
          fontFamily: "monospace",
        }}
      >
        <div>X: {pos.x}</div>
        <div>Y: {pos.y}</div>
        <div>Z: {pos.z}</div>
      </div>
    </Html>
  );
}
