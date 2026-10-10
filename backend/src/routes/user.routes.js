import express from 'express';
const router = express.Router();
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getUser } from '../controllers/user.controller.js';

router.get('/get/',verifyJWT,getUser);

export default router;