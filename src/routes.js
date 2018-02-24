import authRouter from "./auth/router";
import jsonRouter from "./json-patching/router";
import thumbRouter from "./thumbnail/router";

const routers = [authRouter, jsonRouter, thumbRouter];

export default app => {
	routers.forEach((router) => {
		app
			.use(router.routes())
			.use(router.allowedMethods());
	});
};