import mongoose from 'mongoose';

import {DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try{

        const dbConnection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MOngo Db connection at Host : ${dbConnection.connection.host}`);
    }
    catch(e){
        console.log("MongoDB connection error : ", e.message );
        process.exit(1);
    }
}


export default connectDB;