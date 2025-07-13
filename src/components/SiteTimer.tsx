"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Timer, Clock, Zap } from 'lucide-react';
import { MatrixText } from './MatrixText';

export function SiteTimer() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [particles, setParticles] = useState<Array<{x: number, size: number, speed: number, delay: number}>>([]);
  
  // Scroll triggered animations
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 100], [0, -5]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setParticles(
      Array(20).fill(0).map(() => ({
        x: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 15 + 5,
        delay: Math.random() * 5
      }))
    );
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed top-20 left-0 right-0 z-40 py-2 overflow-hidden hidden md:flex justify-center"
      style={{ 
        y: translateY,
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <motion.div
        className="bg-background/60 backdrop-blur-md shadow-md rounded-full px-4 py-1.5 border border-border/20"
      >
        <div className="flex items-center justify-between space-x-12">
          <motion.div 
            className="flex items-center gap-2 font-mono text-xs sm:text-sm matrix-text"
            animate={{
              textShadow: [
                "0 0 5px rgba(0, 255, 0, 0.5)",
                "0 0 10px rgba(0, 255, 0, 0.8)",
                "0 0 5px rgba(0, 255, 0, 0.5)"
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff00]" />
            </motion.div>
            <MatrixText text={`Session: ${formatTime(timeSpent)}`} scrambleSpeed={30} />
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-1 text-xs font-medium"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
            </motion.div>
            <span>{Math.round(scrollPercent)}% explored</span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Moving particles (desktop) */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            opacity: 0.4,
          }}
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: particle.speed,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-primary/30"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              boxShadow: [
                "0 0 2px rgba(var(--primary), 0.3)",
                "0 0 4px rgba(var(--primary), 0.6)",
                "0 0 2px rgba(var(--primary), 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
} 