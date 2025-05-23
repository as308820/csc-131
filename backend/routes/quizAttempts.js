const express = require('express');
const router = express.Router();
const QuizAttempt = require('../models/QuizAttempt');
const QuizManager = require('../services/quizManager');
const quizManager = new QuizManager();
const requireAuth = require('../middleware/requireAuth');

// GET /api/attempts/:quizId (Start or Resume Attempt)
router.get('/:quizId', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;
  const User = require('../models/User'); 

  console.log("req.user:", req.user); 
  console.log("quizId:", quizId);      

  try {
    const quiz = await quizManager.getQuizById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let attempt = await QuizAttempt.findOne({ userId, quizId });
    console.log("Existing attempt:", attempt); 

    const now = new Date();
    const quizEndTime = attempt ? new Date(attempt.startTime.getTime() + quiz.duration * 60000) : null;

    if (!attempt) {
      console.log("No existing attempt found. Creating new attempt...");
      attempt = await QuizAttempt.create({ userId, quizId, startTime: now });
      console.log("Created attempt:", attempt);  
    } else if (!attempt.submitted && quizEndTime <= now) {
      console.log("Attempt expired. Auto-submitting...");  
      attempt.submitted = true;
      attempt.endTime = quizEndTime;
      await attempt.save();
      console.log("Attempt auto-submitted:", attempt);  
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

// GET /api/attempts (List all attempts for the current user)
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const attempts = await QuizAttempt.find({ userId });
    res.json(attempts);
  } catch (error) {
    console.error('Error fetching attempts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/attempts/:quizId/review (Review specific attempt)
router.get('/:quizId/review', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;

  try {
    const attempt = await QuizAttempt.findOne({ userId, quizId });
    if (!attempt || !attempt.submitted) {
      return res.status(400).json({ error: 'Attempt not found or not submitted' });
    }

    const quiz = await quizManager.getQuizById(quizId);

    // Calculate total points
    let totalPoints = 0;
    let earnedPoints = 0;
    quiz.questions.forEach((question, idx) => {
      totalPoints += question.points;
      if (parseInt(attempt.answers[idx]) === question.correctAnswer) { 
        earnedPoints += question.points;
      }
    });

    res.json({
      quizTitle: quiz.quizTitle,
      earnedPoints,
      totalPoints,
      startTime: attempt.startTime,
      endTime: attempt.endTime
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/attempts/quiz/:quizId (Admin view of all attempts for a quiz)
router.get('/quiz/:quizId', requireAuth, async (req, res) => {
  const { quizId } = req.params;

  try {
    const attempts = await QuizAttempt.find({ quizId, submitted: true }).populate({ path: 'userId', model: 'users', select: 'name email' })
    const quiz = await quizManager.getQuizById(quizId);

    const results = attempts.map(attempt => {
      let totalPoints = 0;
      let earnedPoints = 0;
      quiz.questions.forEach((question, idx) => {
        totalPoints += question.points;
        if (parseInt(attempt.answers[idx]) === question.correctAnswer) { 
          earnedPoints += question.points;
        }
      });

      return {
        user: attempt.userId.name || attempt.userId.email,
        earnedPoints,
        totalPoints,
        startTime: attempt.startTime,
        endTime: attempt.endTime
      };
    });

    res.json({
      quizTitle: quiz.quizTitle,
      results
    });
  } catch (error) {
    console.error('Error fetching aggregated results:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/attempts/:quizId/submit
router.post('/:quizId/submit', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;
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

router.post('/:quizId/save-progress', requireAuth, async (req, res) => {
  const { quizId } = req.params;
  const userId = req.user.id;
  const { answers } = req.body;

  try {
    const attempt = await QuizAttempt.findOne({ userId, quizId });
    if (!attempt || attempt.submitted) {
      return res.status(400).json({ error: 'Attempt not found or already submitted' });
    }

    attempt.answers = answers;  // Save partial answers
    await attempt.save();

    res.json({ message: 'Progress saved successfully' });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;