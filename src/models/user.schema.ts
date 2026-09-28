import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    id:{
        type:Number,
        required:true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
const UserModel = mongoose.model("User", userSchema);
export { userSchema, UserModel };