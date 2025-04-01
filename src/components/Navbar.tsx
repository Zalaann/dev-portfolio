"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <nav
        className={`mx-auto max-w-fit transition-all duration-500 ${
          isScrolled
            ? "bg-background/60 backdrop-blur-xl shadow-lg border border-border/50 rounded-full"
            : "bg-transparent rounded-full"
        }`}
      >
        <div className="flex items-center justify-center px-6 py-2.5 relative">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            <a
              href="#home"
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 group"
            >
              Home
              <span className="absolute bottom-1.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
            {["About", "Projects", "Experience", "Education", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 group"
              >
                {item}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Positioned Absolutely */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-primary/5 transition-colors duration-300 absolute right-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-4 pb-4"
            >
              <div className="flex flex-col space-y-1">
                <a
                  href="#home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 text-center"
                >
                  Home
                </a>
                {["About", "Projects", "Experience", "Education", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 text-center"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
} 