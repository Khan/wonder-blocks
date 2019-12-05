// @flow
import {ResponseCache} from "./util/response-cache.js";

export const initializeCache = ResponseCache.Default.initialize;

export type {IRequestHandler} from "./util/types.js";

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
