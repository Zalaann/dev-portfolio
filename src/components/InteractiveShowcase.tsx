"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTailwindcss, SiSupabase, SiTypescript, SiPython, SiTensorflow, SiMongodb } from 'react-icons/si';
import { FaAws, FaMobileAlt } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';

// Types for skills data
interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'mobile' | 'ai';
  description: string;
}

// Define skills with categories and descriptions
const skills: Skill[] = [
  { 
    name: 'React', 
    icon: SiReact, 
    color: '#61DAFB',
    category: 'frontend',
    description: 'Building user interfaces with React - creating reusable components and managing state efficiently'
  },
  { 
    name: 'Next.js', 
    icon: SiNextdotjs, 
    color: '#000000',
    category: 'frontend',
    description: 'Using Next.js for server-side rendering, static site generation, and efficient client-side routing'
  },
  { 
    name: 'Tailwind CSS', 
    icon: SiTailwindcss, 
    color: '#06B6D4',
    category: 'frontend',
    description: 'Applying utility-first CSS with Tailwind for rapid UI development and consistent design systems'
  },
  { 
    name: 'TypeScript', 
    icon: SiTypescript, 
    color: '#3178C6',
    category: 'frontend',
    description: 'Adding type safety to JavaScript for better developer experience and code quality'
  },
  { 
    name: 'MongoDB', 
    icon: SiMongodb, 
    color: '#47A248',
    category: 'database',
    description: 'Working with MongoDB for flexible, schema-less NoSQL database solutions'
  },
  { 
    name: 'Supabase', 
    icon: SiSupabase, 
    color: '#3ECF8E',
    category: 'database',
    description: 'Leveraging Supabase for open-source Firebase alternative with PostgreSQL backend'
  },
  { 
    name: 'Python', 
    icon: SiPython, 
    color: '#3776AB',
    category: 'backend',
    description: 'Using Python for backend development, data analysis, and scripting'
  },
  { 
    name: 'TensorFlow', 
    icon: SiTensorflow, 
    color: '#FF6F00',
    category: 'ai',
    description: 'Implementing machine learning models with TensorFlow for computer vision and NLP'
  },
  { 
    name: 'AI/ML', 
    icon: BsRobot, 
    color: '#00B4D8',
    category: 'ai',
    description: 'Applying AI and machine learning technologies to solve complex problems'
  },
  { 
    name: 'AWS', 
    icon: FaAws, 
    color: '#FF9900',
    category: 'cloud',
    description: 'Deploying and managing applications on Amazon Web Services cloud infrastructure'
  },
  { 
    name: 'Mobile Dev', 
    icon: FaMobileAlt, 
    color: '#A3E635',
    category: 'mobile',
    description: 'Building cross-platform mobile applications with React Native and native technologies'
  },
];

// Group skills by category
const categoryGroups = {
  'frontend': skills.filter(skill => skill.category === 'frontend'),
  'backend': skills.filter(skill => skill.category === 'backend'),
  'database': skills.filter(skill => skill.category === 'database'),
  'cloud': skills.filter(skill => skill.category === 'cloud'),
  'mobile': skills.filter(skill => skill.category === 'mobile'),
  'ai': skills.filter(skill => skill.category === 'ai'),
};

