import { Router } from 'express';
import { tokenAuthenticator } from '../middlewares/tokenAuthenticator.js';
import { shortenUrl, getUrlById, openUrl } from '../controllers/urlConstrollers.js';
import { shortenUrlValidator } from '../middlewares/urlValidators.js';

const router = Router();

router.post('/urls/shorten', tokenAuthenticator, shortenUrlValidator, shortenUrl);
router.get('/urls/:id', getUrlById);
router.get('/urls/open/:shortUrl', openUrl);

export default router;