import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      {/* Log In Button */}
      <Link to="/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>
          Log In
        </button>
      </Link>
    </div>
  );
}

export default Home;