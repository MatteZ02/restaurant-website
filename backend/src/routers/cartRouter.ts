import { Router } from "express";
import { body } from "express-validator";
import { deleteCart, getCart, postCart } from "../controllers/cartController";

const cartRouter = Router();

cartRouter
    .route("/")
    .get(getCart)
    .post(
        body("name").trim().isLength({ min: 1 }),
        body("description").trim().isLength({ min: 1 }),
        body("price"),
        body("category").isNumeric(),
        postCart
    );

cartRouter.route("/:id").delete(deleteCart);

export default cartRouter;
