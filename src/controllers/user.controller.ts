import type { Request,Response } from "express"
import {
    getAllUsers as allUsers,
    getUserById as UserById,
    createUser as CreateUser
} from "../services/user.service.js";

export async function getAllUsers(req: Request, res: Response) {
   res.send(await allUsers()); 
}

export async function getUserById(req:Request,res:Response){
    const id=req.params.id
    if(typeof id === "string"){
     const user =await UserById(Number(id))
     if(user != "User Not Found"){
        res.send(user)
     }else{
        res.status(404).send(user)
     }
    }else{
         res.send(UserById(undefined));
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const user = req.body;
        const value = await CreateUser(user);
        if (value === "Id Is Missing" || value === "Name Is Missing" || value === "Email Is Missing" ||
            value === "Id Is Not A Number" || value === "Name Is Not Sting" || value === "Email Is Not Sting"
        ) {
            res.status(400).send(value);
        } else {
            res.status(201).send(value);
        }
    } catch (error: any) {
        if (error.code == 11000) {
            res.status(409).send({ "message": "User ID already exists" })
        } else {
            res.send(error)
        }

    }
}