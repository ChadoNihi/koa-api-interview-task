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

    // const reErr = /\berror[s]?\b/i;

    it("should return the 500 err on unreachable src", async () => {
      await request
        .get("/v1/thumbnail?src=999999")
        .set("Authorization", `Bearer ${token}`)
        .expect(500);
    });

    it("should return the 400 err on malformed src", async () => {
      await request
        .get("/v1/thumbnail?src=%E0%A4%A")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    it("should return the 400 err on no src", async () => {
      await request
        .get("/v1/thumbnail")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    it("should return the 400 err on malformed dims", async () => {
      await request
        .get(`/v1/thumbnail?src=${encodeURIComponent(config.test.imgUrl)}&dims=77hhhhhhhhh88`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    it("should return the 400 err on negative dims", async () => {
      await request
        .get(`/v1/thumbnail?src=${encodeURIComponent(config.test.imgUrl)}&dims=-77x88`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    it("should return the 400 err on big dims", async () => {
      await request
        .get(`/v1/thumbnail?src=${encodeURIComponent(config.test.imgUrl)}&dims=9977x988`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });

    it("should return the 500 err on a non-img URL", async () => {
      await request
        .get(`/v1/thumbnail?src=${encodeURIComponent("https://www.wikipedia.org/")}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(500);
    });
  });
});