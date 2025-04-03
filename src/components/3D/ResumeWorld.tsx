"use client";

import React, { Suspense, useState, useRef, useEffect, Component, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Vector3, Euler, Mesh } from 'three';

// Error Boundary to catch errors in 3D components
class ErrorBoundary extends Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in 3D component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Html center><div className="text-white bg-red-500/80 backdrop-blur-sm p-2 rounded-lg">Failed to load 3D element</div></Html>;
    }

    return this.props.children;
  }
}

// Loading component
function Loader() {
  return (
    <Html center>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-medium">Loading 3D Experience...</p>
      </div>
    </Html>
  );
}

// Experience Island Component
function ExperienceIsland({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox(() => ({ 
    mass: 0,
    position,
    args: [6, 0.5, 6],
  }));

  const [hover, setHover] = useState(false);
  
  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh 
        ref={ref as React.RefObject<Mesh>}
        receiveShadow
      >
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial 
          color={hover ? "#4338ca" : "#6366f1"} 
          emissive={hover ? "#4338ca" : "#000000"}
          emissiveIntensity={hover ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={0.5} 
        position={[0, 2, 0]}
      >
        <Html center position={[0, 2, 0]}>
          <div className={`px-4 py-2 ${hover ? 'bg-primary' : 'bg-primary/80'} text-white font-bold rounded-lg shadow-lg transition-colors duration-300`}>
            Professional Experience
          </div>
        </Html>
        
        <Html position={[0, 0.5, 0]} center transform occlude>
          <div className={`bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ${hover ? 'scale-105' : 'scale-100'}`}>
            <h3 className="text-lg font-bold text-primary mb-2">E-Commerce Store Owner</h3>
            <p className="text-sm text-foreground/80">Feb 2021 - Present</p>
            <ul className="text-xs mt-2 list-disc list-inside text-foreground/70">
              <li>Founded and scaled a hybrid e-commerce business</li>
              <li>Led end-to-end operations, managing 1,000+ SKUs</li>
              <li>Implemented automation strategies using bots</li>
            </ul>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Projects Showcase Component
function ProjectsShowcase({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox(() => ({ 
    mass: 0,
    position,
    args: [6, 0.5, 6],
  }));

  const [hover, setHover] = useState(false);
  
  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh 
        ref={ref as React.RefObject<Mesh>}
        receiveShadow
      >
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial 
          color={hover ? "#7c3aed" : "#8b5cf6"} 
          emissive={hover ? "#7c3aed" : "#000000"}
          emissiveIntensity={hover ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={0.5} 
        position={[0, 2, 0]}
      >
        <Html center position={[0, 2, 0]}>
          <div className={`px-4 py-2 ${hover ? 'bg-purple-700' : 'bg-purple-600'} text-white font-bold rounded-lg shadow-lg transition-colors duration-300`}>
            Projects
          </div>
        </Html>
        
        <Html position={[0, 0.5, 0]} center transform occlude>
          <div className={`bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ${hover ? 'scale-105' : 'scale-100'}`}>
            <h3 className="text-lg font-bold text-primary mb-2">Recello</h3>
            <p className="text-sm text-foreground/80">A marketplace app similar to OLX</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">React Native</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">Supabase</span>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Skills Cluster Component
function SkillsCluster({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox(() => ({ 
    mass: 0,
    position,
    args: [6, 0.5, 6],
  }));

  const [hover, setHover] = useState(false);
  
  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh 
        ref={ref as React.RefObject<Mesh>}
        receiveShadow
      >
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial 
          color={hover ? "#0369a1" : "#0ea5e9"} 
          emissive={hover ? "#0369a1" : "#000000"}
          emissiveIntensity={hover ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={0.5} 
        position={[0, 2, 0]}
      >
        <Html center position={[0, 2, 0]}>
          <div className={`px-4 py-2 ${hover ? 'bg-blue-700' : 'bg-blue-500'} text-white font-bold rounded-lg shadow-lg transition-colors duration-300`}>
            Skills
          </div>
        </Html>
        
        <Html position={[0, 0.5, 0]} center transform occlude>
          <div className={`bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ${hover ? 'scale-105' : 'scale-100'}`}>
            <h3 className="text-lg font-bold text-primary mb-2">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">Artificial Intelligence</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">Python</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">JavaScript</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">React</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">TensorFlow</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-xs text-foreground/80">Next.js</span>
              </div>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Education Path Component
function EducationPath({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox(() => ({ 
    mass: 0,
    position,
    args: [6, 0.5, 6],
  }));

  const [hover, setHover] = useState(false);
  
  return (
    <group
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh 
        ref={ref as React.RefObject<Mesh>}
        receiveShadow
      >
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial 
          color={hover ? "#16a34a" : "#22c55e"} 
          emissive={hover ? "#16a34a" : "#000000"}
          emissiveIntensity={hover ? 0.3 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={0.5} 
        position={[0, 2, 0]}
      >
        <Html center position={[0, 2, 0]}>
          <div className={`px-4 py-2 ${hover ? 'bg-green-700' : 'bg-green-600'} text-white font-bold rounded-lg shadow-lg transition-colors duration-300`}>
            Education
          </div>
        </Html>
        
        <Html position={[0, 0.5, 0]} center transform occlude>
          <div className={`bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ${hover ? 'scale-105' : 'scale-100'}`}>
            <h3 className="text-lg font-bold text-primary mb-2">Bachelor of Computer Science</h3>
            <p className="text-sm text-foreground/80">University of London (2020-2023)</p>
            <p className="text-xs mt-2 text-foreground/70">First Class Honours, Specialized in Web Technologies and Artificial Intelligence</p>
          </div>
        </Html>
      </Float>
    </group>
  );
}

// Ground Plane
function Ground() {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }));
  
  return (
    <mesh ref={ref as React.RefObject<Mesh>} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#111827" 
        roughness={1}
        metalness={0}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Wrap 3D Content to catch errors
function SceneContent() {
  return (
    <ErrorBoundary fallback={
      <Html center>
        <div className="p-6 bg-background/90 backdrop-blur-lg rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-red-500 mb-2">3D Experience couldn't load</h3>
          <p className="text-sm text-foreground/80">
            Your browser might not support WebGL or 3D features.
            <br />Please try using a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </Html>
    }>
      <Physics>
        <ExperienceIsland position={[0, 5, 0]} />
        <ProjectsShowcase position={[-8, 0, 0]} />
        <SkillsCluster position={[8, 0, 0]} />
        <EducationPath position={[0, -5, 0]} />
        <Ground />
      </Physics>
    </ErrorBoundary>
  );
}

// Simplified version without advanced features that could cause issues
export default function ResumeWorld() {
  return (
    <div className="h-[80vh] w-full rounded-xl overflow-hidden border border-border/20">
      <Canvas
        dpr={[1, 1.5]} // Lower DPR for better performance
        shadows
        camera={{ position: [0, 10, 20], fov: 55 }}
        style={{ background: 'radial-gradient(circle at center, #0f172a, #020617)' }}
      >
        <fog attach="fog" args={['#0f172a', 10, 40]} />
        
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 15, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4338ca" />
        
        <Suspense fallback={<Loader />}>
          <SceneContent />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={30}
        />
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
      </Canvas>
    </div>
  );
} 