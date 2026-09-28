import express from "express";
import { connectDB } from "./config/database.js";
import {router} from "./routes/index.js";

const app= express();
connectDB()
app.use(express.json())
app.use(router);

app.listen(3000,()=>{console.log("Nutriveda server is running on port 3000")})

