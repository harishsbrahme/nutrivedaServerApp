import type {Request,Response,NextFunction} from 'express'

export function authorizationMiddleware(req:Request,res:Response,next:NextFunction){
    const role = req.user.role
    if(role==='Admin'){
        next();
    }else{
        res.status(403).send("User is not authorized")
    }
}