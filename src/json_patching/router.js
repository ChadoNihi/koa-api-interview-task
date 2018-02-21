import Router from "koa-router";

import {
	postPatch
} from "./controllers";

router.post("/json-patch", postPatch);

const router = new Router();