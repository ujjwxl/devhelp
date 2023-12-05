import express from 'express'
import { getMessages, sendMessage } from '../controllers/MessageController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/send', verifyToken, sendMessage)
router.post('/find', verifyToken, getMessages)
export default router