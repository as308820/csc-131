import React from 'react';
import { Link } from 'react-router-dom'; //For navigation
import "./Header.css";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

 const Header = ()=> {
    const { user, logout } = useContext(AuthContext);

     return (
         <header className="header">
            <Link to="/" className="logo-link">
                <img src="/logo.webp" alt="Quiz App Logo" className="logo" />
            </Link>
            
            <nav className="nav-links">
                <Link to="/about" className="about-button">
                    About
                </Link>
                <Link to="/contacts" className="contacts-button">
                    Contacts
                </Link>
                <Link to="/credits" className="credits-button">
                    Credits
                </Link>

                {user?.isAdmin && (
                    <>
                        <Link to="/manage-quizzes" className="about-button">Manage Quizzes</Link>
                        <Link to="/admin-results" className="about-button">Admin Results</Link>
                        <Link to="/user-list" className="about-button">User List</Link>
                    </>
                )}

            </nav>

            {user ? (
                <nav className='nav-links'>
                <span className="displayUsername">Welcome, {user.name}</span>
                <button className="logout-button" onClick={logout}>Logout</button>
                </nav>
            ) : (
                <nav className="log-links">
                    <Link to="/LogIn" className="login-button">LogIn</Link>
                    <Link to="/SignUp" className="register-button">SignUp</Link>   
                </nav>
            )}
        </header>
     );
 };
 
 export default Header;
 