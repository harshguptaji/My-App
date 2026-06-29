import express from "express";

import { registerUser,loginUser, getAllUsers } from "../Controllers/userController.js";
import { isAuthenticated, authorizeRoles } from "../Middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", isAuthenticated, authorizeRoles("Admin"),getAllUsers);


export default router;