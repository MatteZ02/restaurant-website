import { Router } from "express";
import { getOrder, getOrders, patchOrder, postOrder } from "../controllers/orderController";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";

const orderRouter = Router();

orderRouter
    .route("/")
    .get(getOrders)
    .post(body("user").isInt(), body("items").isArray(), body("order_status").isInt(), postOrder);

orderRouter
    .route("/:id")
    .get(getOrder)
    .patch(
        body("user").isInt().optional(),
        body("items").isArray().optional(),
        body("order_status").isInt().optional(),
        authenticateToken,
        patchOrder
    );

export default orderRouter;
