import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuiz = () => {
    const { quizId } = useParams();  // Get ObjectId from URL
    console.log("Quiz ID from URL:", quizId);
    const navigate = useNavigate();

    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
        try {
            const response = await axios.get(`/api/quizzes/${quizId}`);
            const quiz = response.data;
            setQuizTitle(quiz.quizTitle);   // Use quizTitle as per your backend
            setQuestions(quiz.questions);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            setMessage('Failed to load quiz.');
        }
        };

        fetchQuiz();
    }, [quizId]);

    if (loading) return <div>Loading...</div>;

    // Function to update question text
    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleSave = async () => {
        try {
        await axios.put(`/api/quizzes/${quizId}`, {
            quizTitle,
            questions
        });
        setMessage('Quiz updated successfully!');
        navigate('/manage-quizzes');  // Redirect back to ManageQuizzes
        } catch (error) {
        console.error("Error saving quiz:", error);
        setMessage('Failed to save quiz.');
        }
    };

    return (
        <div className="edit-quiz">
        <h2>Edit Quiz</h2>
        {message && <p>{message}</p>}
        <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Quiz Title"
        />
        {questions.map((q, idx) => (
            <div key={idx} className="question-block">
            <input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(idx, 'questionText', e.target.value)}
                placeholder={`Question ${idx + 1}`}
            />
            {q.options.map((opt, optIdx) => (
                <input
                key={optIdx}
                type="text"
                value={opt}
                onChange={(e) => {
                    const updated = [...questions];
                    updated[idx].options[optIdx] = e.target.value;
                    setQuestions(updated);
                }}
                placeholder={`Option ${optIdx + 1}`}
                />
            ))}
            </div>
        ))}
        <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default EditQuiz;