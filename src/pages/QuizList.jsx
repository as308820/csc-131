import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; 

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesResponse = await axios.get('/api/quizzes');
        const attemptsResponse = await axios.get('/api/attempts');  // 👈 Fetch user attempts
  
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
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h3>{quiz.quizTitle}</h3>
            <p>Duration: {quiz.duration} minutes</p>
            {quiz.submitted ? (
              <button onClick={() => navigate(`/review-quiz/${quiz._id}`)}>
                Quiz Submitted (View Results)
              </button>
            ) : (
              <button onClick={() => navigate(`/take-quiz/${quiz._id}`)}>Start Quiz</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizList;
