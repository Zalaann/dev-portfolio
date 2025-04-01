"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ThemeSelector from "@/components/ThemeSelector";
import NetflixPortfolio from "@/components/netflix/NetflixPortfolio";
import Image from "next/image";

// Lazy load sections to improve initial load time
const AboutSection = lazy(() => import("@/components/AboutSection"));
// @ts-ignore - TypeScript can't find these modules but they exist
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
// @ts-ignore - TypeScript can't find these modules but they exist
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
// @ts-ignore - TypeScript can't find these modules but they exist
const EducationSection = lazy(() => import("@/components/EducationSection"));
// @ts-ignore - TypeScript can't find these modules but they exist
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Simple loading fallback for lazy-loaded components
const SectionLoading = () => (
  <div className="h-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

// Image preloader component (hidden from view)
const ImagePreloader = ({ urls }: { urls: string[] }) => (
  <div className="hidden">
    {urls.map((url, index) => (
      <Image 
        key={index}
        src={url}
        alt="Preload"
        width={1}
        height={1}
        priority
      />
    ))}
  </div>
);

export default function Home() {
  const { theme, hasSelectedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [componentsPreloaded, setComponentsPreloaded] = useState(false);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);

  // List of images and critical assets to preload
  const criticalAssets = [
    '/profile.jpg',
    // Add other critical images/assets here
  ];

  // Preload static assets manually
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Create an array of promises for preloading images
        const imagePromises = criticalAssets.map(url => {
          return new Promise<string>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
              console.warn(`Failed to preload: ${url}`);
              resolve(url); // Resolve anyway to not block other assets
            };
            img.src = url;
          });
        });

        // Preload other assets if needed (fonts, JSON, etc)
        const otherAssetPromises: Promise<any>[] = [
          // Add any fetch calls for other assets here if needed
        ];

        // Wait for all preloading to complete
        await Promise.all([...imagePromises, ...otherAssetPromises]);
        setAssetsPreloaded(true);
        console.log("All assets preloaded successfully");
      } catch (error) {
        console.error("Error preloading assets:", error);
        setAssetsPreloaded(true); // Set to true anyway to not block loading
      }
    };

    preloadAssets();
  }, []);

  // Preload components in background
  useEffect(() => {
    const preloadComponents = async () => {
      try {
        // Start loading all components in parallel
        // Use dynamic imports with type assertion to avoid TypeScript errors
        const imports = [
          import("@/components/AboutSection"),
          // @ts-ignore - TypeScript can't find these modules but they exist
          import("@/components/ProjectsSection"),
          // @ts-ignore - TypeScript can't find these modules but they exist
          import("@/components/ExperienceSection"),
          // @ts-ignore - TypeScript can't find these modules but they exist
          import("@/components/EducationSection"),
          // @ts-ignore - TypeScript can't find these modules but they exist
          import("@/components/ContactSection")
        ];
        
        // Wait for all imports to resolve
        await Promise.all(imports);
        setComponentsPreloaded(true);
        console.log("All components preloaded successfully");
      } catch (error) {
        console.error("Error preloading components:", error);
      }
    };

    preloadComponents();
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Reset scroll position to top when component mounts
    window.scrollTo(0, 0);

    // Calculate appropriate loading time - shorter durations for a faster experience
    const baseLoadTime = prefersReducedMotion ? 800 : 1500;
    
    // Remove loading screen after animation completes or components are loaded
    const timer = setTimeout(() => {
      // Only finish loading if components and assets are preloaded or we've waited the max time
      if ((componentsPreloaded && assetsPreloaded) || baseLoadTime >= 2000) {
        setIsLoading(false);
        // Re-enable scrolling after loading
        document.body.style.overflow = 'auto';
      } else {
        // If components/assets aren't loaded yet but animation is done, wait a bit more
        const additionalWait = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
        }, 500); // Wait up to 0.5 more second for components/assets
        
        return () => clearTimeout(additionalWait);
      }
    }, baseLoadTime);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [prefersReducedMotion, componentsPreloaded, assetsPreloaded]);

  // Return loading screen while loading
  if (isLoading) {
    return (
      <>
        <LoadingScreen />
        <ImagePreloader urls={criticalAssets} />
      </>
    );
  }

  // Bypass theme selection completely
  // if (!hasSelectedTheme) {
  //   return <ThemeSelector />;
  // }

  // Temporarily disabled Netflix theme
  // if (theme === "netflix") {
  //   return <NetflixPortfolio />;
  // }

  // Always render the default portfolio
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      
      <HeroSection />
      
      <Suspense fallback={<SectionLoading />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <EducationSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
