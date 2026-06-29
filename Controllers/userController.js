import { asyncHandler } from "../Utils/asyncHandler.js";
import User from "../Models/userModel.js";
import ErrorHandler from "../Utils/errorHandler.js";


export const registerUser = asyncHandler(async(req,res,next) => {
    const {userName, userEmail, userMobile, userPassword} = req.body;

    if(!userName || !userEmail || !userMobile || !userPassword){
        throw new ErrorHandler("Please fill all the fields", 400);
    }

    const userExist = await User.findOne({
        $or: [
            {userEmail: userEmail},
            {userMobile: userMobile}
        ]
    });

    if(userExist){
        throw new ErrorHandler("User already exists", 400);
    }

    const user = await User.create({
        userName,
        userEmail,
        userMobile,
        userPassword
    });

    if(!user){
        throw new ErrorHandler("User registration failed", 500);
    }

    return res.status(201).json({
        message: `User ${userName} registered successfully!`,
        success: true
    })
});

// Login User
export const loginUser = asyncHandler(async(req,res,next) => {
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword){
        throw new ErrorHandler("Please fill all the fields", 400);
    }

    const user = await User.findOne({userEmail}).select("+userPassword");

    if(!user){
        throw new ErrorHandler("User not found", 404);
    }
    
    const isPasswordMatched = await user.comparePassword(userPassword);

    if(!isPasswordMatched){
        throw new ErrorHandler("Invalid credentials", 401);
    }

    const token = user.getJWTToken();

    if(!token){
        throw new ErrorHandler("Token generation failed", 500);
    }

    //Pass empty password field in response
    user.userPassword = undefined;

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user,
        token
    })
});


// All Users
export const getAllUsers = asyncHandler(async(req,res,next) => {
    const users = await User.find();

    if(!users){
        throw new ErrorHandler("No users found", 404);
    }

    return res.status(200).json({
        message: "Users fetched successfully",
        success: true,
        users
    })
});