import mongoose,{Schema} from "mongoose";

const foodCategorySchema = new Schema({
id:{
    type:Number,
    required:true
},
name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
status:{
    type:Boolean,
    default:true
}
});

const FoodCategoryModel = mongoose.model("FoodCategory",foodCategorySchema);
export {foodCategorySchema,FoodCategoryModel}