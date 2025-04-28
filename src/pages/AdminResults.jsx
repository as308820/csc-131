import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const AdminResults = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

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

  const fetchResults = async (quizId) => {
    try {
      const response = await axios.get(`/api/attempts/quiz/${quizId}`);
      setResults(response.data.results);
      setSelectedQuizId(quizId);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div className="admin-results">
      <h2>Quiz Results</h2>
      <div>
        {quizzes.map((quiz) => (
          <div key={quiz._id}>
            <button onClick={() => fetchResults(quiz._id)}>
              {quiz.quizTitle}
            </button>
          </div>
        ))}
      </div>

      {selectedQuizId && (
        <div className="results-section">
          <h3>Results:</h3>
          {results.length === 0 ? (
            <p>No results available.</p>
          ) : (
            results.map((result, idx) => {
              const timeTakenMs = new Date(result.endTime) - new Date(result.startTime);
              const minutes = Math.floor(timeTakenMs / 60000);
              const seconds = Math.floor((timeTakenMs % 60000) / 1000);

              return (
                <div key={idx} className="result-row">
                  <strong>{result.user}</strong>
                  <span>Points: {result.earnedPoints}/{result.totalPoints}</span>
                  <span>Time: {minutes} minutes {seconds} seconds</span>
                </div>
              );
            })
          )}
        </div>
      )}
      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default AdminResults;
