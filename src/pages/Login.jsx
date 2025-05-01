import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css"; // Import the CSS file for styling
import axios from '../axios'; 
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

function LogIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post('/api/auth/login', { email, password });
  
      if (response.data.message === "success") {
        login(response.data.user);
        navigate("/Credits");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Log In</h2>

        <input
          type="text"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          name="password"
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button">
          Log In
        </button>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default LogIn;


