// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import bodyParser from 'body-parser'
// import multer from 'multer'
// import cors from 'cors'
// import AuthRoute from './routes/AuthRoute.js'
// import ProjectRoute from './routes/ProjectRoute.js'
// import MessageRoute from './routes/MessageRoute.js'

// dotenv.config();

// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>{
//     console.log("mongodb connected")
// })
// .catch(()=>{
//     console.log("database connection failed")
// })

// const app = express();
// app.use(bodyParser.json({limit: "30mb" , extended: true}))
// app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
// app.use(cors());

// app.listen(process.env.PORT,()=>{
//     console.log("Listening")
// })

// app.use('/auth',AuthRoute)
// app.use('/project', ProjectRoute)
// app.use('/message', MessageRoute)

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import multer from 'multer'
import cron from 'node-cron'
import axios from 'axios'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import ProjectRoute from './routes/ProjectRoute.js'
import MessageRoute from './routes/MessageRoute.js'
import session from 'express-session';

import http from 'http';  //docs
import { Server } from 'socket.io'; //docs
import passport from 'passport'
import './passport.js'


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("database connection failed")
})

const app = express();

app.use(session({
  secret: 'mysecretkey', 
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));

const CLIENT_ORIGIN = 'http://localhost:5173'; // Update with your React app's origin

// Set up CORS options
const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "public/assets");
  },

  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage })


const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "http://localhost:5173" , credentials: true}});

// global.onlineUsers = new Map();

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log(`A user connected : ${socket.id}`);  
    global.chatSocket = socket;

    // socket.on("add_user", (userId) => {
    //   onlineUsers.set(userId, socket.id);
    // })

    socket.on("add_user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
 
    console.log(onlineUsers)

    socket.on("send_message", (data) => {
      // console.log(data)
      const sendUserSocket = onlineUsers.get(data.to)
      console.log(sendUserSocket)
      if(sendUserSocket) {
        socket.to(sendUserSocket).emit("receive_message", data.msg)
      }
    })
});

const keepBackendAwake = async () => {
  try {
      const response = await axios.get('http://localhost:5000/auth/keep-alive');
      console.log(response.data);
  } catch (error) {
      console.error('Error making keep-alive request:', error.message);
  }
};

cron.schedule('*/10 * * * *', keepBackendAwake);
// cron.schedule('*/30 * * * * *', keepBackendAwake);

server.listen(process.env.PORT, () => {
    console.log("Listening");
  });

app.use('/auth/image', upload.single('profilePicture'));
// app.use('/project/image', upload.single('profilePicture'));

app.use('/project/image', upload.array('projectImagesArray', 3), (req, res) => {
  // Access uploaded images via req.files
  console.log('Uploaded project images:', req.files);
  // Process and store the images in your database or file system
  // Respond with success or error messages as needed
});


app.use('/auth', AuthRoute)
app.use('/project', ProjectRoute)
app.use('/message',MessageRoute)
