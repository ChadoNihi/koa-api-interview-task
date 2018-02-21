import app from "./app";

import config from "./config";

app.server.listen(config.server.port, config.server.host, ctx => {
  ctx.log("info", `Listening on port ${config.server.port}. Play with me!`);
});