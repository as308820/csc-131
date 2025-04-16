import React from 'react';
import { Link } from 'react-router-dom'; //For navigation
import "./Header.css";


 const Header = ()=> {
     return (
         <header className="header">
            <Link to="/" className="logo-link">
                <img src="/logo.webp" alt="Quiz App Logo" className="logo" />
            </Link>
            
            <nav className="nav-links">
                <Link to="/login" className="login-button">Login</Link>
                <Link to="/register" className="register-button">Register</Link>
            </nav>
            {/*TODO: Add styling to the header and navigation links later */}
        </header>
     );
 };
 
 export default Header;
 