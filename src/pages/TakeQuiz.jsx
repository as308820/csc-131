import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${quizId}`);
        setQuizData(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setTimeLeft(response.data.duration * 60); // Duration in seconds
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // TODO: Add grading logic and result submission here
  };

  if (loading) return <div>Loading quiz...</div>;
  if (!quizData) return <div>Quiz not found</div>;

  return (
    <div>
      <h2>{quizData.quizTitle}</h2>
      <div>Time Remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>

      {quizData.questions.map((q, idx) => (
        <div key={idx}>
          <h4>{q.questionText}</h4>
          {q.options.map((opt, optIdx) => (
            <div key={optIdx}>
              <label>
                <input
                  type="radio"
                  name={`question-${idx}`}
                  checked={answers[idx] === optIdx}
                  onChange={() => handleAnswerChange(idx, optIdx)}
                  disabled={submitted}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>Submit Quiz</button>
      ) : (
        <div>Quiz submitted! (Grading to be implemented)</div>
      )}
    </div>
  );
};

export default TakeQuiz;
