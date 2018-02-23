import jwt from "jsonwebtoken";

export const postLogin = ctx => {
  let {
    password,
    username
  } = ctx.request.body;

  try {
    password = password.trim();
    username = username.trim();
  } catch (e) {
    ctx.log("warn", e);
    ctx.throw(400);
  }

  if (password && username) {
    ctx.body = {
      token: jwt.sign({
        password,
        username
      }),
      msg: "Successful Authentication"
    };
  } else {
    const errMsg = "Password or username cannot be empty.";
    ctx.throw(400, errMsg, {
      msg: errMsg
    });
  }
};