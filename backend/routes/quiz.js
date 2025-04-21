const express = require("express");
const router = express.Router();
const QuizManager = require("../services/quizManager");

const quizManager = new QuizManager();

// GET all quizzes
router.get("/api/quizzes", async (req, res) => {
  try {
    const quizzes = await quizManager.loadQuizData();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load quizzes" });
  }
});

// POST a new quiz
router.post("/api/quizzes", async (req, res) => {
  try {
    await quizManager.createQuiz(req.body);
    res.status(201).json({ message: "Quiz created" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save quiz" });
  }
});

// DELETE a quiz
router.delete("/api/quizzes/:id", async (req, res) => {
  try {
    await quizManager.deleteQuiz(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;