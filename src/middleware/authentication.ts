import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Response } from "express";
import Request from "../types/Request";
import ApiError from "../classes/ApiError";
import { User } from "restaurantApiTypes";
import { debug } from "..";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    debug.log("authenticateToken");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
        if (!token) throw new ApiError(403, "Token Invalid");
        req.user = jwt.verify(token, process.env.JWT_SECRET ?? "secret") as User;
        next();
    } catch (error) {
        throw new ApiError(403, "Token Invalid");
    }
};

export default authenticateToken;
