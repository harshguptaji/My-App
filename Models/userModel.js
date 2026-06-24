import mongoose from "mongoose";

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
        required: true
    },
    userRole: {
        type: String,
        Enum: ["User", "Admin","SuperAdmin","Distributor","DeliveryBoy"],
        default: "User",
        required: true
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    if(this.isModified("userPassword")|| this.isNew("userPassword")){
        this.userPassword = await bcrypt.hash(this.userPassword, 10);
    }
});

const User = mongoose.model("User", userSchema);

export default User;