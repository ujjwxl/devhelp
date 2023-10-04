import express from 'express'
// import {  loginUser, registerUser } from '../controllers/AuthController.js';
import { addProject, getAllProjects } from '../controllers/ProjectController.js';
// import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', addProject)
router.get('/all', getAllProjects)
export default router