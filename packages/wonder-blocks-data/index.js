// @flow
import {ResponseCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

export const initializeCache = ResponseCache.Default.initialize;
export const fulfillAllDataRequests =
    RequestTracker.Default.fulfillTrackedRequests;

export type {Behavior, IRequestHandler} from "./util/types.js";

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
