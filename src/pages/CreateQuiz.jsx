import { useState } from 'react';
import './CreateQuiz.css';
import axios from '../axios';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(0);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctAnswer: 0, points: 1 }
    ]);
  };

  const deleteLastQuestion = () => {
    setQuestions(questions.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/quizzes', { quizTitle, duration, questions });
      setMessage('Quiz created successfully!');
      setQuizTitle('');
      setDuration(0);
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
        <label>Duration (minutes):</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
          placeholder="Enter duration in minutes"
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

            <label>Points:</label>
            <input
              type="number"
              value={q.points}
              min="1"
              onChange={(e) => {
                const updated = [...questions];
                updated[idx].points = parseInt(e.target.value, 10) || 1;
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
          <button
            type="button"
            className="delete-question"
            onClick={deleteLastQuestion}
          >
            Delete Last Question
          </button>
        </div>
        <div className="save-quiz-container">
          <button type="submit" className="submit-quiz-button">
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
