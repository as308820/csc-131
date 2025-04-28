import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';

const ReviewQuiz = () => {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="review-quiz">
      <h2>{quizTitle}</h2>
      <div className="result-box">
        <h3>Quiz Result</h3>
        <p>Points: {earnedPoints}/{totalPoints}</p>
        <p>Time: {minutes} minutes and {seconds} seconds</p>
      </div>
      <button onClick={() => navigate('/quiz-list')}>Return to Quiz selection</button>
    </div>
  );
};

export default ReviewQuiz;