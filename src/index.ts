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
import Server from "./core/Server";
import debux from "debux";
import https from "https";
import { readFileSync } from "fs";
import helmet from "helmet";

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

https
    .createServer(
        {
            cert: readFileSync(
                "/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/fullchain.pem"
            ),
            key: readFileSync(
                "/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/privkey.pem"
            ),
        },
        app
    )
    .listen(443, () => debug.info("Server listening on port 443"));

app.use(helmet());
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

ViteExpress.listen(app, config.port, () => debug.info(`Server listening on port ${config.port}`));

export { app, stripe, server as wsServer, debug };
