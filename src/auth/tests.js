import assert from "assert";
import supertest from "supertest";

import server from "../server";

describe("route: /v1/login", () => {
	const request = supertest(server);

	describe("post", () => {
		afterEach(() => {
			server.close();
		});

		it("should return JSON", async () => {
			await request
				.post("/v1/login")
				.send({
					username: "UserX",
					password: "123xyz123xyz123xyz"
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200)
				.expect(res => {
					assert("token" in res.body, "No token in the response body");
				});
		});

		it("rejects empty username", async () => {
			await request
				.post("/v1/login")
				.send({
					username: "        \n       \t  ",
					password: "123xyz123xyz123xyz"
				})
				.set("Accept", "application/json")
				.expect(400);
		});

		it("rejects empty password", async () => {
			await request
				.post("/v1/login")
				.send({
					username: "Altruisto",
					password: "   \n   \t  "
				})
				.set("Accept", "application/json")
				.expect(400);
		});

		it("rejects non-string username", async () => {
			await request
				.post("/v1/login")
				.send({
					username: {
						firstName: "Kent"
					},
					password: "123xyz123xyz123xyz"
				})
				.set("Accept", "application/json")
				.expect(400);
		});

		it("rejects non-string password", async () => {
			await request
				.post("/v1/login")
				.send({
					username: "Altruisto",
					password: [
						1,
						2
					]
				})
				.set("Accept", "application/json")
				.expect(400);
		});

		it("ignores additional fields", async () => {
			await request
				.post("/v1/login")
				.send({
					username: "Altruisto",
					password: "123",
					ignore: "real problems"
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200)
				.expect(res => {
					assert("token" in res.body);
				});
		});
	});
});