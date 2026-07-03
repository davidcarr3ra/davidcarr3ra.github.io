import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Low-poly rotating polyhedron in the header.
function Sphere() {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.007;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 10, 5]} />
      <meshPhongMaterial flatShading color="#333333" />
    </mesh>
  );
}

// Widen the field of view on smaller screens so the shape stays in frame.
function getFOV() {
  const width = window.innerWidth;
  if (width <= 425) return 20;
  if (width < 780) return 15;
  return 14;
}

export default function Scene() {
  // `flat` disables the new ACES tone mapping; `decay={0}` restores the
  // non-attenuating point light. Light intensities are tuned to match the
  // original deployed render (dark ~#222 body with a soft highlight).
  return (
    <Canvas flat camera={{ position: [-5, 2, 10], fov: getFOV() }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[-10, 0, -8]} intensity={3} decay={0} />
      <Sphere />
    </Canvas>
  );
}
