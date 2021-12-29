import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Venus() {
  const texture = useLoader(TextureLoader, "/textures/venus.jpeg");
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;

    ref.current.position.x = Math.cos(state.clock.getElapsedTime) * 18;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime) * 18;
    ref.current.position.z = Math.sin(state.clock.getElapsedTime) * 18;
  });

  return (
    <>
      <mesh ref={ref} position={[18, 0, 0]} scale={[0.2, 0.2, 0.2]}>
        <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} attach="material" />
      </mesh>
    </>
  );
}

export default Venus;
