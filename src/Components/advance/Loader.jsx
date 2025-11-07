// Loader.jsx
import React from "react";
import { Html, useProgress } from "@react-three/drei";

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "20px" }}>
        {progress.toFixed(0)} % loaded
      </div>
    </Html>
  );
}