import { useState } from 'react';
import axios from 'axios';
import './CreateQuiz.css';  // Add styles later

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');

  // Add a new question field
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);
  };

  // Remove last question field
  const deleteLastQuestion = () => {
    setQuestions(questions.slice(0, -1));
  };

  // Handle input changes
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Submit quiz to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/quizzes', { quizTitle, questions });
      setMessage('Quiz created successfully!');
      setQuizTitle('');
      setQuestions([]);
    } catch (err) {
      console.error(err);
      setMessage('Error creating quiz.');
    }
  };

  return (
    <div className="create-quiz">
      <h2>Create a New Quiz</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          required
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
          <button type="button" onClick={addQuestion}>Add Question</button>
          <button type="button" onClick={deleteLastQuestion}>Delete Last Question</button>
        </div>
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;