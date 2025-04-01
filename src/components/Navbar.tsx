"use client";

import { useState, useEffect } from "react";
import { Home, User, Code, Briefcase, GraduationCap, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "experience", "education", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
          <div className="flex items-center justify-center px-6 py-2.5">
            <div className="flex items-center justify-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 group"
                >
                  {item.name}
                  <span className="absolute bottom-1.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="mx-auto max-w-fit bg-background/80 backdrop-blur-xl shadow-lg border border-border/50 rounded-full px-4 py-2">
          <div className="flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative p-3 rounded-full transition-all duration-300 group ${
                  activeSection === item.name.toLowerCase()
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {activeSection === item.name.toLowerCase() && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
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