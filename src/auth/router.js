import Router from "koa-router";

import {
	postLogin
} from "./controllers";

const router = new Router();

router.post("/login", postLogin);

export default router.routes();