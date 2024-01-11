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
import { v2 as cloudinary } from "cloudinary";
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

import userModel from './models/userModel.js'
import projectModel from './models/projectModel.js'


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

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, "public/assets");
//   },

//   filename: function(req, file, cb) {
//       cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage })

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});


const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "http://localhost:5173" , credentials: true}});


const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log(`A user connected : ${socket.id}`);  
    global.chatSocket = socket;

    socket.on("add_user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
 
    console.log(onlineUsers)

    socket.on("send_message", (data) => {
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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

server.listen(process.env.PORT, () => {
    console.log("Listening");
  });

// app.use('/auth/image', upload.single('profilePicture'));

// app.use('/project/image', upload.array('projectImagesArray', 3), (req, res) => {
//   console.log('Uploaded project images:', req.files);
// });

app.post("/auth/image/:userId", upload.single('profilePicture'), async (req, res) => {
  try {

    const userId = req.params.userId;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    await userModel.findByIdAndUpdate(userId, { profile_picture: cldRes.public_id });
    
    res.json(cldRes);
    console.log(cldRes)
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

// app.post("/project/image", upload.array('projectImagesArray', 3), async (req, res) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//     console.log(cldRes)
//   } catch (error) {
//     console.log(error);
//     res.send({
//       message: error.message,
//     });
//   }
// });

// app.post("/project/image/:projectId", upload.array('projectImagesArray', 3), async (req, res) => {

//   const projectId = req.params.projectId;

//   try {
//     // Check if files are present in the request
//     if (!req.files || req.files.length === 0) {
//       throw new Error("No files uploaded");
//     }

//     // Assuming you want to handle each file in the array
//     const cloudinaryResponses = await Promise.all(
//       req.files.map(async (file) => {
//         const b64 = Buffer.from(file.buffer).toString("base64");
//         const dataURI = "data:" + file.mimetype + ";base64," + b64;
//         return await handleUpload(dataURI);
//       })
//     );

//     res.json(cloudinaryResponses);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       message: error.message,
//     });
//   }
// });

// app.post("/project/image/:projectId", upload.array('projectImagesArray', 3), async (req, res) => {
//   const projectId = req.params.projectId;

//   try {
//     // Check if files are present in the request
//     if (!req.files || req.files.length === 0) {
//       throw new Error("No files uploaded");
//     }

//     // Assuming you want to handle each file in the array
//     const cloudinaryResponses = await Promise.all(
//       req.files.map(async (file, index) => {
//         const b64 = Buffer.from(file.buffer).toString("base64");
//         const dataURI = "data:" + file.mimetype + ";base64," + b64;
//         const cldRes = await handleUpload(dataURI);
//         console.log(cldRes)

//         // Update the corresponding project image field based on the index
//         const updateField = `projectImage${index + 1}`;
//         await projectModel.findByIdAndUpdate(projectId, { [updateField]: cldRes.public_id });

//         return cldRes;
//       })
//     );

//     res.json(cloudinaryResponses);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       message: error.message,
//     });
//   }
// });

// app.post("/project/image/:projectId", upload.array('projectImagesArray', 3), async (req, res) => {
//   const projectId = req.params.projectId;

//   try {
//     // Check if files are present in the request
//     if (!req.files || req.files.length === 0) {
//       throw new Error("No files uploaded");
//     }

//     // Assuming you want to handle each file in the array
//     const cloudinaryResponses = await Promise.all(
//       req.files.map(async (file, index) => {
//         const b64 = Buffer.from(file.buffer).toString("base64");
//         const dataURI = "data:" + file.mimetype + ";base64," + b64;
//         return await handleUpload(dataURI);
//       })
//     );

//     // Assuming cloudinaryResponses contains the public IDs of the uploaded images
//     const [publicIdOne, publicIdTwo, publicIdThree] = cloudinaryResponses;

//     // Update the project model with the public IDs
//     const updatedProject = await projectModel.findByIdAndUpdate(
//       projectId,
//       {
//         projectImageOne: publicIdOne,
//         projectImageTwo: publicIdTwo,
//         projectImageThree: publicIdThree,
//       },
//       { new: true }
//     );

//     res.json(updatedProject);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       message: error.message,
//     });
//   }
// });

app.post("/project/image/:projectId", upload.array('projectImagesArray', 3), async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
      throw new Error("No files uploaded");
    }

    // Assuming you want to handle each file in the array
    const cloudinaryResponses = await Promise.all(
      req.files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        return await handleUpload(dataURI);
      })
    );

    // Extract public_ids from the Cloudinary response objects
    const [publicIdOne, publicIdTwo, publicIdThree] = cloudinaryResponses.map(response => response.public_id);

    // Update the project model with the public IDs
    const updatedProject = await projectModel.findByIdAndUpdate(
      projectId,
      {
        projectImageOne: publicIdOne,
        projectImageTwo: publicIdTwo,
        projectImageThree: publicIdThree,
      },
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});




app.use('/auth', AuthRoute)
app.use('/project', ProjectRoute)
app.use('/message',MessageRoute)
