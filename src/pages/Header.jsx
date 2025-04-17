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
                <Link to="/about" className="about-button">About</Link>
                <Link to="/contacts" className="contacts-button">Contacts</Link>
                <Link to="/credits" className="credits-button">Credits</Link>
            </nav>

            <nav className="log-links">
                <Link to="/LogIn" className="login-button">LogIn</Link>
                <Link to="/SignUp" className="register-button">SignUp</Link>   
            </nav>
            {/*TODO: Add styling to the header and navigation links later */}
        </header>
     );
 };
 
 export default Header;
 