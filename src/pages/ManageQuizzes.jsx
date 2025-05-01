import "./ManageQuizzes.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from "../accessibility/AccessibilityContext";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ManageQuizzes() {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { textSize } = useAccessibility();

  // Fetch quizzes on page load
  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quizzes:", err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    // Navigate to edit page for this quiz
    window.location.href = `/edit-quiz/${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
  
    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuizzes(quizzes.filter((q) => q._id !== id));
      } else {
        console.error("Failed to delete quiz");
      }
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  if (!user) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (!user.isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="manage-quizzes-container">
      <div className="manage-quizzes">
        <h2
          style={{
            fontSize: `${textSize + 10}px`,
            textAlign: "center",
            marginTop: "1.5rem",
            marginBottom: "2rem"
          }}
        >
          Manage Quizzes
        </h2>
        {loading ? (  
          <p>Loading quizzes...</p>
        ) : quizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          <div className="quiz-list">
            {quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz._id}>
                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", width: "100%" }}>
                  <button
                    className="edit-button"
                    style={{ fontSize: `${textSize}px` }}
                    onClick={() => handleEdit(quiz._id)}
                  >
                    {quiz.quizTitle}
                  </button>
                  <button
                    className="delete-button"
                    style={{ fontSize: `${textSize}px` }}
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="create-quiz-button"
          style={{ fontSize: `${textSize}px` }}
          onClick={() => navigate("/create-quiz")}
        >
          Create New Quiz
        </button>
      </div>
    </div>
  );
}