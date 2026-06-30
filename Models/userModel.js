import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    userMobile: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
        select: false
    },
    userRole: {
        type: String,
        Enum: ["User", "Admin","SuperAdmin","Distributor","DeliveryBoy"],
        default: "User",
        required: true
    },
    userVerified: {
        type: Boolean,
        default: false
    },
    passwordReset: {
        type: Date,
        default: null
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    if(this.isModified("userPassword")|| this.isNew("userPassword")){
        this.userPassword = await bcrypt.hash(this.userPassword, 10);
    }
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.userPassword);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id, role: this.userRole}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

const User = mongoose.model("User", userSchema);

export default User;