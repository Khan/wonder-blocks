// @flow
import * as React from "react";
import responseCache from "./response-cache.js";

import type {ResponseCache, IRequestHandler} from "./types.js";

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

export class RequestTracker {
    /**
     * These are the caches for tracked requests and their handlers.
     */
    _trackedHandlers: HandlerCache = {};
    _trackedRequests: RequestCache = {};

    _fulfillAndCache<TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ) {
        const {cacheData, cacheError} = responseCache;
        /**
         * Let's make sure that one bad apple does not spoil the barrel.
         * This should ensure that in the face of errors, not everything
         * falls apart, and should help with debugging bad requests during
         * SSR.
         */
        try {
            return handler
                .fulfillRequest(options)
                .then((data) => cacheData(handler, options, data))
                .catch((error: Error) => cacheError(handler, options, error));
        } catch (error) {
            cacheError(handler, options, error);
        }

        /**
         * If it failed, we'll return null so that our calling code knows to just
         * skip this one.
         */
        return null;
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
     * This method is temporary. Will be replaced with the fulfilAll... call when
     * that is implemented.
     *
     * TODO(jeff): Delete this when the fulfilment method is implemented.
     */
    tempGetTrackedRequestsAndHandlers() {
        return {
            trackedHandlers: this._trackedHandlers,
            trackedRequests: this._trackedRequests,
        };
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
     * @returns {Promise<ResponseCache>} A frozen cache of the data that was cached
     * as a result of fulfilling the tracked requests.
     */
    fulfillTrackedRequests(): Promise<$ReadOnly<ResponseCache>> {
        const promises = [];

        for (const handlerType of Object.keys(this._trackedHandlers)) {
            const handler = this._trackedHandlers[handlerType];

            // For each handler, we will perform the request fulfillments!
            const requests = this._trackedRequests[handlerType];
            for (const requestKey of Object.keys(requests)) {
                /**
                 * Each entry int he request represents a refresh of the
                 * cache value.
                 *
                 * We have to apply these in sequence.
                 */
                const promise = requests[requestKey].reduce(
                    (prev: ?Promise<any>, cur: any) => {
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
        return Promise.all(promises).then(() => responseCache.clone());
    }
}

/**
 * The default export is the instance of the request tracker that each of our
 * other pieces use. This way everything uses the same interface but we have the
 * class with which to perform testing.
 */
export default new RequestTracker();
