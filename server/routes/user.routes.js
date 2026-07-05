import express from 'express';
import { authUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/profile', auth, updateUserProfile);

export default router;