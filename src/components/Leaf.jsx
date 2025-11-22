import { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/models/leaf.glb");

export const Leaf = forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/leaf.glb");
  const localRef = useRef();

  const cloned = scene.clone(true);

  
  cloned.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = 2; 
    }
  });

  return <group ref={ref || localRef} {...props}>
    <primitive object={cloned} />
  </group>;
});
