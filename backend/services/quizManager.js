const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
<<<<<<< HEAD
=======
const db = client.db("quizDB");
>>>>>>> 8d27519 (Final project)

class QuizManager {
    constructor(dbName = "quizDB") {
        this.dbName = dbName;
    }

    async connect() {
        await client.connect();
        return client.db(this.dbName);
    }

<<<<<<< HEAD
=======
    // Load quiz by id
    async getQuizById(quizId) {
        try {
          const db = await this.connect();
          const quizzes = db.collection("quizzes");
      
          const quiz = await quizzes.findOne({ _id: new ObjectId(quizId) });
          return quiz;
        } catch (error) {
          console.error("Failed to fetch quiz by ID:", error);
        } finally {
          await client.close();
        }
      }

>>>>>>> 8d27519 (Final project)
    // Load all quizzes from the database
    async loadQuizData() {
        try {
            const db = await this.connect();
            const quizzes = db.collection("quizzes");

            const quizList = await quizzes.find().toArray();
            console.log("Loaded Quizzes:", quizList);
            return quizList;
        } catch (error) {
            console.error("Failed to load quizzes:", error);
        } finally {
            await client.close();
        }
    }

    // Save a new quiz to the database
    async saveQuizData(quiz) {
        try {
            const db = await this.connect();
            const quizzes = db.collection("quizzes");

            const result = await quizzes.insertOne(quiz);
            console.log(`Quiz "${quiz.title}" saved successfully with _id: ${result.insertedId}`);
        } catch (error) {
            console.error("Failed to save quiz:", error);
        } finally {
            await client.close();
        }
    }

    // Randomize the order of questions in a quiz
    async randomizeQuestions(quizId) {
        try {
            const db = await this.connect();
            const quizzes = db.collection("quizzes");

            const quiz = await quizzes.findOne({ _id: new ObjectId(quizId) });

            if (!quiz) {
                console.log("Quiz not found.");
                return;
            }

            quiz.questions = quiz.questions.sort(() => Math.random() - 0.5);

            await quizzes.updateOne(
                { _id: new ObjectId(quizId) },
                { $set: { questions: quiz.questions } }
            );

            console.log(`Questions for Quiz "${quiz.title}" randomized successfully!`);
        } catch (error) {
            console.error("Failed to randomize questions:", error);
        } finally {
            await client.close();
        }
    }

    // Create a new quiz
    async createQuiz(quiz) {
        return await this.saveQuizData(quiz);
    }

    // Edit an existing quiz
    async editQuiz(quizId, updatedData) {
        try {
            const db = await this.connect();
            const quizzes = db.collection("quizzes");

            const result = await quizzes.updateOne(
                { _id: new ObjectId(quizId) },
                { $set: updatedData }
            );

            if (result.matchedCount > 0) {
                console.log(`Quiz "${quizId}" updated successfully!`);
            } else {
                console.log("Quiz not found.");
            }
        } catch (error) {
            console.error("Failed to edit quiz:", error);
        } finally {
            await client.close();
        }
    }

    // Delete a quiz
    async deleteQuiz(quizId) {
        try {
            const db = await this.connect();
            const quizzes = db.collection("quizzes");

            const result = await quizzes.deleteOne({ _id: new ObjectId(quizId) });

            if (result.deletedCount > 0) {
                console.log(`Quiz "${quizId}" deleted successfully!`);
            } else {
                console.log("Quiz not found.");
            }
        } catch (error) {
            console.error("Failed to delete quiz:", error);
        } finally {
            await client.close();
        }
    }
}

module.exports = QuizManager;
