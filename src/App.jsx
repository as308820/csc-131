import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Credits from "./pages/Credits";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from './pages/Header';
import { useState, useEffect } from 'react';


//functions
import {getTest} from "./functions/test";

function App() {
  const [data, setData] = useState("Test Application");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message);
      })
      .catch((err) => console.log(err));    
  }, []);

  return (
    <Router>
      <div className="App">
        <Header /> {/* This will appear at the top of the page*/}
        <h1>{data}</h1>
        <p>Test Application</p>
       

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/credits">Credits</Link></li>
          </ul>
        </nav>

        {/*Define Routes */}
        <Routes>
            <Route path= "/" element={<Home />} />
            <Route path= "/about" element={<About />} />
            <Route path= "/contacts" element={<Contacts />} />
            <Route path= "/credits" element={<Credits />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
