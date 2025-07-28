"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTailwindcss, SiSupabase, SiTypescript, SiPython, SiTensorflow, SiMongodb } from 'react-icons/si';
import { FaAws, FaMobileAlt } from 'react-icons/fa';
import { BsRobot } from 'react-icons/bs';
import { Sparkles } from 'lucide-react';
import { MatrixText } from '@/components/MatrixText';

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
    color: '#ffffff',
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
        style={{ opacity, willChange: 'transform, opacity' }}
      >
        <motion.div 
          style={{ y, willChange: 'transform, opacity' }} 
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/1 to-secondary/1 blur-3xl -top-1/4 -right-1/4 dark:from-primary/2 dark:to-secondary/2"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]), willChange: 'transform, opacity' }} 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/1 to-primary/1 blur-3xl -bottom-1/4 -left-1/4 dark:from-secondary/2 dark:to-primary/2"
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center font-mono text-[#00ff00] text-sm"
          >
            <Sparkles className="w-4 h-4 text-[#00ff00] mr-1" />
            This is the tech stack I use for most of the projects
          </motion.p>
        </motion.div>
        
        {/* Skills Constellation */}
        <SkillsConstellation />
      </div>
    </section>
  );
}

// Skills Constellation Component
function SkillsConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Define relationships between skills
  const relationships: Record<string, string[]> = {
    'React': ['TypeScript', 'Next.js', 'Tailwind CSS'],
    'Next.js': ['React', 'TypeScript', 'MongoDB', 'Supabase'],
    'Tailwind CSS': ['React', 'Next.js'],
    'TypeScript': ['React', 'Next.js', 'MongoDB', 'Supabase'],
    'MongoDB': ['Next.js', 'Supabase', 'TypeScript'],
    'Supabase': ['Next.js', 'MongoDB', 'TypeScript'],
    'Python': ['TensorFlow', 'AI/ML'],
    'TensorFlow': ['Python', 'AI/ML'],
    'AI/ML': ['Python', 'TensorFlow'],
    'AWS': ['MongoDB', 'Supabase', 'Mobile Dev'],
    'Mobile Dev': ['React', 'AWS']
  };

  // Empty function for skill click - maintaining function but removing functionality
  const handleSkillClick = (skill: Skill) => {
    // No functionality - clicking does nothing now
  };

  // Get position for a skill
  const getPosition = (name: string): { x: number, y: number } => {
    const isMobile = containerSize.width < 768;
    
    const positions: Record<string, {x: number, y: number}> = isMobile ? {
      // Mobile positions
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
    } : {
      // Desktop positions
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
    
    // Adjust for center position
    return {
      x: positions[name]?.x || 0,
      y: positions[name]?.y || 0
    };
  };

  // Transform relative position to absolute
  const getAbsolutePosition = (pos: { x: number, y: number }) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const center = {
      x: containerSize.width / 2,
      y: containerSize.height / 2
    };
    
    return {
      x: center.x + pos.x,
      y: center.y + pos.y
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative h-[550px] w-full mt-2 overflow-visible"
        ref={containerRef}
        style={{ maxWidth: '100%' }}
      >
        {/* Skill Nodes */}
        {skills.map((skill) => {
          const position = getPosition(skill.name);
          const isActive = hoveredSkill === skill.name || 
                         relationships[hoveredSkill || '']?.includes(skill.name);
          
          return (
            <motion.div
              key={skill.name}
              className="absolute rounded-lg cursor-pointer shadow-md transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                backgroundColor: `${skill.color}${isActive ? '30' : '20'}`, 
                border: `2px solid ${skill.color}${isActive ? '' : '80'}`,
                backdropFilter: "blur(4px)",
                left: '50%',
                top: '50%',
                zIndex: 1,
                boxShadow: isActive ? `0 0 20px ${skill.color}40` : 'none',
                willChange: 'transform, opacity'
              }}
              initial={{ x: position.x, y: position.y, scale: 0 }}
              animate={{ 
                x: position.x, 
                y: position.y,
                scale: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: 0.1 * skills.indexOf(skill) 
                }
              }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => {
                setHoveredSkill(skill.name);
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => handleSkillClick(skill)}
            >
              <div className="flex items-center space-x-2 p-3">
                <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                <span className="font-medium text-sm">{skill.name}</span>
              </div>
              
              {/* Pulsing effect for active nodes */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: skill.color, willChange: 'transform, opacity' }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 