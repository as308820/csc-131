// server.js
const express = require("express");
const cors = require("cors");
const QuizManager = require("./testMongo"); // your QuizManager file

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const quizManager = new QuizManager();

// Route to get all quizzes
app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await quizManager.loadQuizData();

        // Clone and apply random selection if needed
        const quizzesWithRandomSubset = quizzes.map(quiz => {
            if (
                quiz.numQuestionsToShow &&
                quiz.numQuestionsToShow < quiz.questions.length
            ) {
                // Randomly shuffle and slice
                const shuffled = [...quiz.questions].sort(() => 0.5 - Math.random());
                quiz.questions = shuffled.slice(0, quiz.numQuestionsToShow);
            }
            return quiz;
        });

        res.json(quizzesWithRandomSubset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load quizzes");
    }
});

app.post("/api/quizzes", async (req, res) => {
    try {
        const quiz = req.body;
        await quizManager.createQuiz(quiz);
        res.status(201).json({ message: "Quiz created successfully!" });
    } catch (err) {
        console.error("Failed to create quiz:", err);
        res.status(500).json({ error: "Failed to create quiz" });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

