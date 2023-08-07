import { Router } from 'express';
import { getMe, getRanking } from '../controllers/userControllers.js';
import { tokenAuthenticator } from '../middlewares/tokenAuthenticator.js';

const router = Router();

router.get('/users/me', tokenAuthenticator, getMe);
router.get('/ranking', getRanking)

export default router;