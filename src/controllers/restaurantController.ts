import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../classes/ApiError";
import {
    addRestaurant,
    deleteRestaurantById,
    getRestaurants,
    updateRestaurant,
} from "../core/models/restaurantModel";
import Request from "../types/Request";
import { noop } from "../util/util";

const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid restaurant data"));

    const restaurants = await getRestaurants().catch(noop);
    if (!restaurants) return next(new ApiError(500, "Failed to obtain restaurants"));
    res.status(200).json(restaurants);
};

const postRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid restaurant data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1) return next(new ApiError(403, "Unauthorized"));

    const restaurant = req.body;
    const r = addRestaurant(restaurant).catch(noop);
    if (!r) return next(new ApiError(500, "Error adding restaurant"));
    res.status(201).json(r);
};

const putRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid restaurant data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 2) return next(new ApiError(403, "Unauthorized"));

    const restaurant = req.body;
    const r = updateRestaurant(+req.params.id, restaurant).catch(noop);
    if (!r) return next(new ApiError(500, "Error updating restaurant"));
    res.status(200).json(r);
};

const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid restaurant data"));

    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (req.user.level > 1) return next(new ApiError(403, "Unauthorized"));

    const { id } = req.params;
    const r = deleteRestaurantById(+id).catch(noop);
    if (!r) return next(new ApiError(500, "Error deleting restaurant"));
    res.status(200).json(r);
};

export { getRestaurant, postRestaurant, putRestaurant, deleteRestaurant };
