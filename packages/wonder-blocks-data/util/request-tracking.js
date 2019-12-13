// @flow
import * as React from "react";
import {ResponseCache} from "./response-cache.js";
import {RequestFulfillment} from "./request-fulfillment.js";

import type {Cache, IRequestHandler} from "./types.js";

type TrackerFn = (handler: IRequestHandler<any, any>, options: any) => void;

type HandlerCache = {
    [type: string]: IRequestHandler<any, any>,
    ...,
};

type RequestCache = {
    [handlerType: string]: {
        [key: string]: any,
        ...,
    },
    ...,
};

/**
 * Used to inject our tracking function into the render framework.
 *
 * INTERNAL USE ONLY
 */
export const TrackerContext: React.Context<?TrackerFn> = new React.createContext<?TrackerFn>(
    null,
);

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
    static get Default() {
        if (!_default) {
            _default = new RequestTracker();
        }
        return _default;
    }

    /**
     * These are the caches for tracked requests, their handlers, and responses.
     */
    _trackedHandlers: HandlerCache = {};
    _trackedRequests: RequestCache = {};
    _responseCache: ResponseCache;
    _requestFulfillment: RequestFulfillment;

    constructor(responseCache: ?ResponseCache = undefined) {
        this._responseCache = responseCache || ResponseCache.Default;
        this._requestFulfillment = new RequestFulfillment(responseCache);
    }

    /**
     * Track a request.
     *
     * This method caches a request and its handler for use during server-side
     * rendering to allow us to fulfill requests before producing a final render.
     */
    trackDataRequest = (
        handler: IRequestHandler<any, any>,
        options: any,
    ): void => {
        const key = handler.getKey(options);
        const type = handler.type;

        /**
         * Make sure we have stored the handler for use when fulfilling requests.
         */
        if (this._trackedHandlers[type] == null) {
            this._trackedHandlers[type] = handler;
            this._trackedRequests[type] = {};
        }

        /**
         * If we don't already have this tracked, then let's track it.
         */
        if (this._trackedRequests[type][key] == null) {
            this._trackedRequests[type][key] = options;
        }
    };

    /**
     * Reset our tracking info.
     */
    reset = () => {
        this._trackedHandlers = {};
        this._trackedRequests = {};
    };

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
     * @returns {Promise<Cache>} A frozen cache of the data that was cached
     * as a result of fulfilling the tracked requests.
     */
    fulfillTrackedRequests = (): Promise<$ReadOnly<Cache>> => {
        const promises = [];

        for (const handlerType of Object.keys(this._trackedHandlers)) {
            const handler = this._trackedHandlers[handlerType];

            // For each handler, we will perform the request fulfillments!
            const requests = this._trackedRequests[handlerType];
            for (const requestKey of Object.keys(requests)) {
                const promise = this._requestFulfillment.fulfill(
                    handler,
                    requests[requestKey],
                );

                /**
                 * We shouldn't get bad results here, but we might, so let's
                 * be defensive.
                 */
                if (promise != null) {
                    promises.push(promise);
                }
            }
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
            this._responseCache.cloneCachedData(),
        );
    };
}
