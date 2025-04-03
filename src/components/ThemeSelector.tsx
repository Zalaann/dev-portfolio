"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

// Theme option interface
interface ThemeOption {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

// Available theme options
const themes: ThemeOption[] = [
  {
    id: "dark",
    name: "Professional Portfolio - Dark",
    description: "A sleek, dark themed portfolio with modern design elements.",
    previewImage: "/theme-previews/dark-theme.jpg",
  },
  {
    id: "light",
    name: "Professional Portfolio - Light",
    description: "A clean, light themed portfolio showcasing my work and experience.",
    previewImage: "/theme-previews/light-theme.jpg",
  },
];

export default function ThemeSelector() {
  const { setTheme } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    
    // Animate selection before applying theme
    setTimeout(() => {
      setTheme(themeId as "light" | "dark");
      // Store a flag in localStorage to indicate theme has been selected
      localStorage.setItem("portfolio-theme-selected", "true");
    }, 750);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-muted-foreground text-lg">
            Select a theme to continue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className="relative overflow-hidden rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300 cursor-pointer">
                <div className="aspect-[16/9] relative">
                  {/* Standard portfolio preview */}
                  <svg width="240" height="135" viewBox="0 0 240 135" className="opacity-80">
                    <rect width="240" height="135" fill="#1a1a1a" />
                    <rect x="20" y="10" width="200" height="10" rx="2" fill="#4361ee" opacity="0.8" />
                    <rect x="20" y="30" width="120" height="40" rx="2" fill="#4361ee" opacity="0.3" />
                    <rect x="20" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                    <rect x="90" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                    <rect x="160" y="80" width="60" height="40" rx="2" fill="#4361ee" opacity="0.2" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                  <p className="text-muted-foreground">{theme.description}</p>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 