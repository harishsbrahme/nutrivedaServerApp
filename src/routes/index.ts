import express from "express";
import { router as userRouter } from "./user.routes.js";
const router = express.Router();

router.use("/api/users",userRouter)

router.get("/",(req,res)=>{
    res.send("Hello World");
});

export { router };