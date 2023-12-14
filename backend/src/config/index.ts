import * as dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();
dotenv.config({ path: "../../.env" });

const httpsOptions = {
    cert:
        process.env.NODE_ENV === "production"
            ? readFileSync(
                  "/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/fullchain.pem"
              )
            : "",
    key:
        process.env.NODE_ENV === "production"
            ? readFileSync(
                  "/etc/letsencrypt/live/restaurant-web.northeurope.cloudapp.azure.com/privkey.pem"
              )
            : "",
};

export { httpsOptions };

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
