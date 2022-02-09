// @flow
import * as React from "react";
import {SsrCache} from "./ssr-cache.js";
import {RequestFulfillment} from "./request-fulfillment.js";

import type {CachedResponses, ValidCacheData} from "./types.js";

type TrackerFn = <TData: ValidCacheData>(
    id: string,
    handler: () => Promise<?TData>,
    hydrate: boolean,
) => void;

type RequestCache = {
    [id: string]: {|
        hydrate?: boolean,
        handler: () => Promise<?any>,
    |},
    ...
};

/**
 * Used to inject our tracking function into the render framework.
 *
 * INTERNAL USE ONLY
 */
export const TrackerContext: React.Context<?TrackerFn> =
    new React.createContext<?TrackerFn>(null);

/**
 * The default instance is stored here.
 * It's created below in the Default() static property.
 */
let _default: RequestTracker;

/**
 * Implements request tracking and fulfillment.
 *
 * INTERNAL USE ONLY
 */
export class RequestTracker {
    static get Default(): RequestTracker {
        if (!_default) {
            _default = new RequestTracker();
        }
        return _default;
    }

    /**
     * These are the caches for tracked requests, their handlers, and responses.
     */
    _trackedRequests: RequestCache = {};
    _responseCache: SsrCache;
    _requestFulfillment: RequestFulfillment;

    constructor(responseCache: ?SsrCache = undefined) {
        this._responseCache = responseCache || SsrCache.Default;
        this._requestFulfillment = new RequestFulfillment(responseCache);
    }

    /**
     * Track a request.
     *
     * This method caches a request and its handler for use during server-side
     * rendering to allow us to fulfill requests before producing a final render.
     */
    trackDataRequest: <TData: ValidCacheData>(
        id: string,
        handler: () => Promise<?TData>,
        hydrate: boolean,
    ) => void = <TData: ValidCacheData>(
        id: string,
        handler: () => Promise<?TData>,
        hydrate: boolean,
    ): void => {
        /**
         * If we don't already have this tracked, then let's track it.
         */
        if (this._trackedRequests[id] == null) {
            this._trackedRequests[id] = {
                handler,
                hydrate,
            };
        }
    };

    /**
     * Reset our tracking info.
     */
    reset: () => void = () => {
        this._trackedRequests = {};
    };

    /**
     * Indicates if we have requests waiting to be fulfilled.
     */
    get hasUnfulfilledRequests(): boolean {
        return Object.keys(this._trackedRequests).length > 0;
    }

    /**
     * Initiate fulfillment of all tracked requests.
     *
     * This loops over the requests that were tracked using TrackData, and asks
     * the respective handlers to fulfill those requests in the order they were
     * tracked.
     *
     * Calling this method marks tracked requests as fulfilled; requests are
     * removed from the list of tracked requests by calling this method.
     *
     * @returns {Promise<CachedResponses>} The promise of the data that was
     * cached as a result of fulfilling the tracked requests.
     */
    fulfillTrackedRequests: () => Promise<CachedResponses> =
        (): Promise<CachedResponses> => {
            const promises = [];

            for (const requestKey of Object.keys(this._trackedRequests)) {
                const promise = this._requestFulfillment.fulfill(
                    requestKey,
                    this._trackedRequests[requestKey],
                );
                promises.push(promise);
            }

            /**
             * Clear out our tracked info.
             *
             * We call this now for a simpler API.
             *
             * If we reset the tracked calls after all promises resolve, any
             * requst tracking done while promises are in flight would be lost.
             *
             * If we don't reset at all, then we have to expose the `reset` call
             * for consumers to use, or they'll only ever be able to accumulate
             * more and more tracked requests, having to fulfill them all every
             * time.
             *
             * Calling it here means we can have multiple "track -> request" cycles
             * in a row and in an easy to reason about manner.
             *
             */
            this.reset();

            /**
             * Let's wait for everything to fulfill, and then clone the cached data.
             */
            return Promise.all(promises).then(() =>
                this._responseCache.cloneHydratableData(),
            );
        };
}
