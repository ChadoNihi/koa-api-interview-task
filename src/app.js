import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import helmet from "koa-helmet";
import koaJwt from "koa-jwt";
import pinoLogger from "koa-pino-logger";
import serveStatic from "koa-static";

import config from "./config";
import setRoutes from "./routes";

const app = new Koa();

app.use(pinoLogger());
if (process.env.NODE_ENV.startsWith("test")) {
	app.use(async (ctx, next) => {
		ctx.log.level = "silent";
		await next();
	});
}

app.use(helmet());
app.use(compress());
app.use(bodyParser());
app.use(serveStatic("./public"));
app.use(koaJwt({
	secret: config.jwtSecret
})
	.unless({
		path: [/^\/v1\/login$/, /test-img.png$/]
	})
);

setRoutes(app);

export default app;