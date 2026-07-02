import express from 'express';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/note.controller.js';
import auth from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', auth, getNotes);

router.get('/:id', getNoteById);

router.post('/create', auth, createNote);

router.put('/:id', auth, updateNote);

router.delete('/:id', auth, deleteNote);

export default router;
