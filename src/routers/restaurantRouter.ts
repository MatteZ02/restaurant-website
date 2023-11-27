import { Router } from "express";
import { getRestaurants } from "../core/models/restaurantModel";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";
import {
    deleteRestaurant,
    postRestaurant,
    putRestaurant,
} from "../controllers/restaurantController";

const restaurantRouter = Router();

restaurantRouter
    .route("/")
    .get(getRestaurants)
    .post(
        body("name").trim().isLength({ min: 1 }),
        body("address").trim().isLength({ min: 1 }),
        body("openingHours").trim().isLength({ min: 1 }),
        authenticateToken,
        postRestaurant
    );

restaurantRouter
    .route("/:id")
    .put(
        body("name").trim().isLength({ min: 1 }),
        body("address").trim().isLength({ min: 1 }),
        body("openingHours").trim().isLength({ min: 1 }),
        authenticateToken,
        putRestaurant
    )
    .delete(authenticateToken, deleteRestaurant);

export default restaurantRouter;
