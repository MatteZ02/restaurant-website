import express from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./routers/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ViteExpress.static());

app.use("/", router);

ViteExpress.listen(app, config.port, () => console.log(`Server listening on port ${config.port}`));
