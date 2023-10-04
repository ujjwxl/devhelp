import express from 'express'
// import {  loginUser, registerUser } from '../controllers/AuthController.js';
import { addProject } from '../controllers/ProjectController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addProject)
export default router