"use client";

import { useState, useEffect } from "react";
import { Home, User, Code, Briefcase, GraduationCap, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // More precise active section detection based on viewport position
      const sections = ["home", "about", "projects", "experience", "education", "contact"];
      const sectionPositions = sections.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0, visible: false };
        const rect = element.getBoundingClientRect();
        // Calculate how much of the section is visible as a percentage of its height
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibility = Math.max(0, visibleHeight) / window.innerHeight;
        return {
          id,
          top: rect.top,
          bottom: rect.bottom,
          visible: visibility > 0.3 // Section is considered visible if more than 30% is in viewport
        };
      });

      // Find the section with the most visibility
      const visibleSections = sectionPositions.filter(section => section.visible);
      if (visibleSections.length) {
        // If we're near the top of the page, prioritize the home section
        if (window.scrollY < 100 && sectionPositions[0].top < 100) {
          setActiveSection("home");
        } else {
          // Sort by position (top to bottom)
          const topSection = visibleSections.sort((a, b) => a.top - b.top)[0];
          setActiveSection(topSection.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:block hidden">
        <nav
          className={`mx-auto max-w-fit transition-all duration-500 ${
            isScrolled
              ? "bg-background/60 backdrop-blur-xl shadow-lg border border-border/50 rounded-full"
              : "bg-transparent rounded-full"
          }`}
        >
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 relative ${
                  activeSection === item.name.toLowerCase()
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                <AnimatePresence>
                  {activeSection === item.name.toLowerCase() && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute bottom-0.5 inset-x-0 flex justify-center items-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="mx-auto max-w-fit bg-background/80 backdrop-blur-xl shadow-lg border border-border/50 rounded-full px-2 py-2">
          <div className="flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative p-2.5 rounded-full transition-all duration-300 group flex items-center justify-center ${
                  activeSection === item.name.toLowerCase()
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {activeSection === item.name.toLowerCase() && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute -bottom-1 inset-x-0 flex justify-center items-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
} 