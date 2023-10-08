import express from 'express';
import { addProject, getAllProjects, getProjectsByUser } from '../controllers/ProjectController.js';

const router = express.Router();

// Route to add a new project
router.post('/add', addProject);

// Route to get all projects
router.get('/all', getAllProjects);

// Route to get projects uploaded by a specific user
router.get('/user/:userId', getProjectsByUser);

export default router;
