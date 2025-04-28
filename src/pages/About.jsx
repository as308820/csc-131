import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About</h2>
      <p className="about-text">
        This application is a full stack web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). Our goal is to create a user-friendly platform where users can take, create, and manage quizzes.
      </p>
    </div>
  );
};

export default About;
