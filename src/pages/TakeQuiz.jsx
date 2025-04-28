import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './TakeQuiz.css';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${quizId}`);
        setQuizData(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
        setTimeLeft(response.data.duration * 60);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const startAttempt = async () => {
      if (!quizData?._id) return;
      try {
        const response = await axios.get(`/api/attempts/${quizData._id}`);
        const { submitted, startTime, duration, answers: savedAnswers } = response.data;
        if (submitted) {
          setSubmitted(true);
          setTimeLeft(0);
        } else {
          const elapsed = Math.floor((Date.now() - new Date(startTime)) / 1000);
          setTimeLeft(duration * 60 - elapsed);
        }
        if (savedAnswers && savedAnswers.length > 0) {
          setAnswers(savedAnswers);
        }
      } catch (err) {
        console.error('Error starting quiz attempt:', err);
      }
    };
    if (quizData) {
      startAttempt();
    }
  }, [quizData]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswerChange = async (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
    try {
      await axios.post(`/api/attempts/${quizData._id}/save-progress`, { answers: updatedAnswers });
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      await axios.post(`/api/attempts/${quizData._id}/submit`, { answers }, { withCredentials: true });
      navigate(`/review-quiz/${quizData._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (!quizData) return <div>Quiz not found</div>;

  return (
    <div className="take-quiz-container">
      <h2 style={{ fontSize: `${textSize + 10}px` }}>{quizData.quizTitle}</h2>
      <div className="quiz-timer" style={{ fontSize: `${textSize}px` }}>
        Time Remaining: {submitted ? "0:00" : `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
      </div>
      <div className="quiz-questions">
        {quizData.questions.map((q, idx) => (
          <div key={idx} className="question-block" style={{ fontSize: `${textSize}px` }}>
            <h4>{q.questionText}</h4>
            <div className="options">
              {q.options.map((opt, optIdx) => (
                <label key={optIdx} className="option-label">
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    checked={parseInt(answers[idx]) === optIdx}
                    onChange={() => handleAnswerChange(idx, optIdx)}
                    disabled={submitted}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button
          className="submit-quiz-button"
          style={{ fontSize: `${textSize}px` }}
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      ) : (
        <div style={{ fontSize: `${textSize}px` }}>Quiz submitted! (Grading to be implemented)</div>
      )}
    </div>
  );
};

export default TakeQuiz;
