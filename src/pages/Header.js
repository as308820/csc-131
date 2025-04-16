import React from 'react';
 import { Link } from 'react-router-dom'; //For navigation
 
 const Header = ()=> {
     return (
         <header>
             <h1>Quiz App</h1>
             <nav className="nav-links">
                 <Link to="/login">Login</Link>
                 <Link to="/register">Register</Link>
             </nav>
             {/*TODO: Add styling to the header and navigation links later */}
         </header>
     );
 };
 
 export default Header;
 