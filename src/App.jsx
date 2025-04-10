import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/contacts" style={{ 
            color: '#333', 
            textDecoration: 'none',
            padding: '10px',
            margin: '10px',
            border: '1px solid #333',
            borderRadius: '4px'
          }}>
            Go to Contacts
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;