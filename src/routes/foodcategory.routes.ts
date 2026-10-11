import express from "express";
import {getAllCategories,createCategory,updateCategory,getCategoryById,deleteCategory}from "../controllers/foodcategory.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js"
import { authorizationMiddleware } from "../middleware/authorization.middleware.js";
const router = express.Router();
router.get("/getAllCategories",getAllCategories);
router.get("/getCategoryById/:id",getCategoryById);
router.post("/createCategory",authMiddleware,authorizationMiddleware,createCategory);
router.put("/updateCategory/:id",authMiddleware,authorizationMiddleware,updateCategory);
router.delete("/deleteCategory/:id",authMiddleware,authorizationMiddleware,deleteCategory);
export {router}
