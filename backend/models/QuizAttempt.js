const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  submitted: { type: Boolean, default: false },
  answers: { type: [String], default: [] }  // Adjust type if needed
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);