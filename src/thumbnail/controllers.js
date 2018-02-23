import request from "request";
import sharp from "sharp";

import config from "../config";

export const getThumb = ctx => {
	const imgSrc = ctx.request.query.src;
	const resolution = ctx.request.query.dims || config.thumbnailService.defaultResolution;

	if (imgSrc) {
		try {
			var [x, y] = resolution
				.toLowerCase()
				.split("x")
				.map(s => parseInt(s));
		} catch (e) {
			ctx.log("warn", e);
			ctx.throw(400, `Error: expected the query param "dims" to be like the default "50x50", got "${resolution}".`);
		}

		request({
			url: imgSrc,
			method: "GET",
			encoding: null // null to have the body as Buffer (https://github.com/request/request#requestoptions-callback)
		}, (err, _resp, body) => {
			if (err) {
				ctx.throw(500, `Error: cannot get the image from "${imgSrc}".`);
			} else {
				sharp(body)
					.resize(x, y)
					.toBuffer()
					.then(data => {
						ctx.body = data;
					});
			}
		});
	} else {
		ctx.throw(400, "Error: expected URL format is \"<the service URL>?src=<the image URL>[&dims=<thumbnail resolution, default is 50x50>]\".");
	}
};