// Draggable Skills Component
function DraggableSkills() {
  const [positions, setPositions] = useState<{[key: string]: {x: number, y: number}}>({});
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Initialize positions by category
  useEffect(() => {
    if (containerWidth === 0) return;
    
    const initialPositions: {[key: string]: {x: number, y: number}} = {};
    
    // Use specific positioning for each skill to prevent overlap
    // Adjust positions based on screen size for better mobile support
    const isMobile = containerWidth < 768;
    
    const skillPositions: Record<string, {x: number, y: number}> = isMobile ? 
    {
      // Mobile positions - more compact layout
      'React': { x: -150, y: -160 },
      'Next.js': { x: 50, y: -160 },
      'Tailwind CSS': { x: -150, y: -80 },
      'TypeScript': { x: 50, y: -80 },
      
      'Python': { x: -150, y: 0 },
      'MongoDB': { x: 50, y: 0 },
      'Supabase': { x: -150, y: 80 },
      'AWS': { x: 50, y: 80 },
      
      'Mobile Dev': { x: -150, y: 160 },
      'TensorFlow': { x: -50, y: 240 },
      'AI/ML': { x: 50, y: 160 }
    } : 
    {
      // Desktop positions - spread out
      'React': { x: -450, y: -100 },
      'Next.js': { x: -200, y: -100 },
      'Tailwind CSS': { x: 0, y: -100 },
      'TypeScript': { x: 250, y: -100 },
      
      'Python': { x: -450, y: 0 },
      'MongoDB': { x: -200, y: 0 },
      'Supabase': { x: 0, y: 0 },
      'AWS': { x: 250, y: 0 },
      
      'Mobile Dev': { x: -350, y: 100 },
      'TensorFlow': { x: -100, y: 100 },
      'AI/ML': { x: 150, y: 100 }
    };
    
    // Apply positions for each skill
    skills.forEach(skill => {
      if (skillPositions[skill.name]) {
        initialPositions[skill.name] = skillPositions[skill.name];
      }
    });
    
    setPositions(initialPositions);
  }, [containerWidth]);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(prev => prev?.name === skill.name ? null : skill);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setSelectedSkill(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative h-[550px] w-full mt-2 overflow-visible"
        ref={containerRef}
        onClick={handleOutsideClick}
        style={{ maxWidth: '100%' }}
      >
        {/* Draggable Skill Items */}
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="absolute rounded-lg cursor-grab active:cursor-grabbing shadow-md transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              backgroundColor: `${skill.color}20`, 
              border: `2px solid ${skill.color}`,
              backdropFilter: "blur(4px)",
              left: '50%',
              top: '50%',
              zIndex: selectedSkill?.name === skill.name ? 10 : 1,
              boxShadow: selectedSkill?.name === skill.name ? `0 0 10px ${skill.color}40` : 'none',
            }}
            initial={{ x: positions[skill.name]?.x || 0, y: positions[skill.name]?.y || 0 }}
            animate={{ 
              x: positions[skill.name]?.x || 0, 
              y: positions[skill.name]?.y || 0,
              scale: selectedSkill?.name === skill.name ? 1.1 : 1
            }}
            drag
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            dragElastic={0.5}
            whileDrag={{ scale: 1.1, zIndex: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.05 }}
            onClick={() => handleSkillClick(skill)}
            onDragEnd={(e, info) => {
              const newX = positions[skill.name]?.x + info.offset.x;
              const newY = positions[skill.name]?.y + info.offset.y;
              
              // Determine bounds based on container width
              const isMobile = containerWidth < 768;
              const maxX = isMobile ? containerWidth/2 - 30 : containerWidth/2 - 50;
              const maxY = isMobile ? 260 : 200;
              
              // Keep within bounds - allow more horizontal space
              const boundedX = Math.max(Math.min(newX, maxX), -maxX);
              const boundedY = Math.max(Math.min(newY, maxY), -maxY);
              
              setPositions(prev => ({
                ...prev,
                [skill.name]: { 
                  x: boundedX,
                  y: boundedY
                }
              }));
            }}
          >
            <div className="flex items-center space-x-2 p-3">
              <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
              <span className="font-medium text-sm">{skill.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Detail Popup - Below the container */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mt-6 mb-4"
          >
            <div className="backdrop-blur-md bg-background/30 border border-white/10 rounded-xl p-5 shadow-xl">
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: `${selectedSkill.color}20` }}
                >
                  <selectedSkill.icon className="w-8 h-8" style={{ color: selectedSkill.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-muted-foreground mt-1">{selectedSkill.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Interactive Showcase component
export default function InteractiveShowcase() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"] 
  });
  
  // Parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  
  return (
    <section id="skills-showcase" className="relative py-4 md:py-6 lg:py-8 overflow-hidden" ref={containerRef}>
      {/* Background Elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ opacity }}
      >
        <motion.div 
          style={{ y }} 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/1 to-secondary/1 blur-3xl -top-1/4 -right-1/4"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]) }} 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/1 to-primary/1 blur-3xl -bottom-1/4 -left-1/4"
        />
      </motion.div>
      
      <div className="w-full max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-1 mb-2"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            My Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Stack
            </span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm">
            Drag the skills around to interact with my tech stack. Click on a skill to see more details about my experience with it.
          </p>
        </motion.div>
        
        {/* Draggable Skills Component */}
        <DraggableSkills />
      </div>
    </section>
  );
} 