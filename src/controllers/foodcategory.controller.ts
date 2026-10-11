import type { Request, Response } from "express";

import {createCategory as CreateCategory,
        updateCategory as UpdateCategory,
        getAllCategories as GetAllCategories,
        getCategoryById as GetCategoryById,
        deleteCategory as DeleteCategory
} from "../services/foodcategory.service.js";

export async function createCategory(req:Request,res:Response){
    const foodCategoryDetails = req.body.foodcategory;
    const newFoodCategory = await CreateCategory(foodCategoryDetails);
    res.status(201).send(newFoodCategory);
}

export async function updateCategory(req:Request,res:Response){
    const updateFoodcategory = req.body.foodCategoryDetails;
    updateFoodcategory.id = req.params.id;
    const updatedFoodCategory = await UpdateCategory(updateFoodcategory);
    res.status(200).send(updatedFoodCategory);
}

export async function getAllCategories(req:Request,res:Response){
    const categoryList = await GetAllCategories();
    res.status(200).send(categoryList)
}

export async function getCategoryById(req:Request,res:Response){
     const id:any = req.params.id;
    const foodCategory = await GetCategoryById(id);
    res.status(200).send(foodCategory);

}
export async function deleteCategory(req:Request,res:Response){
 const id:any = req.params.id;
    const deletedfoodCategory = await DeleteCategory(id);
    res.status(200).send(deletedfoodCategory);
}