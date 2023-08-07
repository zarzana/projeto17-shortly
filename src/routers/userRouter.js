import { Router } from 'express';
import { signUp, signIn } from '../controllers/userControllers.js';
import { signUpValidator, signInValidator } from '../middlewares/userValidators.js';

const router = Router();

router.post('/signup', signUpValidator, signUp);
router.post('/signin', signInValidator, signIn);

export default router;