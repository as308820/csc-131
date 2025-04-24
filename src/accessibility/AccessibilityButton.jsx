import React, { useState } from 'react';
import AccessibilityModal from './AccessibilityModal';
import './AccessibilityModal.css';

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="accessibility-button"
        onClick={() => setOpen(true)}
      >
        Accessibility
      </button>
      {open && <AccessibilityModal onClose={() => setOpen(false)} />}
    </>
  );
}