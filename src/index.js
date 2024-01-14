import dotenv from 'dotenv';
import connectDB  from './dbConnction/database.js';
import express from 'express';
import {app} from './app.js'

dotenv.config({
    path:'.env'
})



const PORT  = process.env.PORT || 5000;
console.log(PORT)
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port : ${PORT}`);

    })
   
    // app.on((error)=>{
    //     console.log("ERROR: ",error);
    //     throw error;
    // })

})
.catch((e)=>{
    console.log("Mongo db connection failed! ",e);
})