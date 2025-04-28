import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import './ReviewQuiz.css';

const ReviewQuiz = () => {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`/api/attempts/${quizId}/review`);
        console.log("Fetched review data:", response.data);
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching quiz result:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [quizId]);

  if (loading) return <div>Loading results...</div>;
  if (!result) return <div>No results found.</div>;

  const { quizTitle, earnedPoints, totalPoints, startTime, endTime } = result;
  const timeTakenMs = new Date(endTime) - new Date(startTime);
  const minutes = Math.floor(timeTakenMs / 60000);
  const seconds = Math.floor((timeTakenMs % 60000) / 1000);

  return (
    <div className="review-quiz-container">
      <h2 style={{ fontSize: `${textSize + 10}px` }}>{quizTitle}</h2>
      <div className="result-box" style={{ fontSize: `${textSize}px` }}>
        <h3 style={{ fontSize: `${textSize + 4}px` }}>Quiz Result</h3>
        <p>Points: {earnedPoints}/{totalPoints}</p>
        <p>Time: {minutes} minutes and {seconds} seconds</p>
      </div>
      <button
        className="return-quizlist-button"
        style={{ fontSize: `${textSize}px` }}
        onClick={() => navigate('/quiz-list')}
      >
        Return to Quiz Selection
      </button>
    </div>
  );
};

export default ReviewQuiz;
