'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '@/types';

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  
  useEffect(() => {
    // Check if theme preference exists in localStorage
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Default to dark theme if no stored preference
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);
  
  useEffect(() => {
    // Update data-theme attribute and store preference
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 