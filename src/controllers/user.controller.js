import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res)=>{
    

    // get user details from frontend
    // validation
    // check if user already exists 
    // check for images, check for avatar
    // upload them to cloudinary , avatar 
    // create user object 
    // remove password and refresh token field from response
    // return response


     const {fullName, email, username, password}= req.body;
     console.log(fullName, email, username);

     if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
     )
     {
        throw new ApiError(400, " All fields are required")
     }

    const existedUser =  User.findOne({
        $or: [{ username },{ email }]
     })

     if(existedUser)
     {
        throw new ApiError(409,"User with email or UserName already exists")
     }


    //  req.file file option is given by middleware

    console.log("files : ",req,files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImagePath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImagePath);

    if(!avatar){
        throw  new ApiError(400,"avatar file is required" )
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    );

    if(!createdUser)
    {
        throw new ApiError(500, "something went wrong while registering the user");
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser, "user registered successfully")
    )


} )


export {registerUser};