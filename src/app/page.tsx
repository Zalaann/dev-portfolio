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
import { SectionProvider } from "@/components/SectionContext";

export default function Home() {
  const { theme, hasSelectedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Function to preload an image
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  // Function to preload critical images or assets
  const preloadCriticalAssets = async () => {
    try {
      // Add your critical images here
      await Promise.all([
        preloadImage('/images/avatar.png'),
        preloadImage('/images/hero-bg.jpg'),
        // Add more images as needed
      ]);
    } catch (error) {
      console.error('Failed to preload some assets:', error);
    }
  };

  // Simulate loading progress
  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Move quickly to 70%, then slow down for the last 30%
      const increment = currentProgress < 70 ? 10 : 3;
      currentProgress = Math.min(currentProgress + increment, 99);
      setProgress(currentProgress);
      
      if (currentProgress >= 99) {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const startLoading = async () => {
      // Start simulating progress
      const cleanupProgress = simulateProgress();
      
      // Start preloading critical assets
      await preloadCriticalAssets();
      
      // Set a minimum loading time for visual pleasure (2 seconds)
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
        }, 500); // Allow progress to show 100% briefly
      }, 2000);
      
      return cleanupProgress;
    };
    
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      startLoading();
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <SectionProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" progress={progress} />
        ) : (
          <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between">
              <HeroSection />
              <AboutSection />
              <InteractiveShowcase />
              <ProjectsSection />
              <ExperienceSection />
              <EducationSection />
              <ContactSection />
              <Footer />
    </main>
          </>
        )}
      </AnimatePresence>
    </SectionProvider>
  );
}
