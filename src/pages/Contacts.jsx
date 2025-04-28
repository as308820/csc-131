import React, { useState } from 'react';
import './Contacts.css';
import { useAccessibility } from '../accessibility/AccessibilityContext';

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { textSize } = useAccessibility();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-container" style={{ fontSize: `${textSize}px` }}>
      <h2 style={{ fontSize: `${textSize + 10}px` }}>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="contact-submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contacts;
