import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Oops! Page Not Found</h1>
      <p className="not-found-message">
        The page you're looking for doesn't exist. Maybe it's been moved or never existed.
      </p>
      <Link to="/" className="not-found-link">Go back to the homepage</Link>
    </div>
  );
};


export default NotFound;