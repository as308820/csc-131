import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './Contacts.css';

const Contacts = () => {
  const { textSize } = useAccessibility();
  const { register, handleSubmit, reset } = useForm();

  const sendEmail = (data) => {
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      data,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log(result.text);
      alert('Message sent successfully!');
      reset();
    }, (error) => {
      console.log(error.text);
      alert('Something went wrong. Please try again.');
    });
  };

  return (
    <div className="contact-container" style={{ fontSize: `${textSize}px` }}>
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit(sendEmail)}>
        <input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: true })}
        />
        <input
          type="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
        />
        <textarea
          placeholder="Your Message"
          {...register('message', { required: true })}
        ></textarea>
        <button type="submit" className="contact-submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contacts;
