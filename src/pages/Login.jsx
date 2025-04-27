import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css"; // Import the CSS file for styling
import axios from 'axios';

function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/login", { email, password })
    .then(result=>{
      if(result.data==="success"){
        navigate("/Credits");
      }
      else{
        alert("Login failed: User does not exist");
      }
    })
    .catch(err => console.log(err))

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


