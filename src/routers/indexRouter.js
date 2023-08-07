import { Router } from 'express';
import userRouter from './authRouter.js';
import urlRouter from './urlRouter.js';

const router = Router();
router.use(userRouter);
router.use(urlRouter);

export default router;