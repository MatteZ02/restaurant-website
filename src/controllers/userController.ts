import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../classes/ApiError";
import { addUser, deleteUserById, getUserById, updateUser } from "../core/models/userModel";
import Request from "../types/Request";
import { genSaltSync, hashSync } from "bcryptjs";
import Database from "../core/database";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid user data"));

    const { id } = req.params;
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1 && req.user.id !== +id) return next(new ApiError(403, "Unauthorized"));

    const user = await getUserById(+id);
    if (!user) return next(new ApiError(404, "User not found"));
    res.status(200).json(user);
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid user data"));

    const user = req.body;
    const existingUser = await Database.query("SELECT * FROM user WHERE username = ?", [
        user.username,
    ]);
    if (existingUser.length > 0) return next(new ApiError(400, "Username already exists"));
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
    const u = addUser(user);
    if (!u) return next(new ApiError(500, "Error adding user"));
    res.status(201).json(u);
};

const putUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid user data"));

    const { id } = req.params;
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1 && req.user.id !== +id) return next(new ApiError(403, "Unauthorized"));

    const user = req.body;
    const u = updateUser(+id, user);
    if (!u) return next(new ApiError(500, "Error updating user"));
    res.status(200).json(u);
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid user data"));

    const { id } = req.params;
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1 && req.user.id !== +id) return next(new ApiError(403, "Unauthorized"));

    const u = deleteUserById(+id);
    if (!u) return next(new ApiError(500, "Error deleting user"));
    res.status(200).json(u);
};

export { getUser, postUser, putUser, deleteUser };