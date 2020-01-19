// @flow
import {ResponseCache as ResCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

export type {Cache, CacheEntry, Result, IRequestHandler} from "./util/types.js";

export type ResponseCache = $ReadOnly<Cache>;

export const initializeCache = (source: ResponseCache): void =>
    ResCache.Default.initialize(source);

export const fulfillAllDataRequests = (): Promise<ResponseCache> =>
    RequestTracker.Default.fulfillTrackedRequests();

/**
 * TODO(somewhatabstract): Export each cache type we implement.
 *
 * Is there a base type we export, like we do for RequestHandler?
 */

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptData} from "./components/intercept-data.js";
export {default as InterceptCache} from "./components/intercept-cache.js";
