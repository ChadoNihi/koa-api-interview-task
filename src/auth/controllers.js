import jwt from "jsonwebtoken";

import config from "../config";

export const postLogin = async (ctx) => {
  let {
    password,
    username
  } = ctx.request.body;

  try {
    password = password.trim();
    username = username.trim();
  } catch (e) {
    ctx.log.info(e.message);
    ctx.throw(400);
  }

  if (password && username) {
    ctx.body = {
      token: jwt.sign({
        password,
        username
      }, config.jwtSecret),
      msg: "Successful Authentication"
    };
  } else {
    const errMsg = "Password or username cannot be empty.";
    ctx.throw(400, errMsg, {
      msg: errMsg
    });
  }
};