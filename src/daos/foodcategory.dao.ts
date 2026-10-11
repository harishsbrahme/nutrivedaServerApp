import {FoodCategoryModel} from "../models/foodcategory.schema.js";


export const createCategory = async (categoryDetails:any)=>{
    const newCategory = await FoodCategoryModel.create(categoryDetails);
    return newCategory;
}

export const getAllCategories = async ()=>{
    const allFoodCategories = await FoodCategoryModel.find();
    return allFoodCategories;
}

export const getCategoryById = async (id:number)=>{
    const foodCategory = await FoodCategoryModel.findOne({id:id});
    return foodCategory;
}

export const updateCategory = async (foodCategoryDetails:any) =>{
    const updatedFoodCategory = await FoodCategoryModel.findOneAndUpdate({id:foodCategoryDetails.id},foodCategoryDetails,{new:true});
    return updatedFoodCategory;
}

export const deleteCategory = async (id:number) =>{
    const deletedCategory = await FoodCategoryModel.findOneAndDelete({id:id});
    return deletedCategory;
}