/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import {
  Environment,
  PerspectiveCamera,
  Html,
  OrbitControls,
} from "@react-three/drei";
import { memo, useCallback } from "react";
import { CanvasLoader, Loader3D } from "@/Components/Layouts/CanvasLoaders";
import Model from "./model";
import Image from "next/image";

function CanvasModel({
  fallbackImage,
  rotation,
  position,
  scale,
  actionRef,
  modelPath,
  preset = "",
  presetPath = "",
  id = "",
  autoPlay,
  loaded,
  camera = null,
  fov = null,
  test = false,
}) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelError, setIsModelError] = useState(false);
  const [envError, setEnvError] = useState(false);

  const handleModelLoad = useCallback(() => {
    setIsModelLoaded(true);
    setIsModelError(false);
    if (loaded) loaded(true);
  }, [loaded]);

  const handleModelError = useCallback(() => {
    setIsModelError(true);
    setIsModelLoaded(false);
    if (loaded) loaded(false);
  }, [loaded]);

  // Timeout mechanism - if model doesn't load within 10 seconds, show error
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isModelLoaded && !isModelError) {
        console.warn("Bot model loading timeout");
        setIsModelError(true);
      }
    }, 10000); // 10 seconds timeout

    if (isModelLoaded || isModelError) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isModelLoaded, isModelError]);

  const MemoizedEnvironment = memo(({ preset, presetPath }) => (
    <Suspense fallback={null}>
      {!envError && (
        <>
          {presetPath ? (
            <Environment files={presetPath} onError={() => setEnvError(true)} />
          ) : (
            <Environment
              preset={preset || "city"}
              onError={() => setEnvError(true)}
            />
          )}
        </>
      )}
    </Suspense>
  ));

  return (
    <>
      <Canvas id={id}>
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera
            near={0.1}
            far={1000}
            fov={fov ?? 75}
            position={camera ? camera : [0, 0, 0]}
            makeDefault={(camera || fov) ? true : false}
          />
          <MemoizedEnvironment preset={preset} presetPath={presetPath} />
          <ambientLight intensity={1} />

          {test && (
            <>
              <OrbitControls />
              <gridHelper args={[10, 10]} />
              <axesHelper args={[5]} />
            </>
          )}

          {/* Show loader while model is loading */}
          {!isModelLoaded && !isModelError && <Loader3D />}

          {/* Show fallback image if model fails to load */}
          {isModelError && (
            <Html center>
              <div className="flex min-h-[200px] min-w-[200px] flex-col items-center justify-center rounded-lg border border-gray-500/30 bg-gray-900/50 p-6 backdrop-blur-sm">
                {/* {fallbackImage && ( */}
                <Image
                  src={fallbackImage}
                  alt="Bot Fallback"
                  className="mb-4 h-32 w-32 rounded-lg object-contain"
                  onError={(e) => {
                    // If fallback image also fails, show a default placeholder
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpath d='M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2v.01L17 12v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2l0-.01A2 2 0 0 1 9 10V9a2 2 0 0 1 2-2h4V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z'/%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Ccircle cx='15' cy='9' r='1'/%3E%3C/svg%3E";
                  }}
                />
                {/* // )} */}
                <div className="flex flex-col gap-1 text-center text-sm text-white opacity-75">
                  <span>Unable to load</span>
                  {/* <span>Please refresh and try again</span> */}
                </div>
              </div>
            </Html>
          )}

          <Model
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            scale={scale}
            modelPath={modelPath}
            modelActions={(action) => {
              if (actionRef) actionRef.current = action;
            }}
            onLoad={handleModelLoad}
            onError={handleModelError}
            visible={isModelLoaded}
            autoPlay={autoPlay || true}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default memo(CanvasModel);
