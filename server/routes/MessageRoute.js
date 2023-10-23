import express from 'express'
import { getMessages, sendMessage } from '../controllers/MessageController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/send', sendMessage)
router.post('/find', getMessages)
export default router