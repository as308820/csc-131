import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css"; // Import the CSS file for styling
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

function LogIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", { email, password })
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

  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>


        

        <form onSubmit={handleLogin}>
  
           {/* name/Email Input */}
           <input
            type="text"
            onChange={(e)=>setEmail(e.target.value)} name ="email"
            className="login-input"
          />
          {/* Password Input */}
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}name ="Password"
            className="login-input"
          />
          {/*error catch message*/}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        {/* Sign Up Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;


