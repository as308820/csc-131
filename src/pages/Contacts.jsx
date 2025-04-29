import React, { useState } from 'react';
<<<<<<< HEAD
import "./Contacts.css";

const Contact = () => {
    // Store User's information
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };

    return (
        <div className="contact-container">
            <div className="contact-box">
                <h3>Contact Us!</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                    {/* Name */}
                    <h4>Name</h4>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {/* Email */}
                    <h4>Email</h4>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {/* Phone */}
                    <h4>Phone Number</h4>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {/* Subject */}
                    <h4>Subject</h4>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter the subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    {/* Message */}
                    <h4>Message</h4>
                    <textarea
                        name="message"
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    {/* Submit Button */}
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
=======
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
>>>>>>> 8d27519 (Final project)
