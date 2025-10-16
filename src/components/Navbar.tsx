"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, GraduationCap, Mail, Sparkles, Clock, Zap, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { MatrixText } from './MatrixText';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

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

  // Mobile nav items (a subset for mobile for better spacing)
  const mobileNavItems = [
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
    }, 0); // Appear immediately after loading screen

    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Calculate scroll percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPercent(scrolled);

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
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 120; // 120px offset for navbar
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/certificates/Muhammad Ibrahim Tariq  CV.pdf';
    link.download = 'Muhammad_Ibrahim_Tariq_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Desktop Navigation (Top) */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-40 transition-all duration-300 hidden md:flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          {/* Main Navigation */}
          <motion.div 
            className="bg-background/80 backdrop-blur-md shadow-lg rounded-full px-2 py-1.5 border border-border/20"
          >
            <div className="flex items-center space-x-0.5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link group px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center space-x-1.5 relative text-sm ${
                    activeSection === item.href.substring(1)
                      ? "text-background bg-foreground"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`}
                  onClick={(e) => handleNavClick(e, item.href.substring(1))}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="ml-1">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>

          {/* Download CV Button - Separate */}
          <motion.button
            onClick={handleDownloadCV}
            className="nav-link group px-3 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center space-x-1.5 relative text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 bg-background/80 backdrop-blur-md shadow-lg border border-border/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation (Bottom) with Session Info behind */}
      <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden flex flex-col items-center">
        {/* Session Timer (behind) */}
        <motion.div
          className="absolute -top-6 bg-background/60 backdrop-blur-md rounded-full border border-border/10 px-3 py-0.5 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isVisible ? 0 : 20, 
            opacity: isVisible ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex items-center gap-1 font-mono text-[10px]"
              animate={{
                textShadow: [
                  "0 0 3px rgba(0, 255, 0, 0.5)",
                  "0 0 5px rgba(0, 255, 0, 0.8)",
                  "0 0 3px rgba(0, 255, 0, 0.5)"
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Clock className="w-2.5 h-2.5 text-[#00ff00]" />
              <MatrixText text={formatTime(timeSpent)} scrambleSpeed={30} />
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-1 text-[10px]"
            >
              <Zap className="w-2.5 h-2.5 text-yellow-500" />
              <span>{Math.round(scrollPercent)}%</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Compact Navigation */}
        <motion.div
          className="bg-background/80 backdrop-blur-md shadow-lg rounded-full border border-border/20 px-1.5 py-1"
          style={{ maxWidth: "90%" }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: isVisible ? 0 : 100, 
            opacity: isVisible ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between space-x-0.5">
            {mobileNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center px-1 py-0.5 rounded-full transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "text-background bg-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[8px] mt-0.5 font-medium">{item.name}</span>
              </a>
            ))}
            <button
              onClick={handleDownloadCV}
              className="flex flex-col items-center justify-center px-1 py-0.5 rounded-full transition-all duration-300 text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            >
              <Download className="w-4 h-4" />
              <span className="text-[8px] mt-0.5 font-medium">CV</span>
            </button>
            <div className="flex flex-col items-center justify-center px-1 py-0.5">
              <div className="scale-90">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 