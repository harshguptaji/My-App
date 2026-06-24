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
})