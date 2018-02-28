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
      ctx.log.info(e.message);
      ctx.throw(400, "Error: malformed URL in the \"src\" query parameter.");
    }

    try {
      var [w, h] = getWidthHeightFromResolutionStr(resolution);

      if (w > config.thumbnailService.maxThumbW || h > config.thumbnailService.maxThumbH) {
        throw Error("Thumbnail should be small.");
      }
    } catch (e) {
      ctx.log.info(e.message);
      ctx.throw(
        400,
        `Error: expected the query param "dims" to be like the default "50x50" (maximum "${config.thumbnailService.maxThumbW}x${config.thumbnailService.maxThumbH}"), got "${resolution}".`
      );
    }

    await asyncRequest({
        url: imgSrc,
        method: "GET",
        encoding: null // null to have the body as Buffer (https://github.com/request/request#requestoptions-callback)
      })
      .then(body => {
        // make thumbnail
        return sharp(body)
          .resize(w, h)
          .toBuffer()
          .then(data => {
            ctx.body = data;
          });
      })
      .catch(e => {
        ctx.log.warn(e.message);
        ctx.throw(500, `Error: cannot get the image from "${imgSrc}".`);
      });
  } else {
    ctx.throw(400, "Error: expected URL format is \"<the service URL>?src=<the image URL>[&dims=<thumbnail resolution, default is 50x50>]\".");
  }
};