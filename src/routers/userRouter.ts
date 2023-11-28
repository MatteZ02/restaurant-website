import { Router } from "express";
import { deleteUser, getUser, postUser, putUser } from "../controllers/userController";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";

const userRouter = Router();

userRouter
    .route("/")
    .post(
        body("username").trim().isLength({ min: 3, max: 20 }),
        body("password").trim().isLength({ min: 3, max: 20 }),
        body("email").trim().isEmail(),
        body("phone").optional().trim().isMobilePhone("any"),
        body("address").optional().trim().isLength({ min: 3, max: 100 }),
        postUser
    );

userRouter
    .route("/:id")
    .get(authenticateToken, getUser)
    .put(
        body("username").optional().trim().isLength({ min: 3, max: 20 }),
        body("password").optional().trim().isLength({ min: 3, max: 20 }),
        body("email").optional().trim().isEmail(),
        body("phone").optional().trim().isMobilePhone("any"),
        body("address").optional().trim().isLength({ min: 3, max: 100 }),
        authenticateToken,
        putUser
    )
    .delete(authenticateToken, deleteUser);

export default userRouter;
