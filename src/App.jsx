import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Credits from "./pages/Credits";
import Footer from "./footer/footer"; // Import Footer component
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Header from './pages/Header'; // Import Header component

// Accessibility imports
import { AccessibilityProvider, useAccessibility } from './accessibility/AccessibilityContext';
import AccessibilityButton from "./accessibility/AccessibilityButton";

import { useState, useEffect } from 'react';

//functions
import { getTest } from "./functions/test";

function LayoutContent() {
  const { theme, textSize } = useAccessibility();
  const [data, setData] = useState("Test Application");

  useEffect(() => {
    getTest()
      .then((res) => setData(res.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
      style={{ fontSize: `${textSize}px`, minHeight: '100vh' }}
    >
      {/* Header Component */}
      <Header />
      <h1>{data}</h1>
      <p>Test Application</p>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>

      {/* Accessibility Button */}
      <AccessibilityButton />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// Top-level App wrapper
export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <LayoutContent />
      </Router>
    </AccessibilityProvider>
  );
}