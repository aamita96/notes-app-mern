
import express from 'express';
// import { config } from 'dotenv';
//          OR
import 'dotenv/config';
import { connectDB } from "./config/dbconfig.js";

// config(); // Load variable from .env

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

const notes = [
    {
        _id: "1",
        title: "Day 1 of college",
        content:
            "I made a few new friends and introduced myself to a lot of new teachers.",
        category: "College",
    },
    {
        _id: "2",
        title: "Learned some Node JS",
        content: "Learned how to create a server in node JS and my first API",
        category: "Learning",
    },
    {
        _id: "3",
        title: "Watched some Anime",
        content: "Finished 2 seasons of Attack on Titan and My Hero academia.",
        category: "Entertainment",
    },
    {
        _id: 4,
        title: "Started React JS",
        content:
            "Made my first App in React JS, feels awesome to learn something new. I aim to be a full stack dev someday",
        category: "Learning",
    },
];

app.get("/", (req, res, next) => {
    res.send("Welcome to the Express Application.");
});

app.get("/api/notes", (req, res, next) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res, next) => {
    const id = req.params.id;
    const note = notes.find(note => Number(note._id) === Number(id));

    res.json(note);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});