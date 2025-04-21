import React from "react";
import { Link } from "react-router-dom";
import "./LogIn.css"; // Import the CSS file for styling

function LogIn() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form>
          {/* Username/Email Input */}
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
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