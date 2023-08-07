import { Router } from 'express';
import { getMe } from '../controllers/userControllers.js';
import { tokenAuthenticator } from '../middlewares/tokenAuthenticator.js';

const router = Router();

router.get('/users/me', tokenAuthenticator, getMe);

export default router;