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
import { useState, useEffect } from "react";

export default function Home() {
  const { theme, hasSelectedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isLoading && <LoadingScreen />}
      <HeroSection />
      <AboutSection />
      <InteractiveShowcase />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
