import mongoose from "mongoose";

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



const User = mongoose.model("User", userSchema);

export default User;