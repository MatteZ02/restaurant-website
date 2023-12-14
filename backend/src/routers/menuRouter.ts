import { Router } from "express";
import { deleteMenu, getMenu, postMenu, putMenu } from "../controllers/menuController";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";

const menuRouter = Router();

menuRouter
    .route("/")
    .get(getMenu)
    .post(
        body("name").trim().isLength({ min: 1 }),
        body("description").trim().isLength({ min: 1 }),
        body("price").isNumeric(),
        body("category").isNumeric(),
        authenticateToken,
        postMenu
    );

menuRouter
    .route("/:id")
    .put(
        body("name").trim().isLength({ min: 1 }).optional(),
        body("description").trim().isLength({ min: 1 }).optional(),
        body("price").isNumeric().optional(),
        body("category").isNumeric().optional(),
        authenticateToken,
        putMenu
    )
    .delete(authenticateToken, deleteMenu);

export default menuRouter;
