"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticContainerProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number; // 0-1 scale, 1 being strongest
  onClick?: () => void;
}

export default function MagneticContainer({
  children,
  className = "",
  magneticStrength = 0.5,
  onClick
}: MagneticContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Reset position when mouse leaves
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Calculate magnetic pull based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate center point
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Normalize by element size and apply strength
    const normalizedX = distanceX / (width / 2) * magneticStrength * 30;
    const normalizedY = distanceY / (height / 2) * magneticStrength * 30;
    
    setPosition({ x: normalizedX, y: normalizedY });
    setIsHovered(true);
  };

  // Handle click with animated press effect
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`magnetic-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      onClick={handleClick}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
} 