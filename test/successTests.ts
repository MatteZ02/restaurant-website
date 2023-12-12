import request from "supertest";

const getMenu = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get("/menu")
            .expect(200, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const getCart = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get("/cart")
            .expect(202, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const postCartItem = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .post("/cart")
            .set("Content-Type", "application/json")
            .field("name", "value")
            .field("description", "value")
            .field("price", "value")
            .field("category", 1)
            .expect(201, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

export { getMenu, getCart, postCartItem };
