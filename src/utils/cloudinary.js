import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

import fs from 'fs';
dotenv.config({path:'.env'});

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    
});

const uploadOnCloudinary = async (localFilePath) =>{

    try {
        if(!localFilePath) return null;
        // upload file on cloudinary 

        const response = await cloudinary.uploader.upload
        (localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null
    }
}

export {uploadOnCloudinary};