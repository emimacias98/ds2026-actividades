import { Router } from 'express';
import { login, registro, yo } from '../controllers/authController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registroSchema } from '../validations/auth.validation.js';

const router = Router();

router.post('/registro', validate(registroSchema), asyncHandler(registro));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.get('/yo', authenticate, yo);

export default router;