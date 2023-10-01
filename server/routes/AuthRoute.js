import express from 'express'
import {  loginUser, registerUser } from '../controllers/AuthController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
export default router