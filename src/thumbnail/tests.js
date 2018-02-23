// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import config from "../config";
import server from "../server";

describe("route: /v1/thumbnail", () => {
  const request = supertest(server);

  describe("get", () => {
    afterEach(() => {
      server.close();
    });

    it("should be unauthorized", (done) => {
      request
        .get("/v1/thumbnail?src=https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#/media/File:404_error_sample.png")
        .expect(401, done);
    });

    let token;
    request
      .post('/v1/login')
      .set('Accept', 'application/json')
      .send({
        username: 'test',
        password: 'test'
      })
      .then(resp => {
        token = res.body.token;
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