A Koa API back end for one interview assignment.

## Run locally
1) `git clone https://github.com/ChadoNihi/koa-api-interview-task && cd koa-api-interview-task`
2) Install dependencies with `yarn install` (or `npm install`). (A list of the dependencies is in `package.json`.)
3) Run the app in development mode with `yarn start-dev` (or `npm run start`), for production -- `yarn start` (or `npm run start`).

## API (more detailed specs are in [open-api.yaml](https://github.com/ChadoNihi/koa-api-interview-task/blob/master/open-api.yaml))
#### POST /v1/login
###### Request example
```
{
  "username": "Green Red",
  "password": "123"
}
```
###### Response example
```
{
  "token": "someJWT"
}
```
#### POST /v1/json-patch
###### Request example
```
{
  "target": {
    "baz": "qux",
    "foo": "bar"
  },
  "patch": [
    { "op": "replace", "path": "/baz", "value": "boo" },
    { "op": "add", "path": "/hello", "value": ["world"] },
    { "op": "remove", "path": "/foo"}
  ]
}
```
###### Response example
```
{
  "result": {
    "baz": "boo",
    "hello": ["world"]
  }
}
```
#### GET /v1/thumbnail?src=<img_url>[&dims=60x60]
Returns a "thumbnail" of an image from the provided URL.

## Tests
Run tests with `yarn test` (or `npm test`). `yarn cover` (or `npm run cover`) runs the tests too, plus generates a test coverage report.

## Misc.
Lint the code with `yarn lint --fix` (or `npm run lint --fix`).
