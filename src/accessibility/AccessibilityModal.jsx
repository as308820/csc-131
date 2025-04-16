import React from 'react';
import { useAccessibility } from './AccessibilityContext';
import './AccessibilityModal.css';

export default function AccessibilityModal({ onClose }) {
  const { theme, setTheme, textSize, setTextSize } = useAccessibility();

  return (
    <div className='accessibility-modal'>
      <button onClick={onClose} className='accessibility-close-btn'>✖</button>
      <h3>Accessibility Settings</h3>

      <div>
        <label>Theme: </label>
        <button
          className="accessibility-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Text Size: {textSize}px</label>
        <input
          type="range"
          min="12"
          max="30"
          value={textSize}
          onChange={e => setTextSize(parseInt(e.target.value))}
          className="accessibility-slider"
        />
      </div>
    </div>
  );
}