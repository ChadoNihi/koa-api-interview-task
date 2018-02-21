import Koa from "koa";
import bodyparser from "koa-bodyparser";
import Cabin from "cabin";
import Router from "koa-router";

import routes from "./routes";

const app = new Koa();

const cabin = new Cabin();
app.use(cabin.middleware);

app.use(jwt({
	secret: "pa$$word"
})
	.unless({
		path: [/^\/login$/]
	}));
app.use(routes.routes());
app.use(routes.allowedMethods());

export default app;