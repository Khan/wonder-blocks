// @flow
import {ResponseCache as ResCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {ResponseCache as Cache} from "./util/types.js";

export opaque type ResponseCache = Cache;

export type {Result, IRequestHandler} from "./util/types.js";

export const initializeCache = ResCache.Default.initialize;
export const fulfillAllDataRequests =
    RequestTracker.Default.fulfillTrackedRequests;

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
