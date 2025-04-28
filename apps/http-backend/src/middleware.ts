import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_TOKEN} from "@repo/backend-common/config";

export function middleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_TOKEN);
    
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: "unauthorised"
        })
    }
}