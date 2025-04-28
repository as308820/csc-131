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
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const fetchQuiz = async () => {
        try {
            const response = await axios.get(`/api/quizzes/${quizId}`);
            const quiz = response.data;
            setQuizTitle(quiz.quizTitle);
            setDuration(quiz.duration || 0);
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
    //const handleQuestionChange = (index, field, value) => {
    //    const updated = [...questions];
    //    updated[index][field] = value;
    //    setQuestions(updated);
    //};

    const handleSave = async () => {
        try {
        await axios.put(`/api/quizzes/${quizId}`, {
            quizTitle,
            duration,
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

    <label>Duration (minutes):</label>
    <input
        type="number"
        min="1"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
        placeholder="Enter duration"
    />

  {questions.map((q, idx) => (
    <div key={idx} className="question-block">
      <label>Question Text:</label>
        <input
            type="text"
            value={q.questionText}
            onChange={(e) => {
            const updated = [...questions];
            updated[idx].questionText = e.target.value;
            setQuestions(updated);
            }}
        />

        <label>Number of Answer Options:</label>
        <input
            type="number"
            value={q.options.length}
            min="2"
            max="10"
            onChange={(e) => {
            const numOptions = parseInt(e.target.value, 10);
            const updated = [...questions];
            const opts = updated[idx].options.slice(0, numOptions);
            while (opts.length < numOptions) opts.push('');
            updated[idx].options = opts;
            setQuestions(updated);
            }}
        />

        {q.options.map((opt, optIdx) => (
            <div key={optIdx}>
            <label>Option {optIdx + 1}:</label>
            <input
                type="text"
                value={opt}
                onChange={(e) => {
                const updated = [...questions];
                updated[idx].options[optIdx] = e.target.value;
                setQuestions(updated);
                }}
            />
            </div>
        ))}

        <label>Correct Answer:</label>
        <select
            value={q.correctAnswer}
            onChange={(e) => {
            const updated = [...questions];
            updated[idx].correctAnswer = parseInt(e.target.value, 10);
            setQuestions(updated);
            }}
        >
            {q.options.map((_, optIdx) => (
            <option key={optIdx} value={optIdx}>
                Option {optIdx + 1}
            </option>
            ))}
        </select>
        </div>
    ))}

    <div className="button-group">
        <button type="button" onClick={() => {
        setQuestions([
            ...questions,
            { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
        ]);
        }}>Add Question</button>

        <button type="button" onClick={() => {
        setQuestions(questions.slice(0, -1));
        }}>Delete Last Question</button>
    </div>

    <button onClick={handleSave}>Save Changes</button>
    </div>
    );
};

export default EditQuiz;