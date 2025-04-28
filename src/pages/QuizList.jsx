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
        const response = await axios.get('/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
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
            <button onClick={() => navigate(`/take-quiz/${quiz._id}`)}>Start Quiz</button>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizList;
