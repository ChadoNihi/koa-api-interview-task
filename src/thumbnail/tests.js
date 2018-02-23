// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import app from "../app";
import config from "../config";

describe("route: /v1/thumbnail", () => {
	after(done => {
		app.close();
		done();
	});

	const request = supertest.agent(app.listen());

	describe("get", () => {
		it("should be unauthorized", (done) => {
			request
				.get("/v1/thumbnail?src=https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#/media/File:404_error_sample.png")
				.expect(401, done);
		});

		const reErr = /error/i;

		it("should return an error on corrupt src", () => {
			request
				.get("/v1/thumbnail?src=999999")
				.expect("Content-Type", /json/)
				.expect(400)
				.then(resp => {
					assert(reErr.test(resp.body));
				});
		});
	});
});