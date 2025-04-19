import cookieParser from 'cookie-parser'
import express from 'express'   
import cors from 'cors';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({
    limit:"16kb",    
    extended:true
}))
app.use(express.static("public"))
app.use(cookieParser())

// console.log(process.env.CLOUDINARY_API_KEY);
//router import 

import userRouter from "./routes/user.route.js"
import { v4 as uuidv4 } from 'uuid';

//router decleration

app.use("/api/v1/users", userRouter)

app.get('/api/v1/newRoomId', (req, res) => {
    const roomId = uuidv4();
    res.json({ roomId });
});



export { app }
