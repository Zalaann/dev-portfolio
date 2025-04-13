"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, GraduationCap, Mail, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // Delay appearance to let loading screen finish

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Determine which section is in view
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";
        
        // Calculate visibility percentage of section in viewport
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const viewportBottom = scrollPosition + windowHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calculate percentage of section visible in viewport
        const visibleHeight = Math.min(viewportBottom, sectionBottom) - Math.max(scrollPosition, sectionTop);
        const visiblePercentage = visibleHeight > 0 ? visibleHeight / sectionHeight : 0;
        
        if (visiblePercentage > 0.3) { // If more than 30% visible
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call initially to set the active section

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`nav-link group px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 relative ${
                  activeSection === item.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                }`}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                <AnimatePresence>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="nav-dot absolute bottom-0.5 inset-x-0 flex justify-center items-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </a>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              className="ml-2 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-full">
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`relative p-3 rounded-full transition-all duration-300 group flex items-center justify-center ${
                      activeSection === item.href.substring(1)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/60 hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href.substring(1))}
                  >
                    <item.icon className="w-5 h-5" />
                    <AnimatePresence>
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="nav-dot absolute -bottom-1 inset-x-0 flex justify-center items-center"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 