// @flow
import {ResponseCache as ResCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {Cache} from "./util/types.js";

export type {Result, IRequestHandler} from "./util/types.js";

export type ResponseCache = $ReadOnly<Cache>;
export const initializeCache = (source: ResponseCache): void =>
    ResCache.Default.initialize(source);
export const fulfillAllDataRequests = (): Promise<ResponseCache> =>
    RequestTracker.Default.fulfillTrackedRequests();

export {default as RequestHandler} from "./util/request-handler.js";
export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
