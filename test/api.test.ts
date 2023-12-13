import { describe, it } from "node:test";
import {
    getNotFound,
    getUserError,
    postLoginError,
    postOrderError,
    postUserError,
} from "./errorTests";
import { app } from "../src/";
import { getCart, getMenu, postCartItem } from "./successTests";

describe("GET /api", () => {
    it("responds wiht a not found message", async () => {
        await getNotFound(app);
    });

    it("responds with a not found message", async () => {
        await getUserError(app, 0);
    });

    it("should return an error for student not added", async () => {
        await postUserError(app);
    });

    it("should return a login error", async () => {
        await postLoginError(app);
    });

    it("should return an error for order not added", async () => {
        await postOrderError(app);
    });

    it("should return a menu", async () => {
        await getMenu(app);
    });

    it("should return a cart", async () => {
        await getCart(app);
    });

    it("should post a cart item", async () => {
        await postCartItem(app);
    });
});
