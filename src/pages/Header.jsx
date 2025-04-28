import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="left-group">
        <Link to="/" className="logo-link">
          <img src="/logo.webp" alt="Quiz App Logo" className="logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/credits">Credits</Link>
          {user && !user.isAdmin && (
              <Link to="/quiz-list" className="about-button">
                  Quizzes
              </Link>
          )}
          {user?.isAdmin && (
            <>
              <Link to="/manage-quizzes">Manage Quizzes</Link>
              <Link to="/admin-results">Admin Results</Link>
              <Link to="/user-list">User List</Link>
            </>
          )}
        </nav>
      </div>
      <nav className="auth-buttons">
        {user ? (
          <>
            <span className="display-username">Welcome, {user.name}</span>
            <button className="logout-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/LogIn" className="login-button">Log In</Link>
            <Link to="/SignUp" className="register-button">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
