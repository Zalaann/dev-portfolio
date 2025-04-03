"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available themes
export type ThemeType = "light" | "dark";

// Theme context props
interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  isAnimating: boolean;
  ripplePosition: { x: number, y: number } | null;
  setRipplePosition: (position: { x: number, y: number } | null) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  isAnimating: false,
  ripplePosition: null,
  setRipplePosition: () => {},
});

// Custom hook to easily use theme context
export const useTheme = () => useContext(ThemeContext);

// Safe localStorage access to prevent server/client mismatch
const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

const setLocalStorageItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme state from localStorage if available, otherwise default to dark
  const [theme, setThemeState] = useState<ThemeType>("dark");
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripplePosition, setRipplePosition] = useState<{ x: number, y: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Detect system preference for dark mode
  const detectSystemTheme = (): ThemeType => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return 'dark';
  };

  // Initialize theme on mount
  useEffect(() => {
    setIsMounted(true);
    
    // Check for saved theme
    const savedTheme = getLocalStorageItem("portfolio-theme") as ThemeType | null;
    
    if (savedTheme) {
      // Use saved preference
      setThemeState(savedTheme);
    } else {
      // Always set to dark by default
      setThemeState('dark');
      // Save the dark theme preference
      setLocalStorageItem("portfolio-theme", "dark");
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (!isMounted) return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isMounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (!getLocalStorageItem("portfolio-theme")) {
        // Always default to dark mode
        setThemeState('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update theme and save to localStorage
  const setTheme = (newTheme: ThemeType) => {
    setIsAnimating(true);
    setThemeState(newTheme);
    setLocalStorageItem("portfolio-theme", newTheme);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
      setRipplePosition(null);
    }, 1000);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Prevent hydration mismatch by rendering nothing until client-side
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isAnimating,
        ripplePosition,
        setRipplePosition,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
} 