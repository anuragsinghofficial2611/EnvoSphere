import express from 'express';
const router = express.Router();
import chatbotController from '../controllers/chatbot.controller'

router.get('/chat',chatbotController);

export default router;
