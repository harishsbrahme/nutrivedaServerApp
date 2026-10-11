import {
    getallUsers as allUsers,
    getUserById as userById,
    createUser as createNewUser,
    getUserByEmail as GetUserByEmail,
    updateResetToken as UpdateResetToken,
    resetPassword as ResetPassword
} from "../daos/user.dao.js";
import type { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'
import type { JwtPayload } from "../models/user.model.js";
import { error } from "console";
import { sendEmail } from "./email.service.js";



export const getUserById = async (id: number | undefined): Promise<User | string> => {
    if (typeof id === 'undefined' || id == null || Number.isNaN(id)) {
        return "Invalid user id"
    } else {
        const user: any = await userById(id);
        if (user) {
            return user;
        } else {
            return "User Not Found"
        }
    }
}

export const getAllUsers = async (): Promise<User[] | string> => {
    const value: any = await allUsers()
    if (value.length > 0) {
        return value;
    } else {
        return "No users found";
    }

}

export const createUser = async (userDetails: any) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ((typeof userDetails.id === 'undefined') || userDetails.id == null || userDetails.id == "") {
        return "Id Is Missing"
    } else if (!(typeof userDetails.id === 'number')) {
        return "Id Is Not A Number"
    } else if (Number.isNaN(userDetails.id)) {
        return "Id Is Not A Valid Number"
    } else if (userDetails.id < 0) {
        return "Id is Not A Positive Number"
    }
    if ((typeof userDetails.name === 'undefined') || userDetails.name == null || userDetails.name == "") {
        return "Name Is Missing"
    }
    else if (!(typeof userDetails.name === 'string')) {
        return "Name Is Not Sting"
    }
    else if ((userDetails.name.length < 3)) {
        return "Name Is Too Short"
    }
    const namearr = userDetails.name.split("");
    for (let i = 0; i < namearr.length; i++) {
        namearr[i] = namearr[i].toLowerCase();
        if (!isNaN(namearr[i])) {
            return "Name should contain only letters"
        } else if (!(namearr[i] >= 'a' && namearr[i] <= 'z')) {
            return "Name should contain only letters"
        }
    }
    if ((typeof userDetails.email === 'undefined') || userDetails.email == null || userDetails.email == "") {
        return "Email Is Missing"
    } else if (!(typeof userDetails.email === 'string')) {
        return "Email Is Not Sting"
    } else if (!(userDetails.email).includes('@') || !(userDetails.email).includes('.')) {
        return "Email Is Not Valid"
    }
    if ((typeof userDetails.password === 'undefined') || userDetails.password == null || userDetails.password == "") {
        return "password Is Missing"
    }
    else if (!(typeof userDetails.password === 'string')) {
        return "password Is Not Sting"
    }
    else if ((userDetails.password.length < 8)) {
        return "password Is Too Short"
    }
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    userDetails.role = "User";
    const value = await createNewUser(userDetails);
    if (value) {
        return value;
    }
}
export const loginUser = async (logindetails: any) => {
    if ((typeof logindetails.email === 'undefined') || logindetails.email == null || logindetails.email == "") {
        return "Email Is Missing"
    } else if (!(typeof logindetails.email === 'string')) {
        return "Email Is Not Sting"
    } else if (!(logindetails.email).includes('@') || !(logindetails.email).includes('.')) {
        return "Email Is Not Valid"
    }
    if ((typeof logindetails.password === 'undefined') || logindetails.password == null || logindetails.password == "") {
        return "Password Is Missing"
    }
    else if (!(typeof logindetails.password === 'string')) {
        return "Password Is Not Sting"
    }
    else if ((logindetails.password.length < 8)) {
        return "Password Is Too Short"
    }
    const user = await GetUserByEmail(logindetails.email);
    if (user) {
        const validateUser = await bcrypt.compare(logindetails.password, user.password);
        if (validateUser) {
            const userdetails = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: "",
                refreshToken: ""
            }
            const payload = {
                id: userdetails.id,
                name: userdetails.name,
                role: userdetails.role,
                type: "access"
            }
            const jwtToken = JWT.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            const refreshTokenpayload = {
                id: userdetails.id,
                name: userdetails.name,
                role: userdetails.role,
                type: "refresh"
            }
            const refreshToken = JWT.sign(refreshTokenpayload, JWT_SECRET, { expiresIn: "7d" });
            userdetails.token = jwtToken;
            userdetails.refreshToken = refreshToken;
            return userdetails;
        } else {
            return "Password Is Wrong"
        }
    } else {
        return "Email is not available"
    }

}

export async function refreshAccessToken(refreshToken: any) {
    const payload = JWT.verify(refreshToken, JWT_SECRET) as JwtPayload;
    if (payload.type === "refresh") {
        const newPayload = {
            id: payload.id,
            name: payload.name,
            role: payload.role,
            type: "access"
        }
        const accessToken = JWT.sign(newPayload, JWT_SECRET, { expiresIn: "1h" });
        return accessToken;
    } else {
        throw new Error("Invalid refresh token");
    }
}

export async function forgotPassword(email: string) {
    const user: any = await GetUserByEmail(email);
    if (user) {
        const payload = {
            id: user.id,
            type: "password-reset"
        };
        const resettoken = JWT.sign(payload, JWT_SECRET, { expiresIn: "15m" });
        const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000)
        user.resetToken = resettoken;
        user.resetTokenExpiry = tokenExpiry;
        const UpdatedUser = await UpdateResetToken(user)
        await sendEmail(
            user.email,
            "Nutriveda Password Reset",
            `Your password reset token is: ${resettoken}`
        );
        return {
            "message": "If the email exists, a password reset link has been sent."
        }
    } else {
        throw new Error("User not found");
    }
}
export async function resetPassword(resetPasswordDetails: any) {
    const payload: any = JWT.verify(resetPasswordDetails.token, JWT_SECRET);
    if (payload.type === "password-reset") {
        const user: any = await getUserById(payload.id);
        if (user.resetToken != resetPasswordDetails.token) {
            throw new Error("Invalid reset token")
        } else {

            if (new Date(user.resetTokenExpiry) < new Date()) {
                throw new Error("Reset token expired");
            } else {
                const updatedPassword = await bcrypt.hash(resetPasswordDetails.newPassword, 10);
                user.updatedPassword = updatedPassword;
                const updatedUser: any = await ResetPassword(user);
                const User = {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                }
                return User;
            }
        }
    }
}