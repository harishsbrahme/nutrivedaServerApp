import type { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '../config/jwt.js'
import type { JwtPayload } from "../models/user.model.js";
import { getUserById } from "../services/user.service.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers.authorization;
    if (token) {
        let tokenarr = token.split(" ");
        if (tokenarr.length == 2 && tokenarr[0] === 'Bearer') {
            const authToken = tokenarr[1];
            try {
                const validate = jwt.verify(authToken, JWT_SECRET) as JwtPayload;
                req.user = validate;
                if(req.user.id){
                    const User = await getUserById(req.user.id);
                    if(User != "User Not Found"){
                        next();
                    }else{
                        res.status(401).send("User Is Dosent Exist")
                    }
                }
                
            } catch (error: any) {
                if(error.name === 'TokenExpiredError'){
                    res.status(401).send("Token Expired");
                }else{
                    res.status(401).send(error.message);
                }
            }
        } else {
            res.status(401).send("token is wrong");
        }
    } else {
        res.status(401).send("token is missing");
    }
}