import { Router } from "express";

/*eslint new-cap: ["error", { "capIsNew": false }]*/

const router = Router();

router.route("/").get((req, res) => {
    res.render("index");
});

export default router;
