import Router from "koa-router";

import {
  postLogin
} from "./controllers";

const router = new Router();

router.prefix("/v1");

router.post("/login", postLogin);

export default router;