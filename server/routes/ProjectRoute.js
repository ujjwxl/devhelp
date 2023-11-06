import express from 'express';
import { addProject, getAllProjects, getProjectsByUser, getWorkingProjectsByUser, getProject, acceptRequest, declineRequest, saveProject, getSavedProjects, getAbandonedProjects, getCollaborateProjects } from '../controllers/ProjectController.js';

const router = express.Router();

// Route to add a new project
router.post('/add', addProject);

// Route to get all projects
router.get('/all', getAllProjects);

// Route to get projects uploaded by a specific user
router.get('/user/:userId', getProjectsByUser);
router.get('/working/:userId', getWorkingProjectsByUser);
router.get('/get/:projectId', getProject);

router.post('/accept', acceptRequest);
router.post('/decline', declineRequest);

router.post('/save', saveProject);
router.get('/saved/:userId', getSavedProjects);
router.get('/abandoned', getAbandonedProjects);
router.get('/collab', getCollaborateProjects);


export default router;
