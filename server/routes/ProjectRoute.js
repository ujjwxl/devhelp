import express from 'express';
import { addProject, getAllProjects, getProjectsByUser, getWorkingProjectsByUser, getProject, acceptRequest, declineRequest, saveProject, getSavedProjects, getAbandonedProjects, getCollaborateProjects, removeNotification } from '../controllers/ProjectController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

// Route to add a new project
router.post('/add', verifyToken, addProject);

// Route to get all projects
router.get('/all', getAllProjects);

// Route to get projects uploaded by a specific user
router.get('/user/:userId', verifyToken, getProjectsByUser);
router.get('/working/:userId', verifyToken, getWorkingProjectsByUser);
router.get('/get/:projectId', verifyToken, getProject);

router.post('/accept', verifyToken, acceptRequest);
router.post('/decline', verifyToken, declineRequest);
router.delete('/remove/:notificationId', verifyToken, removeNotification);

router.post('/save', verifyToken, saveProject);
router.get('/saved/:userId', verifyToken, getSavedProjects);
router.get('/abandoned', verifyToken, getAbandonedProjects);
router.get('/collab', verifyToken, getCollaborateProjects);


export default router;
