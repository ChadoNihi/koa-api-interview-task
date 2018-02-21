// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import app from "../app";
import config from "../config";

describe("route: /login", () => {
  let request;
  before(() => {
    request = supertest(app.listen(config.server.port, config.server.host));
  });

  describe("post", () => {
    it("should return JSON", () => {
      request
        .post('/login')
        .send({
          username: "UserX",
          password: "123xyz123xyz123xyz"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("rejects empty username", () => {
      request
        .post('/login')
        .send({
          username: "        \n       \t \s  ",
          password: "123xyz123xyz123xyz"
        })
        .set("Accept", "application/json")
        .expect(400);
    });

    it("rejects empty passsword", () => {
      request
        .post('/login')
        .send({
          username: "Altruisto",
          password: "   \n   \t \s "
        })
        .set("Accept", "application/json")
        .expect(400);
    });

    it("ignores additional fields", () => {
      request
        .post('/login')
        .send({
          username: "Altruisto",
          password: "123",
          ignore: "real problems"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});