import type { Request, Response } from "express"
import {
    getAllUsers as allUsers,
    getUserById as UserById,
    createUser as CreateUser,
    loginUser as LoginUser,
    refreshAccessToken as RefreshAccessToken,
    forgotPassword as ForgotPassword,
    resetPassword as ResetPassword
} from "../services/user.service.js";


export async function getAllUsers(req: Request, res: Response) {
    res.send(await allUsers());
}

export async function getUserById(req: Request, res: Response) {
    const id = req.params.id
    if (typeof id === "string") {
        const user = await UserById(Number(id))
        if (user != "User Not Found") {
            res.send(user)
        } else {
            res.status(404).send(user)
        }
    } else {
        res.send(UserById(undefined));
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const user = req.body;
        const value = await CreateUser(user);
        if (value === "Id Is Missing" || value === "Name Is Missing" || value === "Email Is Missing" ||
            value === "Id Is Not A Number" || value === "Name Is Not Sting" || value === "Email Is Not Sting" ||
            value === "Name should contain only letters" || value === "password Is Missing" || value === "password Is Not Sting" ||
            value === "password Is Too Short"
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

export async function loginUser(req: Request, res: Response) {
    try {
        const logindetails = req.body;
        const user = await LoginUser(logindetails);
        if (user === "Email Is Missing" || user === "Email Is Not Sting" || user === "Email Is Not Valid" ||
            user === "Password Is Missing" || user === "Password Is Not Sting" || user === "Password Is Too Short"
        ) {
            res.status(400).send(user);
        } else if (user === "Password Is Wrong" || user === "Email is not available") {
            res.status(401).send(user);
        } else {
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true });
            user.refreshToken = "";
            res.status(200).send(user);
        }
    } catch (err: any) {
        res.status(500).send(err)
    }
}

export async function refreshAccessToken(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const token = await RefreshAccessToken(refreshToken);
            res.status(200).send(token);
        } else {
            res.status(401).send("refresh token is missing");
        }
    } catch (error) {
        res.status(401).send(error)
    }
}
export async function forgotPassword(req:Request,res:Response){
    const email = req.body.email;
    const UpdatedUser = await ForgotPassword(email);
    res.status(200).send(UpdatedUser);

}
export async function resetPassword(req: Request, res: Response) {
    try {
        const { token, newPassword } = req.body;
        const user = await ResetPassword({ token, newPassword })
        res.status(200).send(user);
    } catch (error:any) {
        res.status(401).send("Invalid reset token")
    }
}