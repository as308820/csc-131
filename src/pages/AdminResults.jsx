import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './AdminResults.css';

const AdminResults = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const toggleResults = async (quizId) => {
    if (selectedQuizId === quizId) {
      setSelectedQuizId(null);
    } else {
      try {
        const response = await axios.get(`/api/attempts/quiz/${quizId}`);
        setResults(response.data.results);
        setSelectedQuizId(quizId);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    }
  };

  return (
    <div className="admin-results">
      <h2 style={{ fontSize: `${textSize + 10}px` }}>Quiz Results</h2>

      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <button
            className="quiz-select-button"
            style={{ fontSize: `${textSize}px` }}
            onClick={() => toggleResults(quiz._id)}
          >
            {selectedQuizId === quiz._id ? '↓' : '→'} {quiz.quizTitle}
          </button>

          <div className={`user-list-content ${selectedQuizId === quiz._id ? 'show' : ''}`}>
            <div className="results-section">
              {results.length === 0 ? (
                <p style={{ fontSize: `${textSize}px` }}>No results available.</p>
              ) : (
                results.map((result, idx) => {
                  const timeTakenMs = new Date(result.endTime) - new Date(result.startTime);
                  const minutes = Math.floor(timeTakenMs / 60000);
                  const seconds = Math.floor((timeTakenMs % 60000) / 1000);

                  return (
                    <div key={idx} className="result-row" style={{ fontSize: `${textSize}px` }}>
                      <strong>{result.user}</strong>
                      <span>Points: {result.earnedPoints}/{result.totalPoints}</span>
                      <span>Time: {minutes}m {seconds}s</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        className="return-home-button"
        style={{ fontSize: `${textSize}px` }}
        onClick={() => navigate('/')}
      >
        Return to Home
      </button>
    </div>
  );
};

export default AdminResults;
