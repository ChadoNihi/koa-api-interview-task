import jwt from "jsonwebtoken";

export const postLogin = ctx => {
	const {
		password,
		username
	} = ctx.request.body;

	ctx.body = jwt.sign({
		password,
		username
	});
};