import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/Soda-can.gltf");

const flavorTextures = {
  blackCherry: "/labels/black-cherry.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.35,
  envMapIntensity: 1.0,
  color: "#e5e5e5",
});

export function SodaCan({ scale = 2, ...props }) {
  const { nodes } = useGLTF("/models/Soda-can.gltf");

  const labels = useTexture(flavorTextures);

  labels.blackCherry.flipY = false;

  const label = labels.blackCherry;
  console.log(nodes);

  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0.17, -Math.PI, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylinder.geometry}
        material={metalMaterial}
      />

      <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tab.geometry}
        material={metalMaterial}
      />
    </group>
  );
}
