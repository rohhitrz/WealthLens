'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useTheme } from '@/components/ThemeProvider';
import * as THREE from 'three';

const GlobeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });
  
  const color = theme === 'dark' ? '#4357ad' : '#336cfb';
  
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.3}>
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.2}
        wireframe
      />
    </Sphere>
  );
};

const Globe = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <GlobeMesh />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default Globe; 