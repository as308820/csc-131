import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBeforeUnload } from 'react-use';
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
        setTimeLeft(response.data.duration * 60);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    // TODO: Add grading logic and result submission here
  };

  // Browser unload protection
  useBeforeUnload(!submitted, (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  // Navigation blocker (covers internal navigation)
  useEffect(() => {
    const handleBeforeRoute = (e) => {
      if (!submitted) {
        const confirmationMessage = "You have not submitted the quiz. Leaving will submit your answers.";
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeRoute);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeRoute);
    };
  }, [submitted]);

    console.log("Loading:", loading);
    console.log("Quiz Data:", quizData);
    console.log("Quiz Questions:", quizData?.questions);

    if (loading || !quizData || !Array.isArray(quizData.questions)) {
        console.warn("Quiz Data Invalid:", quizData);
        return <div>Loading quiz...</div>;
      }

  return (
    <div>
      <h2>{quizData.quizTitle}</h2>
      <div>Time left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
      {Array.isArray(quizData.questions) && quizData.questions.map((q, index) => (
        <div key={index}>
            <p>{q.questionText}</p>
            {q.options.map((option, i) => (
            <label key={i}>
                <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleAnswerChange(index, option)}
                disabled={submitted}
                />
                {option}
            </label>
            ))}
        </div>
        ))}
      {!submitted && <button onClick={handleSubmit}>Submit Quiz</button>}
    </div>
  );
};

export default TakeQuiz;
