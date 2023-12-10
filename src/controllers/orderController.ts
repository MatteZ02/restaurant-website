import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../classes/ApiError";
import {
    addItem,
    addOrder,
    addOrderItems,
    getAllOrders,
    getOrderById,
    updateOrder,
} from "../core/models/orderModel";
import { noop } from "../util/util";
import { Order } from "restaurantApiTypes";

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid order data"));

    const { id } = req.params;
    const order = await getOrderById(+id).catch(noop);

    if (!order) return next(new ApiError(500, "Failed to obtain order"));
    res.status(200).json(order);
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid order data"));

    const orders = await getAllOrders().catch(noop);

    if (!orders) return next(new ApiError(500, "Failed to obtain orders"));
    res.status(200).json(orders);
};

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid order data"));

    const o: Order = req.body;
    let itemstr = "";
    for (const item of o.items) {
        const i = await addItem(item).catch(noop);
        if (!i) return next(new ApiError(500, "Error adding order item"));
        itemstr += `${i}#`;
    }

    const items = await addOrderItems(itemstr).catch(noop);
    if (!items) return next(new ApiError(500, "Error adding order items"));

    const order = await addOrder({ ...o, items }).catch(noop);
    if (!order) return next(new ApiError(500, "Error adding order"));
    res.status(201).json(o);
};

const patchOrder = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid order data"));

    const { id } = req.params;
    const order = req.body;
    const o = await updateOrder(+id, order).catch(noop);
    if (!o) return next(new ApiError(500, "Error updating order"));
    res.status(200).json(o);
};

export { getOrder, getOrders, patchOrder, postOrder };
