
import express from 'express';
// import { config } from 'dotenv';
//          OR
import 'dotenv/config';

// config(); // Load variable from .env

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (req, res, next) => {
    res.send("Welcome to the Express Application.");
});

app.get("/api/notes", (req, res, next) => {
    res.json({_id: 1, title: "Day 1 of coaching", content: "I revised the computer basics", category: "Learning"});
});

app.get("/api/notes/:id", (req, res, next) => {
    const id = req.params.id;

    res.send(`Id with ${id} will be fetched now!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});