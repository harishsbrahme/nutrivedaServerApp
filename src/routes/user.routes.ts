import express from "express";
import {getAllUsers,getUserById ,createUser} from "../controllers/user.controller.js"
const router = express.Router()
router.get("/getAllUsers",getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getUserById", getUserById);
router.post("/createUser", createUser);

export {router}