const express = require('express');
const router = express.Router();
const QuizAttempt = require('../models/QuizAttempt');
const quizManager = require('../services/quizManager');
const requireAuth = require('../middleware/requireAuth');

// GET /api/attempts/:quizId (Start or Resume Attempt)
router.get('/:quizId', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user._id;

  try {
    const quiz = await quizManager.getQuizById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let attempt = await QuizAttempt.findOne({ userId, quizId });

    const now = new Date();
    const quizEndTime = attempt ? new Date(attempt.startTime.getTime() + quiz.duration * 60000) : null;

    if (!attempt) {
      // Create new attempt
      attempt = await QuizAttempt.create({ userId, quizId, startTime: now });
    } else if (!attempt.submitted && quizEndTime <= now) {
      // Auto-submit if expired
      attempt.submitted = true;
      attempt.endTime = quizEndTime;
      await attempt.save();
    }

    res.json({
      startTime: attempt.startTime,
      submitted: attempt.submitted,
      answers: attempt.answers || [],
      duration: quiz.duration
    });
  } catch (error) {
    console.error('Error fetching attempt:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/attempts/:quizId/submit
router.post('/:quizId/submit', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user._id;
  const { answers } = req.body;

  try {
    const attempt = await QuizAttempt.findOne({ userId, quizId });
    if (!attempt || attempt.submitted) return res.status(400).json({ error: 'Attempt not found or already submitted' });

    attempt.answers = answers;
    attempt.submitted = true;
    attempt.endTime = new Date();
    await attempt.save();

    res.json({ message: 'Quiz submitted successfully' });
  } catch (error) {
    console.error('Error submitting attempt:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;