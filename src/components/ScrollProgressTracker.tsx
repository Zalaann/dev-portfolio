"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollProgressTrackerProps {
  hideOnTop?: boolean;
}

export default function ScrollProgressTracker({ hideOnTop = true }: ScrollProgressTrackerProps) {
  const [isVisible, setIsVisible] = useState(!hideOnTop);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Create particles based on scroll progress
  const particleCount = 10;
  const [particles, setParticles] = useState<number[]>(Array(particleCount).fill(0));
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      if (hideOnTop) {
        setIsVisible(value > 0.01);
      }
      
      // Update particles when scroll progress changes
      setParticles(prev => 
        prev.map((_, i) => 
          Math.random() > 0.7 ? Math.random() : prev[i]
        )
      );
    });

    // Track active section for navigation dot
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300; // Adjust offset as needed
      
      // Find the current section
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYProgress, hideOnTop]);

  // Map each particle's horizontal position to the scroll progress
  const particlePositions = particles.map((_, i) => 
    useTransform(scrollYProgress, [0, 1], [`${i * (100 / particleCount)}%`, `${100}%`])
  );

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-1 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div 
        className="h-full bg-gradient-to-r from-primary/50 via-primary to-secondary"
        style={{ scaleX, transformOrigin: "0%", willChange: 'transform, opacity' }}
      />
      
      {/* Particles that follow scroll progress */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-2 h-2 rounded-full bg-white shadow-glow"
          style={{ 
            left: particlePositions[i],
            opacity: Math.random() * 0.7 + 0.3,
            y: Math.random() * -10,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [Math.random() * -5, Math.random() * -15, Math.random() * -5],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Glow effect that follows the progress */}
      <motion.div
        className="absolute top-0 h-6 w-12 blur-md rounded-full bg-primary/30"
        style={{ 
          left: useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 48px)"]),
          y: -2,
          willChange: 'transform, opacity'
        }}
      />

      {/* Send activeSection value to Navbar */}
      <UpdateNavDot activeSection={activeSection} />
    </motion.div>
  );
}

// Component to update navbar dot position
function UpdateNavDot({ activeSection }: { activeSection: string }) {
  useEffect(() => {
    if (!activeSection) return;
    
    // Find all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Find the dot for each link and hide it
      const dot = link.querySelector('.nav-dot');
      if (dot) {
        (dot as HTMLElement).style.opacity = '0';
        (dot as HTMLElement).style.transform = 'scale(0)';
      }
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      
      // Show the dot for active link
      const activeDot = activeLink.querySelector('.nav-dot');
      if (activeDot) {
        (activeDot as HTMLElement).style.opacity = '1';
        (activeDot as HTMLElement).style.transform = 'scale(1)';
      }
    }
  }, [activeSection]);
  
  return null;
} 