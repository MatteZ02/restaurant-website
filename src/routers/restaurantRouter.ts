import { Router } from "express";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";
import {
    deleteRestaurant,
    getRestaurant,
    postRestaurant,
    putRestaurant,
} from "../controllers/restaurantController";

const restaurantRouter = Router();

restaurantRouter
    .route("/")
    .get(getRestaurant)
    .post(
        body("name").trim().isLength({ min: 1 }),
        body("address").trim().isLength({ min: 1 }),
        body("opening_hours").trim().isLength({ min: 1 }),
        authenticateToken,
        postRestaurant
    );

restaurantRouter
    .route("/:id")
    .put(
        body("name").trim().isLength({ min: 1 }),
        body("address").trim().isLength({ min: 1 }),
        body("opening_hours").trim().isLength({ min: 1 }),
        authenticateToken,
        putRestaurant
    )
    .delete(authenticateToken, deleteRestaurant);

export default restaurantRouter;
