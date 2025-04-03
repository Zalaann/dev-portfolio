"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define section types
type SectionType = "home" | "about" | "skills-showcase" | "projects" | "experience" | "education" | "contact";

// Section context props
interface SectionContextProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

// Create context with default values
const SectionContext = createContext<SectionContextProps>({
  activeSection: "home",
  setActiveSection: () => {},
});

// Custom hook to easily use section context
export const useSection = () => useContext(SectionContext);

// Section provider component
export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionType>("home");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      // Active section detection based on viewport position
      const sections: SectionType[] = ["home", "about", "skills-showcase", "projects", "experience", "education", "contact"];
      const sectionPositions = sections.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, visible: false };
        const rect = element.getBoundingClientRect();
        // Calculate how much of the section is visible as a percentage of its height
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibility = Math.max(0, visibleHeight) / window.innerHeight;
        return {
          id,
          visible: visibility > 0.3 // Section is considered visible if more than 30% is in viewport
        };
      });

      // Find the section with the most visibility
      const visibleSections = sectionPositions.filter(section => section.visible);
      if (visibleSections.length) {
        // If we're near the top of the page, prioritize the home section
        if (window.scrollY < 100 && sectionPositions[0].visible) {
          setActiveSection("home");
        } else {
          setActiveSection(visibleSections[0].id as SectionType);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Return empty div until client-side hydration
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
} 