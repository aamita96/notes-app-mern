import express from 'express';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/note.controller.js';
import auth from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { createNoteSchema, noteIdSchema, updateNoteSchema } from '../validators/note.validator.js';
const router = express.Router();

router.get('/', auth, getNotes);

router.get('/:id', auth, validate(noteIdSchema, "params"), getNoteById);

router.post('/create', auth, validate(createNoteSchema), createNote);

router.put('/:id', auth, validate(noteIdSchema, "params"), validate(updateNoteSchema), updateNote);

router.delete('/:id', auth, validate(noteIdSchema, "params"), deleteNote);

export default router;
