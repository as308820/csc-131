import React, { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [textSize, setTextSize] = useState(16);

  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, textSize, setTextSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);