import { CartItem } from "restaurantApiTypes";

declare module "express-session" {
    interface SessionData {
        cart?: CartItem[];
    }
}
