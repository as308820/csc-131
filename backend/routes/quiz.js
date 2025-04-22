const express = require("express");
const router = express.Router();
const QuizManager = require("../services/quizManager");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

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
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("quizDB");
    const collection = db.collection("quizzes");

    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    client.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;