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

    const users = await UserModel.find();
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