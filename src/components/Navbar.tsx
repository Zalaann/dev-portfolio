"use client";

import { useState, useEffect } from "react";
import { Home, User, Code, Briefcase, GraduationCap, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useSection } from "@/components/SectionContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const { activeSection } = useSection();

  useEffect(() => {
    // Show navbar after a slight delay for a smoother entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Nav items with icons
  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills-showcase", icon: Sparkles },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // If navbar is not yet visible, don't render anything
  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 md:block hidden"
      >
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
                  activeSection === item.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                <AnimatePresence>
                  {activeSection === item.href.substring(1) && (
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
      </motion.header>

      {/* Mobile Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed bottom-6 left-4 right-4 z-[100] pointer-events-auto"
      >
        <div className="mx-auto max-w-fit bg-background/80 backdrop-blur-xl shadow-lg border border-border/50 rounded-full px-2 py-2">
          <div className="flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative p-3 rounded-full transition-all duration-300 group flex items-center justify-center ${
                  activeSection === item.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute -bottom-1 inset-x-0 flex justify-center items-center"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
} 