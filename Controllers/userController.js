import { asyncHandler } from "../Utils/asyncHandler.js";
import ErrorHandler from "../Utils/errorHandler.js";


export const registerUser = asyncHandler(async(req,res,next) => {
    const {userName, userEmail, userMobile, userPassword} = req.body;
    console.log("test")

    if(!userName || !userEmail || !userMobile || !userPassword){
        throw new ErrorHandler("Please fill all the fields", 400);
    }

    return res.status(201).json({
        message: `User ${userName} registered successfully!`,
        success: true
    })
})