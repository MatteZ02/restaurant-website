import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { validationResult } from "express-validator";
import { login } from "../core/models/userModel";
import jwt from "jsonwebtoken";
import ApiError from "../classes/ApiError";
import { noop } from "../util/util";

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const user = await login(username, password).catch(noop);
    if (!user) return res.status(401).json({ error: "Invalid username or password" });
    const token = jwt.sign(user, process.env.JWT_SECRET ?? "secret", {
        expiresIn: "1h",
    });
    res.status(200).json({ token, user });
};

const getMe = (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(403, "Token Invalid");
    res.status(200).json(req.user);
};

export { postLogin, getMe };
