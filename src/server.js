// import http from 'http'

import app from "./app";
import config from "./config";

const server = app.listen(config.server.port, config.server.host, () => {
	// TODO: use logger from the context?
	console.log(`Listening on ${config.server.host}:${config.server.port}. Play with me!`);
});

export default server;