// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import config from "../config";

describe("route: /login", () => {
	let request;
	before(() => {
		request = supertest(app.listen(config.server.port, config.server.host));
	});

	describe("post", () => {
		it("should return JSON", () => {
			request
				.post()
				.send({
					username: "UserX",
					password: "123xyz123xyz123xyz"
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200);
		});
	});
});