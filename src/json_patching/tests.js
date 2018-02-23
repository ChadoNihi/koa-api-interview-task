import assert from "assert";
import supertest from "supertest";

import config from "../config";
import server from "../server";

describe("route: /v1/json-patch", () => {
  const request = supertest(server);

  describe("post", () => {
    afterEach(() => {
      server.close();
    });

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

    it("should return an updated JSON document", () => {
      request
        .post("/v1/json-patch")
        .set('Authorization', `Bearer ${token}`)
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
        .then(res => {
          assert(res.status === 200);
        });
    });
  });
});