import express from "express";
import { connectDB } from "./db_connect.js";
import dotenv from "dotenv";

dotenv.config({silent: true});

// Connect to MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});