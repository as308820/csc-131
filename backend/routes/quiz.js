const express = require("express");
const router = express.Router();
const QuizManager = require("../services/quizManager");
const { MongoClient, ObjectId } = require("mongodb");
<<<<<<< HEAD
const uri = "mongodb://127.0.0.1:27017";

=======
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
>>>>>>> 8d27519 (Final project)
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

<<<<<<< HEAD
=======
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
    await quizManager.editQuiz(req.params.id, req.body);
    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

>>>>>>> 8d27519 (Final project)
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
<<<<<<< HEAD
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
=======
    await quizManager.deleteQuiz(req.params.id);
    res.status(204).send();  // 204 No Content if delete successful
>>>>>>> 8d27519 (Final project)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

module.exports = router;