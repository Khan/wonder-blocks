// @flow
import responseCache from "./util/response-cache.js";
import requestTracker from "./util/request-tracking.js";

export const initializeCache = responseCache.initialize;
export const fulfillAllDataRequests = requestTracker.fulfillTrackedRequests;

export type {Behavior, IRequestHandler} from "./util/types.js";

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
