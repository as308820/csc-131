import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Credits from "./pages/Credits";
import Footer from "./footer/footer";
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Header from './pages/Header';
import { AuthProvider } from './context/AuthContext';
import EditQuiz from './pages/EditQuiz';
import ReviewQuiz from './pages/ReviewQuiz'; 
import AdminResults from './pages/AdminResults';
import UserList from './pages/UserList';
import NotFound from './pages/NotFound';

// Accessibility imports
import { AccessibilityProvider, useAccessibility } from './accessibility/AccessibilityContext';

//quiz manager imports
import ManageQuizzes from './pages/ManageQuizzes';
import CreateQuiz from './pages/CreateQuiz';

//quiz taker imports
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';

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
        <Route path="*" element={<NotFound />} />

        {/*route for quiz manager (admin context)*/}
        <Route path="/manage-quizzes" element={<ManageQuizzes />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
        <Route path="/admin-results" element={<AdminResults />} />
        <Route path="/user-list" element={<UserList />} />

        {/*rout for taking quiz (user context)*/}
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
        <Route path="/review-quiz/:quizId" element={<ReviewQuiz />} />
      </Routes>

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
