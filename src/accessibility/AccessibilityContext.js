import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [textSize, setTextSize] = useState(() => parseInt(localStorage.getItem('textSize')) || 16);

  // Save theme and textSize to localStorage when they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, textSize, setTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);