<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    adminCode: "", // New field for admin code
  });

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Check if passwords match
    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(
        name === "password"
          ? value === formData.confirmPassword
          : value === formData.password
      );
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert("Passwords do not match!");
      return;
    }
    alert("Sign-up successful!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="input-container">
            <span className="char-counter">
              {formData.firstName.length}/20
            </span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name (Max 20 characters)"
              className="signup-input"
              maxLength="20"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Last Name Input */}
          <div className="input-container">
            <span className="char-counter">
              {formData.lastName.length}/20
            </span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name (Max 20 characters)"
              className="signup-input"
              maxLength="20"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          {/* Username Input */}
          <div className="input-container">
            <span className="char-counter">
              {formData.username.length}/20
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username (Max 20 characters)"
              className="signup-input"
              maxLength="20"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Confirm Password Input */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            className="signup-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {/* Password Match Indicator */}
          {formData.password && formData.confirmPassword && (
            <p
              style={{
                color: passwordsMatch ? "green" : "red",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              {passwordsMatch ? "✔ Passwords match" : "✘ Passwords do not match"}
            </p>
          )}
          {/* Admin Code Input */}
          <input
            type="text"
            name="adminCode"
            placeholder="Code to register as Admin"
            className="signup-input"
            value={formData.adminCode}
            onChange={handleChange}
          />
          {/* Submit Button */}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        {/* Log In Link */}
        <p className="login-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
=======
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './LogIn.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/auth/signup', { name, email, password, adminCode });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{ fontSize: `${textSize + 10}px` }}>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ fontSize: `${textSize}px` }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ fontSize: `${textSize}px` }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontSize: `${textSize}px` }}
        />
        <input
          type="text"
          placeholder="Admin Code (optional)"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          style={{ fontSize: `${textSize}px` }}
        />
        <button type="submit" className="login-button" style={{ fontSize: `${textSize}px` }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
>>>>>>> 8d27519 (Final project)
