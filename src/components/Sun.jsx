import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Sun() {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpeg");
  const sun = useRef();

  useFrame(() => {
    sun.current.rotation.y += 0.002;
  });

  return (
    <>
      <pointLight color="#F4E99B" />
      <mesh ref={sun} scale={[10, 10, 10]}>
        <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
        <meshBasicMaterial map={sunTexture} attach="material" />
      </mesh>
    </>
  );
}

export default Sun;
