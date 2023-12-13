import request from "supertest";

const getNotFound = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get("/notfound")
            .expect(404, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const getUserError = (url: string | Function, id: number) => {
    return new Promise((resolve, reject) => {
        request(url)
            .get(`/user/${id}`)
            .expect(404, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const postUserError = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .post("/user")
            .set("Content-Type", "application/json")
            .expect(400, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const postLoginError = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .post("/auth/login")
            .set("Content-Type", "application/json")
            .expect(400, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

const postOrderError = (url: string | Function) => {
    return new Promise((resolve, reject) => {
        request(url)
            .post("/order")
            .set("Content-Type", "application/json")
            .expect(400, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
    });
};

export { getNotFound, getUserError, postUserError, postLoginError, postOrderError };
