<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';
=======
import React, { createContext, useState, useContext, useEffect } from 'react';
>>>>>>> 8d27519 (Final project)

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
<<<<<<< HEAD
  const [theme, setTheme] = useState('light');
  const [textSize, setTextSize] = useState(16);
=======
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [textSize, setTextSize] = useState(() => parseInt(localStorage.getItem('textSize')) || 16);

  // Save theme and textSize to localStorage when they change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('textSize', textSize);
  }, [textSize]);
>>>>>>> 8d27519 (Final project)

  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, textSize, setTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);