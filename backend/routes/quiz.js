const express = require("express");
const router = express.Router();
const QuizManager = require("../services/quizManager");
const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
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

// GET specific quiz by objectID
router.get("/api/quizzes/:quizId", async (req, res) => {
  try {
    const quiz = await quizManager.getQuizById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load quiz" });
  }
});

router.put("/api/quizzes/:id", async (req, res) => {
  try {
    await quizManager.updateQuiz(req.params.id, req.body);
    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quiz" });
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
    res.status(204).send();  // 204 No Content if delete successful
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;