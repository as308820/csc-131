import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from './pages/Header';
import Login from "./pages/Login";
import { useState, useEffect } from 'react';


//functions
import {getTest} from "./functions/test";

function App() {
  const [data, setData] = useState("HELLO WORLD");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message); //Here we'll be disaplying fetched data from the API. Which is the backend I guess? -Aaron
      })
      .catch((err) => console.log(err));    
  }, []);

  return (
    <Router>
      <div className="App">
        <Header /> {/* This will appear at the top of the page*/}
        <h1>{data}</h1> {/* The API data will be displayed here*/}
        <p>This is a simple React frontend</p>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/*Define Routes */}
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path= "/" element={<Home />} />
            <Route path= "/about" element={<About />} />
            <Route path= "/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
