import express from "express";
import {getAllUsers,getUserById ,createUser,loginUser,refreshAccessToken,forgotPassword,resetPassword} from "../controllers/user.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"
import { authorizationMiddleware } from "../middleware/authorization.middleware.js";
const router = express.Router()
router.get("/getAllUsers",authMiddleware,authorizationMiddleware,getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getUserById", getUserById);
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/refreshAccessToken",refreshAccessToken);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);
export {router}