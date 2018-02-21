import Router from "koa-router";

import authR from "./auth/router";
import jsonR from "./json_patching/router";
// import thumbR from './thumbnail/router'

const router = new Router();

router.use(authR);
router.use(jsonR);
// router.use(thumbR)

router.use("/", router.routes());

export default router;