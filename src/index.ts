import express from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import session from "express-session";
import config from "./config";
import router from "./routers/router";
import authrouter from "./routers/authRouter";
import menuRouter from "./routers/menuRouter";
import restaurantRouter from "./routers/restaurantRouter";
import userRouter from "./routers/userRouter";
import cartRouter from "./routers/cartRouter";
import orderRouter from "./routers/orderRouter.";
import Stripe from "stripe";

const stripe = new Stripe(config.stripe_secret_key as string, {
    apiVersion: "2023-10-16",
    appInfo: {
        // For sample support and debugging, not required for production:
        name: "restaurant-website",
        url: "https://github.com/MatteZ02/restaurant-website",
        version: "0.1.0",
    },
    typescript: true,
});

const app = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction): void =>
    req.originalUrl === "/webhook" ? next() : express.json()(req, res, next)
);
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: config.session_secret,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser(config.session_secret));
app.use(ViteExpress.static());

app.use("/", router);
app.use("/api/auth", authrouter);
app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/user", userRouter);

ViteExpress.listen(app, config.port, () => console.log(`Server listening on port ${config.port}`));

export { stripe };
