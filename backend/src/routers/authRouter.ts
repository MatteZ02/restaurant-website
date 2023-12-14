import { Router } from "express";
import { getMe, postLogin } from "../controllers/authController";
import { body } from "express-validator";
import authenticateToken from "../middleware/authentication";

const authrouter = Router();

authrouter
    .route("/login")
    .post(
        body("username").trim().isLength({ min: 3, max: 20 }),
        body("password").trim().isLength({ min: 3, max: 20 }),
        postLogin
    );
authrouter.route("/me").get(authenticateToken, getMe);

export default authrouter;
