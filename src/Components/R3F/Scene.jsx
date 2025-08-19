import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Iphone13 } from "./Iphone";
import IphoneNoReflection from "./IphoneNoReflection";
import { SphereBot } from "./SphereBot";

const Scene = ({ iphoneRef, rotation, actionsRef, position }) => {
  return (
    <>
      <PerspectiveCamera fov={75} position={[5, -5, 5]} near={0.1} far={1000} />
      {/* <PerspectiveCamera fov={75} position={[5, 5, 5]} near={0.1} far={1000} /> */}
      <Environment preset="city" />
      {/* <OrbitControls /> */}
      <ambientLight intensity={1} />

      {/* <gridHelper args={[10, 10]} /> */}
      {/* <axesHelper args={[5]} /> */}

      {/* <IphoneNoReflection ref={iphoneRef} /> */}
      <SphereBot rotation={rotation} position={position} onActionsReady={actions => actionsRef.current = actions} />
    </>
  );
};

export default Scene;
