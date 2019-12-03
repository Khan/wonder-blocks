// @flow
import responseCache from "./util/response-cache.js";

export const initializeCache = responseCache.initialize;

export type {Behavior, IRequestHandler} from "./util/types.js";

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
