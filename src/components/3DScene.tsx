"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, 
  SiNodedotjs, SiTailwindcss, SiJavascript, 
  SiGit, SiMongodb, SiPython
} from 'react-icons/si';

// Define types for the tech nodes
interface TechNode {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'language';
  position: { x: number; y: number };
  description: string; // Description for info panel
}

// Clean tech stack visualization with tree structure
export default function Scene3D() {
  const [nodes, setNodes] = useState<TechNode[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Define technologies with tree-like structure positions
  useEffect(() => {
    // Tree layout - Git at top, other technologies organized by category
    setNodes([
      // DevOps at the top
      { 
        id: 'git', 
        name: 'Git', 
        color: '#F05032', 
        icon: <SiGit size={32} />,
        category: 'devops',
        position: { x: 50, y: 15 }, // Center top
        description: 'Distributed version control system for tracking changes in source code'
      },
      
      // Languages in the upper middle section
      { 
        id: 'javascript', 
        name: 'JavaScript', 
        color: '#F7DF1E', 
        icon: <SiJavascript size={28} />,
        category: 'language',
        position: { x: 35, y: 30 }, // Middle left
        description: 'High-level, interpreted programming language that conforms to ECMAScript'
      },
      { 
        id: 'typescript', 
        name: 'TypeScript', 
        color: '#3178C6', 
        icon: <SiTypescript size={28} />,
        category: 'language',
        position: { x: 65, y: 30 }, // Middle right
        description: 'Strongly typed programming language that builds on JavaScript'
      },
      { 
        id: 'python', 
        name: 'Python', 
        color: '#3776AB', 
        icon: <SiPython size={28} />,
        category: 'language',
        position: { x: 20, y: 45 }, // Left branch
        description: 'Interpreted, high-level, general-purpose programming language'
      },
      
      // Frontend in the middle section
      { 
        id: 'react', 
        name: 'React', 
        color: '#61DAFB', 
        icon: <SiReact size={28} />,
        category: 'frontend',
        position: { x: 42, y: 50 }, // Left middle
        description: 'A JavaScript library for building user interfaces with reusable components'
      },
      { 
        id: 'nextjs', 
        name: 'Next.js', 
        color: '#ffffff',
        icon: <SiNextdotjs size={28} />,
        category: 'frontend',
        position: { x: 58, y: 50 }, // Right middle 
        description: 'React framework that enables server-side rendering and static site generation'
      },
      { 
        id: 'tailwind', 
        name: 'Tailwind', 
        color: '#38B2AC', 
        icon: <SiTailwindcss size={28} />,
        category: 'frontend',
        position: { x: 50, y: 65 }, // Bottom middle
        description: 'Utility-first CSS framework for rapidly building custom designs'
      },
      
      // Backend/Database in the bottom section
      { 
        id: 'node', 
        name: 'Node.js', 
        color: '#539E43', 
        icon: <SiNodedotjs size={28} />,
        category: 'backend',
        position: { x: 30, y: 80 }, // Bottom left
        description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side applications'
      },
      { 
        id: 'mongodb', 
        name: 'MongoDB', 
        color: '#4DB33D', 
        icon: <SiMongodb size={28} />,
        category: 'database',
        position: { x: 70, y: 80 }, // Bottom right
        description: 'NoSQL document database for high volume data storage and retrieval'
      }
    ]);
  }, []);

  // Handle node selection
  const handleSelect = (id: string) => {
    // Only select if not dragging
    if (!isDragging) {
      // Toggle active node
      setActiveNode(activeNode === id ? null : id);
      
      // Auto-dismiss the info panel after 4 seconds
      if (id && id !== activeNode) {
        const timer = setTimeout(() => {
          setActiveNode(null);
        }, 4000);
        
        return () => clearTimeout(timer);
      }
    }
  };
  
  // Update node position when dragged
  const handleDrag = (id: string, newPosition: { x: number; y: number }) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === id 
          ? { ...node, position: newPosition } 
          : node
      )
    );
  };
  
  // Convert screen coordinates to percentage position
  const positionToPercentage = (x: number, y: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const container = containerRef.current.getBoundingClientRect();
    const percentX = ((x - container.left) / container.width) * 100;
    const percentY = ((y - container.top) / container.height) * 100;
    
    return {
      x: Math.max(5, Math.min(95, percentX)),
      y: Math.max(5, Math.min(95, percentY))
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[450px] bg-black rounded-lg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
      
      {/* Instructions */}
      <div className="absolute top-2 left-2 text-xs text-gray-300 bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm z-20">
        Click for details • Drag to customize
      </div>
      
      {/* Category labels */}
      <div className="absolute top-2 right-2 text-xs text-gray-300 bg-black/80 px-2 py-1 rounded-md backdrop-blur-sm z-20 flex flex-col items-end">
        <div className="flex items-center space-x-2 mb-1">
          <span>DevOps</span>
          <div className="w-3 h-3 rounded-full bg-[#F05032]"></div>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Languages</span>
          <div className="w-3 h-3 rounded-full bg-[#3178C6]"></div>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Frontend</span>
          <div className="w-3 h-3 rounded-full bg-[#61DAFB]"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span>Backend</span>
          <div className="w-3 h-3 rounded-full bg-[#539E43]"></div>
        </div>
      </div>
      
      {/* Tech nodes */}
      <div className="relative w-full h-full">
        {nodes.map((tech) => (
          <TechBubble 
            key={tech.id}
            id={tech.id}
            name={tech.name}
            color={tech.color}
            icon={tech.icon}
            position={tech.position}
            category={tech.category}
            selected={activeNode === tech.id}
            onSelect={handleSelect}
            onDrag={handleDrag}
            positionToPercentage={positionToPercentage}
            containerRef={containerRef}
            setIsDragging={setIsDragging}
          />
        ))}
        
        {/* Info panel for selected node - positioned outside the bubbles */}
        <AnimatePresence>
          {activeNode && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute rounded-lg p-2 bg-black/90 backdrop-blur-md text-white z-30 w-[200px] pointer-events-none"
              style={{ 
                left: `${nodes.find(n => n.id === activeNode)?.position.x}%`,
                top: `calc(${nodes.find(n => n.id === activeNode)?.position.y}% + 40px)`, 
                transform: 'translateX(-50%)',
                boxShadow: `0 0 20px ${nodes.find(n => n.id === activeNode)?.color}` 
              }}
            >
              <div className="text-center">
                <h3 className="font-medium text-sm">{nodes.find(n => n.id === activeNode)?.name}</h3>
                <p className="text-xs opacity-80 mt-1">{nodes.find(n => n.id === activeNode)?.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface TechBubbleProps {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  position: {
    x: number;
    y: number;
  };
  category: string;
  selected?: boolean;
  onSelect: (id: string) => void;
  onDrag: (id: string, newPosition: { x: number; y: number }) => void;
  positionToPercentage: (x: number, y: number) => { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  setIsDragging: (isDragging: boolean) => void;
}

function TechBubble({ 
  id, 
  name, 
  color, 
  icon, 
  position, 
  category, 
  selected,
  onSelect,
  onDrag,
  positionToPercentage,
  containerRef,
  setIsDragging
}: TechBubbleProps) {
  // Determine size based on category - make devops (Git) larger
  const size = category === 'devops' ? 'lg' : (category === 'frontend' || category === 'backend' ? 'md' : 'sm');
  
  // Set properties based on tech - more solid background colors
  const isDark = name === 'Next.js';
  const bg = isDark ? '#000000' : `${color}80`; // Much more solid background (80% opacity)
  const textColor = isDark ? '#ffffff' : color;
  
  // Handle drag with precise positioning
  const handleDragMove = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (!containerRef.current) return;
    
    // Get pointer position
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as MouseEvent).clientX;
      clientY = (event as MouseEvent).clientY;
    }
    
    // Calculate percentage position
    const newPosition = positionToPercentage(clientX, clientY);
    onDrag(id, newPosition);
  };
  
  return (
    <motion.div
      className="absolute flex flex-col items-center z-10 cursor-grab active:cursor-grabbing"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        zIndex: selected ? 20 : 10
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: Math.random() * 0.3
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onClick={() => onSelect(id)}
      onDrag={handleDragMove}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ 
        scale: 1.1, 
        zIndex: 30,
      }}
    >
      <motion.div 
        className={`flex items-center justify-center rounded-full shadow-lg ${
          size === 'lg' ? 'w-20 h-20 md:w-24 md:h-24' :
          size === 'md' ? 'w-16 h-16 md:w-20 md:h-20' : 
          'w-14 h-14 md:w-16 md:h-16'
        }`}
        style={{ 
          backgroundColor: selected ? `${color}90` : bg, // Full opacity when selected (90% opacity)
          boxShadow: selected 
            ? `0 0 20px ${isDark ? 'rgba(255,255,255,0.7)' : `${color}`}`
            : `0 0 15px ${isDark ? 'rgba(255,255,255,0.4)' : `${color}80`}`
        }}
        whileHover={{ 
          scale: 1.15,
          backgroundColor: isDark ? '#000000' : `${color}95`, // Almost full opacity on hover (95% opacity)
          boxShadow: `0 0 20px ${isDark ? 'rgba(255,255,255,0.6)' : `${color}`}`
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 10
        }}
        animate={selected ? {
          scale: 1.1,
          boxShadow: `0 0 20px ${isDark ? 'rgba(255,255,255,0.7)' : `${color}`}`
        } : {
          scale: 1
        }}
      >
        <div 
          className={`flex items-center justify-center ${
            size === 'lg' ? 'w-16 h-16 md:w-20 md:h-20' :
            size === 'md' ? 'w-12 h-12 md:w-16 md:h-16' : 
            'w-10 h-10 md:w-12 md:h-12'
          }`}
          style={{ color: textColor }}
        >
          {icon}
        </div>
      </motion.div>
      <motion.span 
        className="mt-2 text-xs md:text-sm font-medium bg-background/70 text-white px-2 py-1 rounded-full"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
} 