import express from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import session from "express-session";
import config, { httpsOptions } from "./config";
import router from "./routers/router";
import authrouter from "./routers/authRouter";
import menuRouter from "./routers/menuRouter";
import restaurantRouter from "./routers/restaurantRouter";
import userRouter from "./routers/userRouter";
import cartRouter from "./routers/cartRouter";
import orderRouter from "./routers/orderRouter.";
import Stripe from "stripe";
import Server from "./core/Server";
import debux from "debux";
import https from "https";

const debug = debux();
debug.info("Initializing server");

const stripe = new Stripe(config.stripe_secret_key as string, {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "restaurant-website",
        url: "https://github.com/MatteZ02/restaurant-website",
        version: "0.1.0",
    },
    typescript: true,
});

const server = new Server();

const app = express();
ViteExpress.config({
    mode: (process.env.NODE_ENV ?? "development") as "development" | "production",
    ignorePaths: path =>
        path.startsWith("/api") ||
        path.startsWith("/webhook") ||
        path.startsWith("/payment/next") ||
        path.startsWith("/success"),
});

if (process.env.NODE_ENV === "production") {
    https
        .createServer(httpsOptions, app)
        .listen(443, () => debug.info("Server listening on port 443"));

    app.use((request, response, next) => {
        if (!request.secure) {
            return response.redirect("https://" + request.headers.host + request.url);
        }

        next();
    });
}

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

app.use("/", router);
app.use("/api/auth", authrouter);
app.use("/api/menu", menuRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/user", userRouter);

app.use(ViteExpress.static());

ViteExpress.listen(app, config.port, () => debug.info(`Server listening on port ${config.port}`));

export { app, stripe, server as wsServer, debug };
