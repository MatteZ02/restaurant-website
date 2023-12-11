import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../../.env" });

export default {
    apiUrl: process.env.API_URL ?? "http://localhost:3000/api/",
    port: +(process.env.PORT ?? 3000),
    db_host: process.env.DB_HOST ?? "localhost",
    db_user: process.env.DB_USER ?? "user",
    db_password: process.env.DB_PASSWORD ?? "password",
    db_name: process.env.DB_NAME ?? "restaurant",
    session_secret: process.env.SESSION_SECRET ?? "keyboard cat",
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_pubhlishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
};
