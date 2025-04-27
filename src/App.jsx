import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Credits from "./pages/Credits";
import Footer from "./footer/footer";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './pages/Header';
import { AuthProvider } from './context/AuthContext';
import EditQuiz from './pages/EditQuiz';

// Accessibility imports
import { AccessibilityProvider, useAccessibility } from './accessibility/AccessibilityContext';
import AccessibilityButton from "./accessibility/AccessibilityButton";

//quiz manager test imports (should be refactored when login system is available)
import ManageQuizzes from './pages/ManageQuizzes';
import CreateQuiz from './pages/CreateQuiz';

function LayoutContent() {
  const { theme, textSize } = useAccessibility();

  return (
    <div
      className={`app-container ${theme}`}
      style={{ fontSize: `${textSize}px`, minHeight: '100vh' }}
    >
      {/* Header Component */}
      <Header />

      {/* Define Routes */}
      <div className='main-content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Test route for quiz manager*/}
        <Route path="/manage-quizzes" element={<ManageQuizzes />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
      </Routes>

      {/* Accessibility Button */}
      <AccessibilityButton />
      </div>
      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// Top-level App wrapper
export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Router>
          <LayoutContent />
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  );
}
