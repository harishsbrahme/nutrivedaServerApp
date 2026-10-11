import express from "express";
import { connectDB } from "./config/database.js";
import {router} from "./routes/index.js";
import cookieParser from "cookie-parser";
import {commonErrorHandler} from "./middleware/error.middleware.js"

const app= express();
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(router);
app.use(commonErrorHandler)


app.listen(3000,()=>{console.log("Nutriveda server is running on port 3000")})

