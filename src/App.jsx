import { useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Preload, Html } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { planets } from "./planets";

function Planet({ planet, idx }) {
  const texture = useLoader(TextureLoader, `/textures/${planet.name}.jpeg`);
  const ref = useRef();
  const isSun = planet.name === "sun";
  const random = Math.random() * 2 - 1;
  useFrame((t) => {
    ref.current.rotation.y += 0.01;
    if (!isSun) {
      ref.current.position.x =
        Math.cos(t.clock.elapsedTime * random) * (10 + 3 * idx);
      ref.current.position.z =
        Math.sin(t.clock.elapsedTime * Math.abs(random)) * (10 + 3 * idx);
      ref.current.position.y =
        Math.sin(t.clock.elapsedTime * random) * (10 + 3 * idx);
    }
  });
  return (
    <mesh
      position={[planet.name === "sun" ? 0 : 10 + 3 * idx, 0, 0]}
      scale={planet.scale}
      ref={ref}
    >
      <sphereGeometry attach="geometry" args={[0.5, 32, 32]} />
      {isSun ? (
        <meshBasicMaterial map={texture} attach="material" />
      ) : (
        <meshStandardMaterial attach="material" map={texture} />
      )}
      <Html className="planet-name">{planet.name}</Html>
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      style={{ position: "absolute" }}
      camera={{ position: [20, 0, -30] }}
    >
      <pointLight color="#F4E99B" />
      <Suspense fallback={null}>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.2} />
        {planets?.map((planet, idx) => (
          <Planet planet={planet} key={idx} idx={idx} />
        ))}
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

export default App;
