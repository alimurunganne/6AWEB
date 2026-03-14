const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "MyDb";
const PORT = 5038;

let db = null;

async function connectAndLaunch() {
  try {
    console.log("Initializing server...");
    console.log("Attempting MongoDB connection...");

    const client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    db = client.db(DB_NAME);

    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`API is live at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

connectAndLaunch();


// ================= ENDPOINTS =================


// FETCH ALL BOOKS
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ message: "Database unavailable" });

    const books = await db.collection("Books").find({}).toArray();
    res.json(books);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Unable to retrieve books" });
  }
});


// CREATE BOOK
app.post("/api/books/AddBook", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ message: "Database unavailable" });

    const book = {
      id: Date.now().toString(),
      title: req.body.title,
      desc: req.body.desc,
      price: Number(req.body.price),
      author: req.body.author,
      category: req.body.category
    };

    await db.collection("Books").insertOne(book);
    res.json({ message: "Book created successfully" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Unable to create book" });
  }
});


// MODIFY BOOK
app.put("/api/books/UpdateBook", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ message: "Database unavailable" });

    const { id } = req.query;

    await db.collection("Books").updateOne(
      { id },
      {
        $set: {
          title: req.body.title,
          desc: req.body.desc,
          price: Number(req.body.price),
          author: req.body.author,
          category: req.body.category
        }
      }
    );

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Unable to update book" });
  }
});


// REMOVE BOOK
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    if (!db) return res.status(500).json({ message: "Database unavailable" });

    await db.collection("Books").deleteOne({ id: req.query.id });
    res.json({ message: "Book removed successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Unable to remove book" });
  }
});