import { Request as express_request } from "express";
import { User } from "restaurantApiTypes";

export interface Request extends express_request {
    user?: User;
}
export default Request;
