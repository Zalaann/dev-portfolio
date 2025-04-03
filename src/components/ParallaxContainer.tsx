"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  backgroundElements?: ReactNode;
  id?: string;
}

export default function ParallaxContainer({
  children,
  className = "",
  backgroundElements,
  id,
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  
  return (
    <section 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      id={id}
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          y: backgroundY,
          opacity 
        }}
      >
        {backgroundElements || (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl -top-64 -left-32 dark:bg-primary/3"></div>
            <div className="absolute w-[500px] h-[500px] bg-secondary/2 rounded-full blur-3xl bottom-0 right-0 dark:bg-secondary/3"></div>
          </div>
        )}
      </motion.div>
      
      {/* Parallax content */}
      <motion.div 
        className="relative z-10"
        style={{ y: contentY }}
      >
        {children}
      </motion.div>
    </section>
  );
} 