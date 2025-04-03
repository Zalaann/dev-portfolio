"use client";

import { useTheme } from "@/contexts/ThemeContext";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ThemeSelector from "@/components/ThemeSelector";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { theme, hasSelectedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Advanced loading simulation with content preloading
  useEffect(() => {
    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      simulateProgress();
      return;
    }

    // Otherwise, wait for the load event
    window.addEventListener('load', simulateProgress);
    
    return () => window.removeEventListener('load', simulateProgress);
  }, []);
  
  const simulateProgress = useCallback(() => {
    let currentProgress = 0;
    const totalDuration = 2000; // 2 seconds total
    const interval = 50; // Update every 50ms
    const totalSteps = totalDuration / interval;
    const increment = 100 / totalSteps;
    
    // Faster initial loading to reach about 70% quickly
    const fastPhase = 0.7; // Fast loading phase target (70%)
    const fastPhaseSteps = totalSteps * 0.4; // Use 40% of the steps for fast phase
    const fastIncrement = fastPhase * 100 / fastPhaseSteps;
    const slowIncrement = (1 - fastPhase) * 100 / (totalSteps - fastPhaseSteps);
    
    const timer = setInterval(() => {
      currentProgress += (currentProgress < fastPhase * 100) ? fastIncrement : slowIncrement;
      
      if (currentProgress >= 100) {
        clearInterval(timer);
        currentProgress = 100;
        setProgress(100);
        
        // Give a small delay after reaching 100% before hiding loading screen
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
        }, 200);
      } else {
        setProgress(currentProgress);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  // Preload any key images or assets
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };
    
    // Preload critical images
    preloadImage('/profile.jpg');
    
    // Additional assets can be preloaded here
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={progress} />}
      </AnimatePresence>
      
      {/* All components are rendered but only become visible when isLoading is false */}
      <div className={isLoading ? 'opacity-0 invisible' : 'opacity-100 visible transition-opacity duration-300'}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <InteractiveShowcase />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
