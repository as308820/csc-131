import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import FloatingButton from '../components/FloatingButton'


export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (values) => {
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        values,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: 'sans-serif'
  };
  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };
  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold'
  };
  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px'
  };
  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '16px'
  };
  const statusStyle = (color) => ({
    color,
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '14px'
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            style={inputStyle}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            rows={5}
            {...register("message", { required: "Message is required" })}
            style={inputStyle}
          />
          {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? "Sending..." : "Submit"}
        </button>

        {status === "success" && (
          <p style={statusStyle('green')}>Thanks! Your message is on its way.</p>
        )}
        {status === "error" && (
          <p style={statusStyle('red')}>Oops! Something went wrong. Please try again.</p>
        )}
      </form>
                  <FloatingButton />
      
    </div>
  );
}
