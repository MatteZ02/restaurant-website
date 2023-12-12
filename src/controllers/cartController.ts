import { validationResult } from "express-validator";
import ApiError from "../classes/ApiError";
import { NextFunction, Response } from "express";
import Request from "../types/Request";
import { debug } from "..";

const getCart = (req: Request, res: Response, next: NextFunction) => {
    debug.log("getCart");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid cart data"));

    const cart = req.session.cart;
    if (!cart) return res.status(202).json({ total: 0, items: [] });
    res.status(200).json({
        total: cart.reduce((acc, item) => acc + +item.item.price * item.quantity, 0),
        items: cart,
    });
};

const postCart = (req: Request, res: Response, next: NextFunction) => {
    debug.log("postCart");
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid cart data"));

    const cart = (req.session.cart ??= []);

    const item = req.body;
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);

    if (existingItem) existingItem.quantity++;
    else cart.push({ quantity: 1, item });

    res.status(200).json({
        total: cart.reduce((acc, item) => acc + +item.item.price * item.quantity, 0),
        items: cart,
    });
};

const deleteCart = (req: Request, res: Response, next: NextFunction) => {
    debug.log("deleteCart");
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid cart data"));

    const cart = req.session.cart;
    if (!cart) return res.status(202).json({ total: 0, items: [] });

    const { id } = req.params;
    const existingItem = cart.find(cartItem => cartItem.item.id === +id);
    if (!existingItem) return;

    if (existingItem.quantity > 0) existingItem.quantity--;
    else cart.splice(cart.indexOf(existingItem), 1);

    res.status(200).json({
        total: cart.reduce((acc, item) => acc + +item.item.price * item.quantity, 0),
        items: cart,
    });
};

export { getCart, postCart, deleteCart };
