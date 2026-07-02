import Note from "../models/notesmodel.js"


export const getNotes = async (req, res, next) => {
    const notes = await Note.find({ user: req.user._id });

    res.json(notes);
}

export const getNoteById = async (req, res, next) => {

    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("Note not found!");
    }

    res.json(note);
}

export const createNote = async (req, res, next) => {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    } else {
        const note = new Note({
            title,
            category,
            content,
            user: req.user._id
        });

        const createdNote = await note.save();

        res.status(201).send(createdNote);
    }
}

export const updateNote = async (req, res, next) => {
    const { title, category, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error("Note not found!");
    }

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action!");
    }

    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();

    res.json(updatedNote);
}

export const deleteNote = async (req, res, next) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('No record found!');
    }

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action!");
    }

    await note.deleteOne();

    return res.json({ message: 'Note deleted successfully!' });
}