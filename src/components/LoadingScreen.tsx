"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

interface LoadingScreenProps {
  progress: number;
}

// Import the ParticleBackground component with no SSR to avoid hydration issues
const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  // Track if we're running on a device that might struggle with animations
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  useEffect(() => {
    // Check for potential low-power devices based on user agent or hardware concurrency
    const checkDeviceCapability = () => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasLimitedCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
      setIsLowPowerDevice(isMobile || hasLimitedCores);
    };
    
    checkDeviceCapability();
  }, []);

  // Use simplified animations for low-power devices
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: isLowPowerDevice ? 1 : 1.5, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const innerCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.05 }
    }
  };

  // Electron pulse animation
  const electronPulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  // Random orbit path for more dynamic, quantum-like movement
  const generateOrbitalPath = () => {
    return {
      // Create a random path with slight variations for more quantum-like movement
      x: [0, 3, -5, 2, 0],
      y: [0, -4, 2, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }
    };
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white will-change-auto"
    >
      {/* Particle background positioned at the base layer */}
      <ParticleBackground density={60} interactive={false} />
      <div className="relative transform-gpu">
        {/* Logo/Text Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 text-4xl font-bold will-change-transform"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            MIT
          </span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-200/10 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-18 left-1/2 -translate-x-1/2 text-xs text-muted-foreground mt-2"
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </motion.div>
  );
} 