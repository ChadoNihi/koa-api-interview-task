import Router from "koa-router";

import {
	postLogin
} from "./controllers";

router.post("/login", postLogin);

const router = new Router();