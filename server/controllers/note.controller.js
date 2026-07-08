import Note from "../models/notesmodel.js"


export const getNotes = async (req, res, next) => {
    const notes = await Note.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.json(notes);
}

export const getNoteById = async (req, res, next) => {

    const note = await Note.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!note) {
        res.status(404)
        throw new Error("Note not found!");
    }

    res.json(note);
}

export const createNote = async (req, res, next) => {
    const { title, category, content } = req.body;

    const note = new Note({
        title,
        category,
        content,
        user: req.user._id
    });

    const createdNote = await note.save();

    res.status(201).send(createdNote);
}

export const updateNote = async (req, res, next) => {
    const { title, category, content } = req.body;

    const note = await Note.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!note) {
        res.status(404);
        throw new Error("Note not found!");
    }

    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();

    res.json(updatedNote);
}

export const deleteNote = async (req, res, next) => {
    const note = await Note.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!note) {
        res.status(404);
        throw new Error('No record found!');
    }

    await note.deleteOne();

    return res.json({ message: 'Note deleted successfully!' });
}