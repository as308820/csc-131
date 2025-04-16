import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Credits from "./pages/Credits";
import Footer from "./footer/footer"; // Import Footer component

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
      <h1>{data}</h1>
      <p>Test Application</p>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
          <li><Link to="/credits">Credits</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>

      <AccessibilityButton />
      <Footer />
    </div>
  );
}

// top-level App wrapper
export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <LayoutContent />
      </Router>
    </AccessibilityProvider>
  );
}