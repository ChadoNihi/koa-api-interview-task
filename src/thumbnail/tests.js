// import {
//   assert
// } from 'chai'
import assert from 'assert'
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
        .get(`/v1/thumbnail?src=${encodeURIComponent(config.test.imgUrl)}`)
        .expect(401, done);
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

    it("should return a buffer", async () => {
      await request
        // TODO: find a way to serve a local img file
        .get(`/v1/thumbnail?src=${encodeURIComponent(config.test.imgUrl)}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          // TODO: check img resolution
          assert(Buffer.isBuffer(res.body), 'Buffer in the response\'s body');
        });
    });

    // const reErr = /error/i;

    it("should return a server error on unreachable src", async () => {
      await request
        .get("/v1/thumbnail?src=999999")
        .set("Authorization", `Bearer ${token}`)
        .expect(500);
    });
  });
});