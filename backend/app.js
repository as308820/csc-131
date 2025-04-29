const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Load QuizManager class
const QuizManager = require("./services/quizManager");
const quizManager = new QuizManager();

<<<<<<< HEAD
=======
// Load authentication logic
const authRoutes = require('./routes/auth');

>>>>>>> 8d27519 (Final project)
// Initialize app
const app = express();

// Middleware
app.use(morgan("dev"));
<<<<<<< HEAD
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

=======
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));              // Handles normal requests (GET, POST, etc.)
app.options('*', cors(corsOptions));  
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRoutes);



>>>>>>> 8d27519 (Final project)
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// route from previous server.js logic
app.get("/api/quizzes", async (req, res) => {
  try {
    const quizzes = await quizManager.loadQuizData();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load quizzes");
  }
});

// external routes
const quizRoutes = require('./routes/quiz');
<<<<<<< HEAD
app.use(quizRoutes);
=======
const quizAttemptRoutes = require('./routes/quizAttempts');
app.use(quizRoutes);
app.use('/api/attempts', quizAttemptRoutes);
>>>>>>> 8d27519 (Final project)

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
