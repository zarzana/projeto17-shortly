import { Router } from 'express';
import { signUp } from '../controllers/userControllers.js';
import { signUpValidator } from '../middlewares/userValidators.js';

const router = Router();

router.post('/signup', signUpValidator, signUp);

export default router;