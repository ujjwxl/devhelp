import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import ProjectRoute from './routes/ProjectRoute.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("database connection failed")
})

const app = express();
app.use(bodyParser.json({limit: "30mb" , extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log("Listening")
})

app.use('/auth',AuthRoute)
app.use('/project', ProjectRoute)
