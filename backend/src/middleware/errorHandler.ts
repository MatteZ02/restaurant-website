import { NextFunction, Response } from "express";
import ApiError from "../classes/ApiError";
import Request from "../types/Request";
import { debug } from "..";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    debug.log("notFoundHandler");
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    debug.log("errorHandler");
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        message: error.message,
        status: statusCode,
    });
};

export { notFoundHandler, errorHandler };
