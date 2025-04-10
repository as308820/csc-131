import React, { useState } from 'react';

const LoginForm = () => {
  // State hooks for input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded credentials
  const correctUsername = 'jonjon';
  const correctPassword = 'foregroundRed';

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      window.location.href = '/dashboard'; // Or handle state management as needed
    } else {
      alert("BEGONE WRETCHED WITCH");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <h2 style={headerStyle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              id="username"
              type="text"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              id="password"
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#333333',
};

const frameStyle = {
  width: '340px',
  padding: '20px',
  backgroundColor: '#333333',
  borderRadius: '5px',
  color: '#FFFFFF',
};

const headerStyle = {
  color: '#FF3333',
  fontFamily: 'Arial, sans-serif',
  fontSize: '30px',
  marginBottom: '40px',
  textAlign: 'center',
  
};

const inputGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '15px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#FF3333',
  color: '#FFFFFF',
  fontFamily: 'Arial, sans-serif',
  fontSize: '15px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px',
};

export default LoginForm;