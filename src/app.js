import express  from 'express'
import  cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin:process.env.cor
}))

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());



//routes import 

import userRouter from './routes/user.routes.js';

console.log("hello")

// routes declaration

app.use("/api/v1/users",userRouter);

export {app} ;