import "./ManageQuizzes.css";
import React, { useEffect, useState } from "react";

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="manage-quizzes">
      <h2>Manage Quizzes</h2>
      {loading ? (  
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <div className="quiz-list">
            {quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz._id}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(quiz._id)}
                  >
                    {quiz.title}
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}