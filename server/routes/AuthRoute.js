import express from 'express'
import {  getUserDetails, loginUser, registerUser, updateUserProfile, createRequest, getNotifications, followUser } from '../controllers/AuthController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', updateUserProfile)
router.post('/find', getUserDetails)
router.post('/request', createRequest)
router.get('/notifications/:userId', getNotifications)
router.post('/follow', followUser)
export default router