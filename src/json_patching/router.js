import Router from "koa-router";

import {
	postPatch
} from "./controllers";

const router = new Router();

router.prefix("/v1");

router.post("/json-patch", postPatch);

export default router.routes();