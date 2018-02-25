import sharp from "sharp";

import asyncRequest from "../lib/async-request";
import config from "../config";
import {
  getWidthHeightFromResolutionStr
} from "./helpers";

export const getThumb = async (ctx) => {
  const encodedImgSrc = ctx.request.query.src;
  const resolution = ctx.request.query.dims || config.thumbnailService.defaultResolution;

  if (encodedImgSrc) {
    try {
      var imgSrc = decodeURIComponent(encodedImgSrc);
    } catch (e) {
      ctx.log("warn", e);
      ctx.throw(400, "Error: malformed URL in the \"src\" query parameter.");
    }

    try {
      var [w, h] = getWidthHeightFromResolutionStr(resolution);

      if (w > config.thumbnailService.maxW || h > config.thumbnailService.maxH) {
        throw Error('Thumbnail should be small.');
      }
    } catch (e) {
      ctx.log("warn", e);
      ctx.throw(
        400,
        `Error: expected the query param "dims" to be like the default "50x50" (maximum "${config.thumbnailService.maxW}x${config.thumbnailService.maxH}"), got "${resolution}".`
      );
    }

    await asyncRequest({
        url: imgSrc,
        method: "GET",
        encoding: null // null to have the body as Buffer (https://github.com/request/request#requestoptions-callback)
      })
      .then(body => {
        return sharp(body)
          .resize(w, h)
          .toBuffer()
          .then(data => {
            ctx.body = data;
          });
      })
      .catch(err => {
        ctx.log("warn", err);
        ctx.throw(500, `Error: cannot get the image from "${imgSrc}".`);
      });
  } else {
    ctx.throw(400, "Error: expected URL format is \"<the service URL>?src=<the image URL>[&dims=<thumbnail resolution, default is 50x50>]\".");
  }
};