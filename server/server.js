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

app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


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

server.listen(process.env.PORT, () => {
    console.log("Listening");
  });

app.use('/auth', AuthRoute)
app.use('/project', ProjectRoute)
app.use('/message',MessageRoute)
