import { Request as express_request } from "express";
import { CartItem, User } from "restaurantApiTypes";

declare module "express-session" {
    interface SessionData {
        cart?: CartItem[];
    }
}
export interface Request extends express_request {
    user?: User;
}
export default Request;
