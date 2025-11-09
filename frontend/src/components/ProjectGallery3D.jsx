import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import api from '../services/api';

/**
 * 3D Project Card
 * Individual project displayed as an interactive 3D card
 */
function ProjectCard3D({ project, position, index, onHover, isHovered }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;

      // Rotation on hover
      if (hovered || isHovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.PI * 0.1,
          0.1
        );
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        onHover(index);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      {/* Card Background */}
      <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={hovered || isHovered ? '#8b5cf6' : '#4c1d95'}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>

      {/* Project Title */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.title}
      </Text>

      {/* Project Description */}
      <Text
        position={[0, 0.3, 0.06]}
        fontSize={0.08}
        color="#e0e0e0"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.description?.substring(0, 80)}...
      </Text>

      {/* Status Badge */}
      <RoundedBox
        args={[0.8, 0.2, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.8, 0.06]}
      >
        <meshStandardMaterial
          color={project.status === 'COMPLETED' ? '#10b981' : '#f59e0b'}
          emissive={project.status === 'COMPLETED' ? '#059669' : '#d97706'}
          emissiveIntensity={0.5}
        />
      </RoundedBox>

      <Text
        position={[0, -0.8, 0.11]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.status}
      </Text>
    </group>
  );
}

/**
 * 3D Gallery Scene
 * Contains all project cards arranged in 3D space
 */
function GalleryScene({ projects }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const groupRef = useRef();

  // Auto-rotate the gallery
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  // Arrange projects in a circular layout
  const radius = 4;
  const angleStep = (Math.PI * 2) / Math.max(projects.length, 1);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={1} castShadow />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      {/* Project Cards */}
      <group ref={groupRef}>
        {projects.map((project, index) => {
          const angle = index * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const y = 0;

          return (
            <ProjectCard3D
              key={project.id}
              project={project}
              position={[x, y, z]}
              index={index}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === index}
            />
          );
        })}
      </group>
    </>
  );
}

/**
 * Project Gallery 3D Component
 * Main component that fetches projects and displays them in 3D
 */
const ProjectGallery3D = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <p className="text-gray-400">No projects available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        className="cursor-pointer"
      >
        <GalleryScene projects={projects} />
      </Canvas>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-card px-6 py-3"
      >
        <p className="text-sm text-gray-300">Hover over projects to interact</p>
      </motion.div>
    </div>
  );
};

export default ProjectGallery3D;
