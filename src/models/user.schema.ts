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
    },
     password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'User'
    },
    resetToken:{
        type:String,
    },
    resetTokenExpiry:{
        type:String
    }
})
const UserModel = mongoose.model("User", userSchema);
export { userSchema, UserModel };