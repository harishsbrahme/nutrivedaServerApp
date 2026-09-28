import {
    getallUsers as allUsers,
    getUserById as userById,
    createUser as createNewUser
} from "../daos/user.dao.js";
import type { User } from "../models/user.model.js";



export const getUserById = async (id: number | undefined): Promise<User | string> => {
    if (typeof id === 'undefined' || id == null || Number.isNaN(id)) {
        return "Invalid user id"
    } else {
         const user= await userById(id);
         if(user){
            return user;
         }else{
            return "User Not Found"
         }
    }
}

export const getAllUsers = async (): Promise<User[] | string> => {
    const value = await allUsers()
    if (value.length>0) {
        return value;
    } else {
        return "No users found";
    }

}

export const createUser = async (userDetails: any) => {
    if ((typeof userDetails.id === 'undefined') || userDetails.id == null || userDetails.id == "") {
        return "Id Is Missing"
    } else if (!(typeof userDetails.id==='number')) {
        return "Id Is Not A Number"
    }else if(Number.isNaN(userDetails.id)){
        return "Id Is Not A Valid Number"
    }else if(userDetails.id < 0){
        return "Id is Not A Positive Number"
    }
    if ((typeof userDetails.name === 'undefined') || userDetails.name == null || userDetails.name == "") {
        return "Name Is Missing"
    }
    else if(!(typeof userDetails.name==='string')){
        return "Name Is Not Sting"
    }
    if ((typeof userDetails.email === 'undefined') || userDetails.email == null || userDetails.email == "") {
        return "Email Is Missing"
    } else if(!(typeof userDetails.email==='string')){
        return "Email Is Not Sting"
    }else if(!(userDetails.email).includes('@') ||!(userDetails.email).includes('.')){
        return "Email Is Not Valid"
    }
    const value = await createNewUser(userDetails);
    if (value) {
        return value;
    }
}