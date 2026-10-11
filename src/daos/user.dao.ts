import { UserModel } from "../models/user.schema.js";
import type { User } from "../models/user.model.js";

export const getallUsers = async () => {
    //  const user1: User = {
    //     id: 1,
    //     name: "Harish",
    //     email: 'harish@gmail.com'
    // };
    //  const user2: User = {
    //     id: 2,
    //     name: "rahul",
    //     email: 'rahul@gmail.com'
    // };
    //     return [user1,user2];

    const users = await UserModel.find().select({id:1,name:1,email:1});
    return users;
}

export const getUserById = async(id: number) => {
    try {
        const user = await UserModel.findOne({id});
        return user;
    } catch (err) {
        throw err;
    }
}

export const createUser = async (userDetails: any) => {
    try {
        const newUser = await UserModel.create(userDetails);
        return newUser;
    } catch (err: any) {
        throw err;
    }
}

export const getUserByEmail = async(email:string) => {
    try {
        const user = await UserModel.findOne({email});
        return user;
    } catch (err) {
        throw err;
    }
}

export const updateResetToken = async (userDetails: any) => {
    const updateDetails = {
        resetToken: userDetails.resetToken,
        resetTokenExpiry: userDetails.resetTokenExpiry
    }
    try {
        const newUser = await UserModel.findOneAndUpdate({ id: userDetails.id }, updateDetails, { new: true });
        return newUser;
    } catch (err) {
        throw err;
    }
}
export const resetPassword = async (userDetails: any) => {
    try {
        const updateDetails = {
            password: userDetails.updatedPassword,
        }
        const newUser:any = await UserModel.findOneAndUpdate({ id: userDetails.id }, updateDetails, { new: true });
        const tokenrestUser = await clearResetTokenDetails(newUser.id)
        return tokenrestUser;
    } catch (err) {
        throw err;
    }
}
async function clearResetTokenDetails(id: any) {
    const updateDetails = {
        resetToken: '',
        resetTokenExpiry: new Date()
    }
    const newUser = await UserModel.findOneAndUpdate({ id: id }, updateDetails, { new: true });
    return newUser;
}