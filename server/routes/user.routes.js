import express from 'express';
import { authUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import auth from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { loginUserSchema, registerUserSchema, updateProfileSchema } from '../validators/user.validator.js';
import { loginLimiter, registerLimiter } from '../middleware/rate-limiter.js';

const router = express.Router();

router.post('/register', registerLimiter, validate(registerUserSchema), registerUser);
router.post('/login', loginLimiter, validate(loginUserSchema), authUser);
router.post('/profile', auth, validate(updateProfileSchema), updateUserProfile);

export default router;