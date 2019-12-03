// @flow
import * as React from "react";

import type {IRequestHandler} from "./types.js";

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
}

/**
 * The default export is the instance of the request tracker that each of our
 * other pieces use. This way everything uses the same interface but we have the
 * class with which to perform testing.
 */
export default new RequestTracker();
