import jwt from "jsonwebtoken";

export const postLogin = ctx => {
  let {
    password,
    username
  } = ctx.request.body;

  password = password.trim();
  username = username.trim();

  if (password && username) {
    ctx.body = jwt.sign({
      password,
      username
    });
  } else {
    ctx.status = 400;
  }
};