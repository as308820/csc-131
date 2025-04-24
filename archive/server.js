// server.js
const express = require("express");
const cors = require("cors");
const QuizManager = require("../backend/testMongo"); // your QuizManager file

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const quizManager = new QuizManager();

// Route to get all quizzes
app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await quizManager.loadQuizData();
        res.json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load quizzes");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

