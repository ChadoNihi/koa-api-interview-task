import assert from "assert";
import supertest from "supertest";

import config from "../config";
import server from "../server";

describe("route: /v1/login", () => {
  const request = supertest(server);

  describe("post", () => {
    afterEach(() => {
      server.close();
    });

    it("should return JSON", () => {
      request
        .post("/v1/login")
        .send({
          username: "UserX",
          password: "123xyz123xyz123xyz"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(res => {
          assert("token" in res.body);
        });
    });

    it("rejects empty username", async (done) => {
      await request
        .post("/v1/login")
        .send({
          username: "        \n       \t \s  ",
          password: "123xyz123xyz123xyz"
        })
        .set("Accept", "application/json")
        .expect(400, done);
    });

    it("rejects empty passsword", (done) => {
      request
        .post("/v1/login")
        .send({
          username: "Altruisto",
          password: "   \n   \t \s "
        })
        .set("Accept", "application/json")
        .expect(400, done);
    });

    it("ignores additional fields", () => {
      request
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
        .then(res => {
          assert("token" in res.body);
        });
    });
  });
});