import express from "express";
import { router as userRouter } from "./user.routes.js";
import { router as FoodCategoryRouter} from "./foodcategory.routes.js"
const router = express.Router();

router.use("/api/users",userRouter);
router.use("/api/foodCategories",FoodCategoryRouter)

router.get("/",(req,res)=>{
    res.send("Hello World");
});

export { router };