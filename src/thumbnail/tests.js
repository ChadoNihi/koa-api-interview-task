// import {
//   assert
// } from 'chai'
import supertest from "supertest";

import config from "../config";
import server from "../server";
import {
  getWidthHeightFromResolutionStr
} from './helpers'

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
      .then(res => {
        token = res.body.token;
      });

    it('should return a thumbnail image of the default size', async () => {
      await request
        .get(`/v1/thumbnail?src=${encodeURIComponent("./test-img.png")}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          const {
            width,
            height
          } = res.body;
          const [defaultW, defaultH] = getWidthHeightFromResolutionStr(config.defaultResolution)

          assert(width === defaultW);
          assert(height === defaultH);
        });
    });

    const reErr = /error/i;

    it("should return an error on corrupt src", async () => {
      await request
        .get("/v1/thumbnail?src=999999")
        .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(res => {
          assert(reErr.test(res.body));
        });
    });
  });
});