import {
  applyOperation,
  applyReducer
} from "fast-json-patch";

export const postPatch = async (ctx) => {
  const {
    patch,
    target
  } = ctx.request.body;

  if (!patch) {
    ctx.body = target;
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
      ctx.throw(400);
    }
  }
};