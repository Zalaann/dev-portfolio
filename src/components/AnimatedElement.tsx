"use client";

import { useRef, useEffect } from "react";

// Instead of using anime.js, use framer-motion which has better TypeScript support
import { motion, Variants } from "framer-motion";

interface AnimationProps {
  duration?: number;
  delay?: number;
  ease?: string;
  x?: number[] | number;
  y?: number[] | number;
  scale?: number[] | number;
  rotate?: number[] | number;
  opacity?: number[] | number;
  [key: string]: any;
}

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: AnimationProps;
  className?: string;
}

interface MotionProps {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: {
    duration: number;
    delay: number;
    ease: string;
  };
}

export function AnimatedElement({ children, animation, className = "" }: AnimatedElementProps) {
  // Convert anime.js style props to framer-motion props
  const getFramerProps = (): MotionProps => {
    const { duration, delay, ease, x, y, scale, opacity, rotate, ...rest } = animation;
    
    // Create framer-motion compatible props
    const initial: Record<string, any> = {};
    const animate: Record<string, any> = {};
    
    // Handle array values (from -> to)
    if (Array.isArray(x)) {
      initial.x = x[0];
      animate.x = x[1];
    } else if (x !== undefined) {
      animate.x = x;
    }
    
    if (Array.isArray(y)) {
      initial.y = y[0];
      animate.y = y[1];
    } else if (y !== undefined) {
      animate.y = y;
    }
    
    if (Array.isArray(scale)) {
      initial.scale = scale[0];
      animate.scale = scale[1];
    } else if (scale !== undefined) {
      animate.scale = scale;
    }
    
    if (Array.isArray(opacity)) {
      initial.opacity = opacity[0];
      animate.opacity = opacity[1];
    } else if (opacity !== undefined) {
      animate.opacity = opacity;
    }
    
    if (Array.isArray(rotate)) {
      initial.rotate = rotate[0];
      animate.rotate = rotate[1];
    } else if (rotate !== undefined) {
      animate.rotate = rotate;
    }
    
    // Create transition object
    const transition = {
      duration: duration ? duration / 1000 : 0.5, // Convert from ms to seconds
      delay: delay ? delay / 1000 : 0,
      ease: ease || "easeOut"
    };
    
    return { initial, animate, transition };
  };
  
  const { initial, animate, transition } = getFramerProps();
  
  return (
    <motion.div 
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
} 