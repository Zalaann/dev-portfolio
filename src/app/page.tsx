"use client";
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import { SiteTimer } from '@/components/SiteTimer';
import ScrollProgressTracker from '@/components/ScrollProgressTracker';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InteractiveShowcase from '@/components/InteractiveShowcase';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return Math.min(prev + Math.random() * 12, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <>
      <Navbar />
      <SiteTimer />
      <ScrollProgressTracker />
      <main className="flex min-h-screen flex-col items-center justify-between relative">
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
  );
}
