"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Force dark mode - light mode temporarily disabled
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Force dark mode for now - commented out light mode logic for future re-enablement
    // const savedTheme = localStorage.getItem("theme") as Theme;
    // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    // const initialTheme = savedTheme || systemTheme;
    
    setTheme("dark");
    document.documentElement.classList.add("dark");
  }, []);

  // Disabled toggle functionality - kept for future re-enablement
  const toggleTheme = () => {
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);
    // localStorage.setItem("theme", newTheme);
    // document.documentElement.classList.toggle("dark", newTheme === "dark");
    console.log("Theme toggle disabled - dark mode forced");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
