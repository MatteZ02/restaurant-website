import { NextFunction, Response } from "express";
import ApiError from "../classes/ApiError";
import Request from "../types/Request";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        status: statusCode,
    });
};

export { notFoundHandler, errorHandler };
