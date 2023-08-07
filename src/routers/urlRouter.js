import { Router } from 'express';
import { tokenAuthenticator } from '../middlewares/tokenAuthenticator.js';
import { shortenUrl } from '../controllers/urlConstrollers.js';
import { shortenUrlValidator } from '../middlewares/urlValidators.js';

const router = Router();

router.post('/urls/shorten', tokenAuthenticator, shortenUrlValidator, shortenUrl);

export default router;