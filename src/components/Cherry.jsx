import { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/models/teatime_cherry.glb");

export const Cherry = forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/teatime_cherry.glb");
  const localRef = useRef();

  const cloned = scene.clone(true);

  return <group ref={ref || localRef} {...props}>
    <primitive object={cloned} />
  </group>;
});
