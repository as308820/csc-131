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

  return (
    <div className="manage-quizzes">
      <h2>Manage Quizzes</h2>
      {loading ? (  
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {quizzes.map((quiz) => (
            <li key={quiz._id} style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
              <span>{quiz.title}</span>
              {/* Add Delete Button Here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}