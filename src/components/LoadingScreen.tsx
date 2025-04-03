"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number;
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background will-change-auto"
    >
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

        {/* Circular Animation - orbital rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            className="w-32 h-32 rounded-full border-2 border-primary/20 will-change-transform"
          />
          <motion.div
            variants={innerCircleVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-secondary/20 will-change-transform"
          />
        </div>

        {isLowPowerDevice ? (
          // Simple animation for low-power devices
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          >
            <motion.div 
              animate={{
                rotate: 360,
                x: [0, 5, -5, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2"
            >
              <motion.div
                variants={electronPulse}
                initial="initial"
                animate="animate"
                className="w-2 h-2 rounded-full bg-primary"
              />
            </motion.div>
            <motion.div 
              animate={{
                rotate: 360,
                x: [0, -5, 5, 0],
                y: [0, 5, -5, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
              <motion.div
                variants={electronPulse}
                initial="initial"
                animate="animate"
                className="w-2 h-2 rounded-full bg-secondary"
              />
            </motion.div>
          </motion.div>
        ) : (
          // Full atom-like animation for powerful devices
          <>
            {/* Electron Orbit 1 - horizontal with quantum motion */}
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 will-change-transform"
            >
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                animate={generateOrbitalPath()}
              >
                <motion.div
                  variants={electronPulse}
                  initial="initial"
                  animate="animate"
                  className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(var(--primary),0.5)]"
                />
              </motion.div>
            </motion.div>

            {/* Electron Orbit 2 - vertical with quantum motion */}
            <motion.div
              animate={{ rotateX: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 will-change-transform"
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                animate={generateOrbitalPath()}
              >
                <motion.div
                  variants={electronPulse}
                  initial="initial"
                  animate="animate"
                  className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_2px_rgba(var(--secondary),0.5)]"
                />
              </motion.div>
            </motion.div>

            {/* Electron Orbit 3 - diagonal with quantum motion */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ transform: "rotateZ(45deg)" }}
            >
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                animate={generateOrbitalPath()}
              >
                <motion.div
                  variants={electronPulse}
                  initial="initial"
                  animate="animate"
                  className="w-2 h-2 rounded-full bg-primary/90 shadow-[0_0_8px_2px_rgba(var(--primary),0.4)]"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
} 