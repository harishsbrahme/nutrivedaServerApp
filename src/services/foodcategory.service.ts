import {
    getAllCategories as GetAllCategories,
    getCategoryById as GetCategoryById,
    updateCategory as UpdateCategory,
    deleteCategory as DeleteCategory,
    createCategory as CreateCategory
} from "../daos/foodcategory.dao.js"


export const getAllCategories = async() =>{
    const allcategories = await GetAllCategories();
    return allcategories;
}

export const getCategoryById = async (id: number) => {
    const foodCategory = await GetCategoryById(id);
    if (foodCategory == null) {
        throw new Error("Category Not Found");
    }
    return foodCategory;
}

export const updateCategory = async (updateFoodcategory: any) => {
    await getCategoryById(updateFoodcategory.id);
    const foodCategory = await UpdateCategory(updateFoodcategory);
    return foodCategory;
}

export const createCategory = async(foodCategoryDetails:any) =>{
    const preCategory =  await GetCategoryById(foodCategoryDetails.id);
    if(preCategory){
       throw new Error("Category ID already exists");
    }
    const foodCategory = await CreateCategory(foodCategoryDetails);
    return foodCategory;
}

export const deleteCategory = async(id:number) =>{
    await getCategoryById(id);
    const foodCategory = await DeleteCategory(id);
    return foodCategory;
}