import React from "react";
import './Home.css';


function Home() {
  return (
    <div className="home-container">
      <div className="text-section">
        <h1 className="big-name">AlphaAnswer</h1>
        <p className="big-text">Take and Create Quizzes</p>
      </div>
      <div className="home-image-box">
          <img src={"/Headshots/Quiz.jpg"} alt="Quiz" />
      </div>
    </div>
  );
}

export default Home;