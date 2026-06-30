import mongoose from "mongoose";


const distributorSchema = new mongoose.Schema({
    distributorName: {
        type: String,
        required: true
    },
    distributorDescription: {
        type: String,
    },
    distributorGST: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    distributorAddress: {
        type: String,
        required: true
    },
    distributorCity: {
        type: String,
        required: true
    },
    distributorPincode: {
        type: String,
        required: true
    },
    distributorEmployee: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    distributorTotalProducts:{
        type: Number,
        default: 0
    },
    distributorCredLimit: {
        type: Number,
        default: 10
    },
    distributorStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
        required: true
    }

},{timestamps: true});

const Distributor = mongoose.model("Distributor", distributorSchema);

export default Distributor;