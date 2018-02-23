import Koa from "koa";
import bodyparser from "koa-bodyparser";
import Cabin from "cabin";
import jwt from "koa-jwt";
import Router from "koa-router";

import config from "./config";
import routes from "./routes";

const app = new Koa();

const cabin = new Cabin();
app.use(cabin.middleware);

app.use(jwt({
    secret: config.jwtSecret
  })
  .unless({
    path: [/^\/v1\/login$/]
  }));
app.use(routes.routes());
app.use(routes.allowedMethods());

export default app;