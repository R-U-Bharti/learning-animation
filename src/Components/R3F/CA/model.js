"use client";
import React, { memo, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Model = ({
  position,
  modelActions,
  rotation,
  scale = 1,
  onLoad,
  onError,
  autoPlay = true,
  visible = true,
  modelPath = "",
  ...props
}) => {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath || "");
  const { actions } = useAnimations(animations, group);

  // sending modelActions
  useEffect(() => {
    modelActions(actions);
  }, []);

  // Handle successful loading
  useEffect(() => {
    if (scene && actions) {
      try {
        // Call onLoad callback to hide loader
        onLoad?.();
        // Set up bot actions
        setTimeout(() => {
          if (autoPlay) {
            const defaultAction = Object.values(actions)[0];
            defaultAction?.reset().fadeIn(0.5).play();
          }
        }, 1000);
        console.log("Model actions:", Object.keys(actions));
      } catch (error) {
        console.error("Error setting up bot:", error);
        onError?.();
      }
    }
  }, [scene, actions, onLoad, onError, autoPlay]);

  // Handle loading errors
  useEffect(() => {
    const handleError = (event) => {
      console.error("Failed to load bot model:", event);
      onError?.();
    };

    // Listen for any potential loading errors
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, [onError]);

  // Don't render if not visible or scene not loaded
  if (!scene || !visible) {
    return null;
  }

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale || 1}
      {...props}
      ref={group}
      dispose={null}
    />
  );
};

// Preload the model
// useGLTF.preload(modelPath || "");

export default memo(Model);
