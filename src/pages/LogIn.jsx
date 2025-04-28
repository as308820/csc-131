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

  const handleLogin = (e) => {
    console.log('Axios defaults:', axios.defaults);
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login",
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(result => {
      if (result.data.message === "success") {
        login(result.data.user);
        navigate("/Credits");
      } else {
        alert("Login failed: Invalid credentials");
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred.");
      }
    });
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


