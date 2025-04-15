import React, { useState } from 'react';
import AccessibilityModal from './AccessibilityModal';

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      >
        Accessibility
      </button>
      {open && <AccessibilityModal onClose={() => setOpen(false)} />}
    </>
  );
}