import {
  applyOperation,
  applyReducer
} from "fast-json-patch";

export const postPatch = async (ctx) => {
  const {
    patch,
    target
  } = ctx.request.body;

  // if falsy or {}
  if (!patch || (Object.keys(patch).length === 0 && patch.constructor === Object)) {
    ctx.body = {
      result: target
    };
  } else {
    try {
      ctx.body = {
        result: (
          Array.isArray(patch) ?
          patch.reduce(applyReducer, target) :
          applyOperation(target, patch).newDocument
        )
      };
    } catch (e) {
      ctx.log.info(e.message);
      ctx.throw(400);
    }
  }
};