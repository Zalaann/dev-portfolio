"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";

// Theme option interface
interface ThemeOption {
  id: ThemeType;
  name: string;
  description: string;
  previewImage: string;
  gradientColors: string;
}

// Available theme options
const themeOptions: ThemeOption[] = [
  {
    id: "default",
    name: "Standard Portfolio",
    description: "A clean, modern portfolio with smooth animations and a professional look.",
    previewImage: "/theme-previews/default-theme.jpg",
    gradientColors: "from-primary/20 to-secondary/20",
  },
  // Netflix theme temporarily hidden
  // {
  //   id: "netflix",
  //   name: "Netflix Experience",
  //   description: "Inspired by Sumanth Samala's design, a bold and immersive streaming platform aesthetic.",
  //   previewImage: "/theme-previews/netflix-theme.jpg",
  //   gradientColors: "from-red-600/20 to-red-900/20",
  // },
];

export default function ThemeSelector() {
  const { setTheme, setHasSelectedTheme } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);

  // Handle theme selection
  const handleSelectTheme = (themeId: ThemeType) => {
    setSelectedTheme(themeId);
    
    // Animate selection before applying theme
    setTimeout(() => {
      setTheme(themeId);
      setHasSelectedTheme(true);
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Logo & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            MIT Portfolio
          </span>
        </h1>
        <p className="text-muted-foreground">Choose your viewing experience</p>
      </motion.div>

      {/* Theme Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl px-4">
        {themeOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-lg overflow-hidden border border-border/50 transition-all duration-300 
              ${hoveredTheme === option.id ? 'scale-[1.02] shadow-xl z-10' : 'scale-100'} 
              ${selectedTheme === option.id ? 'scale-[1.05] shadow-2xl border-primary' : ''}
              ${selectedTheme && selectedTheme !== option.id ? 'opacity-50 scale-95' : ''}
            `}
            onMouseEnter={() => setHoveredTheme(option.id)}
            onMouseLeave={() => setHoveredTheme(null)}
            onClick={() => handleSelectTheme(option.id)}
          >
            {/* Theme Preview Image */}
            <div className="relative h-52 w-full bg-muted overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradientColors} opacity-50`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Standard portfolio preview - Netflix option removed */}
                <svg width="240" height="135" viewBox="0 0 240 135" className="opacity-80">
                  <rect width="240" height="135" fill="#f8f9fa" />
                  <rect x="20" y="10" width="200" height="10" rx="2" fill="#4361ee" opacity="0.8" />
                  <rect x="20" y="30" width="120" height="40" rx="2" fill="#4361ee" opacity="0.3" />
                  <rect x="20" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                  <rect x="90" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                  <rect x="160" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                </svg>
              </div>
              
              {/* Selection Overlay */}
              {selectedTheme === option.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            {/* Theme Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </div>
            
            {/* Select button for default option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredTheme === option.id ? 1 : 0 }}
              className="absolute bottom-4 right-4"
            >
              <div className="bg-primary text-white rounded-md px-4 py-1.5 flex items-center space-x-1.5 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>SELECT</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-sm text-muted-foreground px-4"
      >
        You can change your preference later using the theme toggle in the navbar.
      </motion.p>
    </div>
  );
} 