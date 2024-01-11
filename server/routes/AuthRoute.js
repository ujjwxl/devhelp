import express from 'express'
import {  getUserDetails, loginUser, registerUser, updateUserProfile, createRequest, getNotifications, followUser, searchUsers, getUserChats } from '../controllers/AuthController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
import passport from 'passport';

const CLIENT_URL= "http://localhost:5173/home"

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', verifyToken, updateUserProfile)
router.post('/find', verifyToken, getUserDetails)
router.post('/request', verifyToken, createRequest)
router.get('/notifications/:userId', verifyToken, getNotifications)
router.post('/follow', verifyToken, followUser)
router.get('/search', verifyToken, searchUsers)
router.get('/chats/:userId', verifyToken, getUserChats)

router.get('/keep-alive', (req, res) => {
    console.log('Keep alive request received at', new Date());
    res.status(200).send('Keep alive request successful');
});


router.get("/login/failed", (req, res)=> {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/login/success", (req, res)=> {
    if(req.user){
        console.log(req.user)
        res.status(200).json({
            user: req.user,
        });
    }
    else{
        res.status(401).json({message: "Not authorized"});
    }
    
});
 
router.get('/google', passport.authenticate("google", {scope: ["profile", "email"] }));


router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL, // Replace with your actual client URL
    failureRedirect: '/login', // You can customize this URL
  }), (req, res) => {
    // On successful authentication, send user data to the frontend
    const user = req.user; // This should contain the user data
    // console.log(user);
  
    // Send the success message with user data to the frontend
    res.status(200).json({
      type: 'googleLoginSuccess',
      user: user, // Include the user data here
    });
  });
  



export default router