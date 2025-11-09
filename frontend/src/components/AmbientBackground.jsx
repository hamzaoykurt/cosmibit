import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D Particle
 * Individual floating particle that responds to time
 */
function Particle({ position, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Animate position based on time
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#60a5fa"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/**
 * Liquid Glass Sphere
 * Main central element with distortion effect
 */
function LiquidGlassSphere({ mousePosition }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Subtle movement based on mouse position
      meshRef.current.position.x = mousePosition.x * 0.5;
      meshRef.current.position.y = mousePosition.y * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.7}
      />
    </Sphere>
  );
}

/**
 * Floating Particles Cloud
 * Multiple particles distributed in 3D space
 */
function ParticleCloud() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <Particle key={i} position={particle.position} speed={particle.speed} />
      ))}
    </>
  );
}

/**
 * Scene Component
 * Contains all 3D elements and lighting
 */
function Scene({ mousePosition }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />

      {/* Main Elements */}
      <LiquidGlassSphere mousePosition={mousePosition} />
      <ParticleCloud />

      {/* Controls (disabled for user interaction but enables damping) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

/**
 * Ambient 3D Background Component
 * Full-screen canvas with interactive 3D elements
 * Responds to mouse movement for enhanced interactivity
 */
const AmbientBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // Normalize mouse position to -1 to 1 range
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <div
      className="fixed inset-0 -z-10"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
};

export default AmbientBackground;
