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
