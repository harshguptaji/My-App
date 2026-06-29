import express from "express";
import { connectDB } from "./db_connect.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./Middleware/errorMiddleware.js";
import userRoute from "./Routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config({silent: true, debug: true, path: "./.env"});

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// APIS
app.use("/api/v1/user", userRoute);;


// Error Middleware should be LAST
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});