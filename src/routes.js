import Router from "koa-router";

import authRouter from "./auth/router";
import jsonRouter from "./json_patching/router";
import thumbRouter from "./thumbnail/router";

const router = new Router();
const api = new Router();

api.use(authRouter);
api.use(jsonRouter);
api.use(thumbRouter);

router.use("/", api.routes());

export default router;