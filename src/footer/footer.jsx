import React from "react";
import './footer.css';
import fb from '../images/fbimg.png';
import x from '../images/ximg.png';
import instagram from '../images/igimg.jpeg';
import linkedin from '../images/linkedinimg.png';
import github from '../images/githubimg.jpeg';
import AccessibilityButton from '../accessibility/AccessibilityButton';
import { useAccessibility } from '../accessibility/AccessibilityContext';

const Footer = () => {
  const { textSize } = useAccessibility();

  const iconSize = `${textSize * 1.8}px`;
  const footerHeight = `${textSize * 2.5}px`;

  return (
    <footer className="footer" style={{ minHeight: footerHeight }}>
      <div className="footer-content">
        <div className="socialmedia">
          <a href="https://www.facebook.com/profile.php?id=61574022311459" target="_blank" rel="noopener noreferrer">
            <img src={fb} alt="Facebook" style={{ height: iconSize, width: iconSize }} />
          </a>
          <a href="https://x.com/ProjectAlpha131" target="_blank" rel="noopener noreferrer">
            <img src={x} alt="X (Twitter)" style={{ height: iconSize, width: iconSize }} />
          </a>
          <a href="https://www.instagram.com/projectalpha131/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" style={{ height: iconSize, width: iconSize }} />
          </a>
          <a href="https://www.linkedin.com/in/project-alpha-7b9398357/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" style={{ height: iconSize, width: iconSize }} />
          </a>
          <a href="https://github.com/as308820/csc-131" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="Github" style={{ height: iconSize, width: iconSize }} />
          </a>
        </div>
        <AccessibilityButton />
      </div>
    </footer>
  );
};

export default Footer;
