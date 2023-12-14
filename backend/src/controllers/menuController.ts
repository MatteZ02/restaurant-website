import Request from "../types/Request";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../classes/ApiError";
import { addMenuItem, deleteMenuItem, getFullMenu, updateMenuItem } from "../core/models/menuModel";
import { noop } from "../util/util";
import { debug } from "..";

const getMenu = async (req: Request, res: Response, next: NextFunction) => {
    debug.log("getMenu");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid menu data"));

    const menu = await getFullMenu().catch(noop);

    if (!menu) return next(new ApiError(500, "Failed to obtain menu"));
    res.status(200).json(menu);
};

const postMenu = async (req: Request, res: Response, next: NextFunction) => {
    debug.log("postMenu");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid menu data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1) return next(new ApiError(403, "Unauthorized"));

    const menu = req.body;
    const m = addMenuItem(menu).catch(noop);
    if (!m) return next(new ApiError(500, "Error adding menu"));
    res.status(201).json(m);
};

const putMenu = async (req: Request, res: Response, next: NextFunction) => {
    debug.log("putMenu");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid menu data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 2) return next(new ApiError(403, "Unauthorized"));

    const menu = req.body;
    const m = updateMenuItem(+req.params.id, menu).catch(noop);
    if (!m) return next(new ApiError(500, "Error updating menu"));
    res.status(200).json(m);
};

const deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
    debug.log("deleteMenu");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid menu data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1) return next(new ApiError(403, "Unauthorized"));

    const { id } = req.params;
    const m = deleteMenuItem(+id).catch(noop);
    if (!m) return next(new ApiError(500, "Error deleting menu"));
    res.status(200).json(m);
};

export { getMenu, postMenu, putMenu, deleteMenu };
