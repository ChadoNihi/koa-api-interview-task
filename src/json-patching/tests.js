import supertest from "supertest";

import server from "../server";

describe("route: /v1/json-patch", () => {
	const request = supertest(server);

	describe("post", () => {
		afterEach(() => {
			server.close();
		});

		it("should be unauthorized", async () => {
			await request
				.post("/v1/json-patch")
				.send({
					target: {
						"baz": "qux"
					}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect(401);
		});

		let token;
		request
			.post("/v1/login")
			.set("Accept", "application/json")
			.send({
				username: "test",
				password: "test"
			})
			.then(res => {
				token = res.body.token;
			});

		it("should return an updated JSON document given one operation", async () => {
			await request
				.post("/v1/json-patch")
				.set("Authorization", `Bearer ${token}`)
				.send({
					target: {
						"baz": "qux",
						"foo": "bar"
					},
					patch: {
						"op": "replace",
						"path": "/baz",
						"value": "boo"
					}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect({
					result: {
						"baz": "boo",
						"foo": "bar"
					}
				})
				.expect(200);
		});

		it("should return an updated JSON document given an array of operations", async () => {
			await request
				.post("/v1/json-patch")
				.set("Authorization", `Bearer ${token}`)
			// data from http://jsonpatch.com/#simple-example
				.send({
					target: {
						"baz": "qux",
						"foo": "bar"
					},
					patch: [{
						"op": "replace",
						"path": "/baz",
						"value": "boo"
					},
					{
						"op": "add",
						"path": "/hello",
						"value": ["world"]
					},
					{
						"op": "remove",
						"path": "/foo"
					}
					]
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect({
					result: {
						"baz": "boo",
						"hello": ["world"]
					}
				})
				.expect(200);
		});

		it("should return an identical JSON document given no patch field", async () => {
			await request
				.post("/v1/json-patch")
				.set("Authorization", `Bearer ${token}`)
				.send({
					target: {
						"baz": "qux",
						"foo": "bar"
					}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect({
					result: {
						"baz": "qux",
						"foo": "bar"
					}
				})
				.expect(200);
		});

		it("should return an identical JSON document given an empty patch field", async () => {
			await request
				.post("/v1/json-patch")
				.set("Authorization", `Bearer ${token}`)
				.send({
					target: {
						"baz": "qux",
						"foo": "bar"
					},
					patch: {}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect({
					result: {
						"baz": "qux",
						"foo": "bar"
					}
				})
				.expect(200);
		});

		it("should return the 400 error given a malformed patch", async () => {
			await request
				.post("/v1/json-patch")
				.set("Authorization", `Bearer ${token}`)
				.send({
					target: {
						"baz": "qux",
						"foo": "bar"
					},
					patch: {
						geez: [
							"stop",
							"the",
							"cycle"
						]
					}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect(400);
		});
	});
});