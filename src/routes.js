import Router from "koa-router";

import authR from "./auth/router";
import jsonR from "./json_patching/router";
// import thumbR from './thumbnail/router'

const router = new Router();
const api = new Router();

api.use(authR);
api.use(jsonR);
// api.use(thumbR)

router.use("/", api.routes());

export default router;