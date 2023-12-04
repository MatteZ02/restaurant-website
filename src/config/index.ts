import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: "../../.env" });

export default {
    port: +(process.env.PORT ?? 3000),
};
