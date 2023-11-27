import express from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./routers/router";
import authrouter from "./routers/authRouter";
import menuRouter from "./routers/menuRouter";
import restaurantRouter from "./routers/restaurantRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ViteExpress.static());

app.use("/", router);
app.use("/api/auth", authrouter);
app.use("/api/menu", menuRouter);
//app.use("/api/order"); // TODO
app.use("/api/restaurant", restaurantRouter);
app.use("/api/user", userRouter);

ViteExpress.listen(app, config.port, () => console.log(`Server listening on port ${config.port}`));
