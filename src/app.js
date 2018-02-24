import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Cabin from "cabin";
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import koaJwt from "koa-jwt";

import config from "./config";
import setRoutes from "./routes";

const app = new Koa();

const cabin = new Cabin();
app.use(cabin.middleware);

app.use(helmet());
app.use(compress());
app.use(bodyParser());
app.use(koaJwt({
    secret: config.jwtSecret
  })
  .unless({
    path: [/^\/v1\/login$/]
  })
);

setRoutes(app);

export default app;