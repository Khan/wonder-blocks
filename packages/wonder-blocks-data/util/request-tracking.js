// @flow
import * as React from "react";
import {ResponseCache} from "./response-cache.js";

import type {ResponseCache as Cache, IRequestHandler} from "./types.js";

type TrackerFn = (handler: IRequestHandler<any, any>, options: any) => void;

type HandlerCache = {
    [type: string]: IRequestHandler<any, any>,
    ...,
};

type RequestCache = {
    [handlerType: string]: {
        [key: string]: Array<any>,
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

    constructor(responseCache?: ?ResponseCache = undefined) {
        this._responseCache = responseCache || ResponseCache.Default;
    }

    _fulfillAndCache<TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): Promise<void> {
        const {cacheData, cacheError} = this._responseCache;
        /**
         * Let's make sure that one bad apple does not spoil the barrel.
         * This should ensure that in the face of errors, not everything
         * falls apart, and should help with debugging bad requests during
         * SSR.
         */
        try {
            return handler
                .fulfillRequest(options)
                .then((data) => {
                    cacheData(handler, options, data);
                    return undefined;
                })
                .catch((error) => {
                    cacheError(handler, options, error);
                    return undefined;
                });
        } catch (error) {
            cacheError(handler, options, error);
            return Promise.resolve(undefined);
        }
    }

    /**
     * Track a request.
     *
     * This method caches a request and its handler for use during server-side
     * rendering to allow us to fulfill requests before producing a final render.
     */
    trackDataRequest(handler: IRequestHandler<any, any>, options: any): void {
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
         * Get the cache hit behavior so we can determine what to do.
         */
        const behavior = handler.cacheHitBehavior(options);
        switch (behavior) {
            case "static":
                /**
                 * For static requests, if something is already doing this,
                 * then we just let it.
                 */
                if (this._trackedRequests[type][key] == null) {
                    this._trackedRequests[type][key] = [options];
                }
                break;

            case "refresh":
                /**
                 * For refresh requests, we need to track and fulfill each one.
                 */
                const current = this._trackedRequests[type][key] || [];
                this._trackedRequests[type][key] = [...current, options];
                break;

            default:
                /**
                 * Defensive just in case we ever add new behaviors and forget to
                 * update this code.
                 */
                throw new Error(`Invalid behavior: ${behavior}`);
        }
    }

    /**
     * Reset our tracking info.
     */
    reset() {
        this._trackedHandlers = {};
        this._trackedRequests = {};
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
     * @returns {Promise<Cache>} A frozen cache of the data that was cached
     * as a result of fulfilling the tracked requests.
     */
    fulfillTrackedRequests(): Promise<$ReadOnly<Cache>> {
        const promises = [];

        for (const handlerType of Object.keys(this._trackedHandlers)) {
            const handler = this._trackedHandlers[handlerType];

            // For each handler, we will perform the request fulfillments!
            const requests = this._trackedRequests[handlerType];
            for (const requestKey of Object.keys(requests)) {
                /**
                 * Each entry in the request represents a refresh of the
                 * cache value.
                 *
                 * Although the handler may already enforce ordering of refresh
                 * calls, let's play it safe and assume it wont.
                 *
                 * So, we apply these in sequence.
                 */
                const promise = requests[requestKey].reduce(
                    (prev: ?Promise<any>, cur: any): ?Promise<any> => {
                        if (prev == null) {
                            return this._fulfillAndCache(handler, cur);
                        }
                        /**
                         * Chain the fulfillment of this request off the last.
                         * This ensures that fulfillment side-effects occur in order.
                         */
                        return prev.then(() =>
                            this._fulfillAndCache(handler, cur),
                        );
                    },
                    null,
                );

                if (promise != null) {
                    promises.push(promise);
                }
            }
        }

        /**
         * Clear out our tracked info.
         */
        this.reset();

        /**
         * If this is called but results in no promises, then we just return an
         * empty cache.
         */
        if (promises.length === 0) {
            return Promise.resolve(Object.freeze({}));
        }

        /**
         * Let's wait for everything to fulfill, and then clone the cached data.
         */
        return Promise.all(promises).then(() => this._responseCache.clone());
    }
}
