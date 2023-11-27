import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../../.env" });

export default {
    port: +(process.env.PORT ?? 3000),
    db_host: process.env.DB_HOST ?? "localhost",
    db_user: process.env.DB_USER ?? "user",
    db_password: process.env.DB_PASSWORD ?? "password",
    db_name: process.env.DB_NAME ?? "restaurant",
};
