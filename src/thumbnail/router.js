import Router from "koa-router";

import {
	getThumb
} from "./controllers";

const router = new Router();

router.prefix("/v1");

router.get("/thumbnail", getThumb);

export default router.routes();