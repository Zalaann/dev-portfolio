"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available themes
export type ThemeType = "default" | "netflix";

// Theme context props
interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  hasSelectedTheme: boolean;
  setHasSelectedTheme: (hasSelected: boolean) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextProps>({
  theme: "default",
  setTheme: () => {},
  hasSelectedTheme: false,
  setHasSelectedTheme: () => {},
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
  // Initialize theme state from localStorage if available, otherwise default
  const [theme, setThemeState] = useState<ThemeType>("default");
  const [hasSelectedTheme, setHasSelectedTheme] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  // Load saved theme when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
    // Temporarily disabled theme selection
    // const savedTheme = getLocalStorageItem("portfolio-theme") as ThemeType | null;
    // const themeSelected = getLocalStorageItem("portfolio-theme-selected");
    
    // Always use default theme
    setThemeState("default");
    
    // if (savedTheme) {
    //   setThemeState(savedTheme);
    // }
    
    // if (themeSelected === "true") {
    //   setHasSelectedTheme(true);
    // }
  }, []);

  // Update theme and save to localStorage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    setLocalStorageItem("portfolio-theme", newTheme);
  };

  // Set whether user has made a theme selection
  const setHasSelected = (hasSelected: boolean) => {
    setHasSelectedTheme(hasSelected);
    setLocalStorageItem("portfolio-theme-selected", hasSelected.toString());
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
        hasSelectedTheme,
        setHasSelectedTheme: setHasSelected,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
} 