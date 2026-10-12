import mongoose,{Schema} from "mongoose";

const foodCategorySchema = new Schema({
id:{
    type:Number,
    required:true,
    unique: true
},
name:{
    type: String,
    required: true,
    unique: true
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

foodCategorySchema.index({ name: 1, status: 1 });

const FoodCategoryModel = mongoose.model("FoodCategory",foodCategorySchema);
export {foodCategorySchema,FoodCategoryModel}