import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesResponse = await axios.get('/api/quizzes');
        const attemptsResponse = await axios.get('/api/attempts');

        const submittedQuizIds = attemptsResponse.data
          .filter(attempt => attempt.submitted)
          .map(attempt => attempt.quizId.toString());

        const quizzesWithStatus = quizzesResponse.data.map(quiz => ({
          ...quiz,
          submitted: submittedQuizIds.includes(quiz._id.toString())
        }));

        setQuizzes(quizzesWithStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes or attempts:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div className="quiz-list-container">
      <h2 style={{ fontSize: `${textSize + 10}px` }}>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p style={{ fontSize: `${textSize}px` }}>No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className={`quiz-item ${quiz.submitted ? 'submitted' : ''}`}
            style={{ fontSize: `${textSize}px` }}
          >
            <div className="quiz-details">
              <span>{quiz.quizTitle}</span>
              <span className="quiz-duration">Duration: {quiz.duration} min</span>
            </div>
            {quiz.submitted ? (
              <button
                className="quiz-action-button"
                style={{ fontSize: `${textSize}px` }}
                onClick={() => navigate(`/review-quiz/${quiz._id}`)}
              >
                ✔ View Results
              </button>
            ) : (
              <button
                className="quiz-action-button incomplete-quiz"
                style={{ fontSize: `${textSize}px` }}
                onClick={() => navigate(`/take-quiz/${quiz._id}`)}
              >
                Start Quiz
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizList;
