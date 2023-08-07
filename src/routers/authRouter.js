import { Router } from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import { signUpValidator, signInValidator } from '../middlewares/authValidators.js';

const router = Router();

router.post('/signup', signUpValidator, signUp);
router.post('/signin', signInValidator, signIn);

export default router;