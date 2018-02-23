// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import app from "../app";
import config from "../config";

describe("route: /v1/json-patch", () => {
	after(done => {
		app.close();
		done();
	});

	const request = supertest.agent(app.listen());

	describe("post", () => {
		it("should be unauthorized", (done) => {
			request
				.post("/v1/json-patch")
				.send({
					target: {
						"baz": "qux"
					}
				})
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.expect(401, done);
		});

		it("should return an updated JSON document", (done) => {
			request
				.post("/v1/json-patch")
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
				.expect(200, {
					result: {
						"baz": "boo",
						"hello": ["world"]
					}
				}, done);
		});
	});
});