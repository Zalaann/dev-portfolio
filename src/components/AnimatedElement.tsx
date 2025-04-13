"use client";

import { useEffect, useRef, ReactNode } from 'react';
import * as anime from 'animejs';

interface AnimatedElementProps {
  children: ReactNode;
  animation: {
    targets: string;
    translateY?: [number, number];
    translateX?: [number, number];
    scale?: [number, number];
    opacity?: [number, number];
    duration?: number;
    delay?: number;
    easing?: string;
  };
  className?: string;
}

export default function AnimatedElement({ children, animation, className = '' }: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const anim = anime({
        ...animation,
        targets: elementRef.current,
      });
    }
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
} 