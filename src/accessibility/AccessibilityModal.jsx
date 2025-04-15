import React from 'react';
import { useAccessibility } from './AccessibilityContext';

export default function AccessibilityModal({ onClose }) {
  const { theme, setTheme, textSize, setTextSize } = useAccessibility();

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '1.5rem',
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
      zIndex: 1100,
      borderRadius: '8px',
      minWidth: '300px'
    }}>
      <button onClick={onClose} style={{ float: 'right' }}>✖</button>
      <h3>Accessibility Settings</h3>

      <div>
        <label>Theme: </label>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
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
        />
      </div>
    </div>
  );
}