import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Mercury() {
  const texture = useLoader(TextureLoader, "/textures/mercury.jpeg");
  const earth = useRef();

  useFrame(() => {
    earth.current.rotation.y += 0.01;
    // earth.current.position.x = Math.cos(earth.current.rotation.x);
    // earth.current.position.y = Math.sin(earth.current.rotation.y);
  });

  return (
    <>
      <mesh ref={earth} position={[16, 0, 0]} scale={[0.2, 0.2, 0.2]}>
        <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
    </>
  );
}

export default Mercury;
