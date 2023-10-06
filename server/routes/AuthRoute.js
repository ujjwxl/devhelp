import express from 'express'
import {  getUserDetails, loginUser, registerUser, updateUserProfile } from '../controllers/AuthController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', updateUserProfile)
router.post('/find', getUserDetails)
export default router