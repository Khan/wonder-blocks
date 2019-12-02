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
 * INTERNAL: Used to inject our tracking function into the render framework.
 */
export const TrackerContext: React.Context<?TrackerFn> = new React.createContext<?TrackerFn>(
    null,
);

/**
 * These are the caches for tracked requests and their handlers.
 */
const trackedHandlers: HandlerCache = {};
const trackedRequests: RequestCache = {};

/**
 * Track a request.
 *
 * This method caches a request and its handler for use during server-side
 * rendering to allow us to fulfil requests before producing a final render.
 */
export function trackDataRequest(
    handler: IRequestHandler<any, any>,
    options: any,
): void {
    const key = handler.getKey(options);
    const type = handler.type;

    /**
     * Make sure we have stored the handler for use when fulfilling requests.
     */
    if (trackedHandlers[type] == null) {
        trackedHandlers[type] = handler;
        trackedRequests[type] = {};
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
            if (trackedRequests[type][key] == null) {
                trackedRequests[type][key] = [options];
            }
            break;

        case "refresh":
            /**
             * For refresh requests, we need to track and fulfil each one.
             */
            const current = trackedRequests[type][key] || [];
            trackedRequests[type][key] = [...current, options];
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
export function tempGetTrackedRequestsAndHandlers() {
    return {
        trackedHandlers,
        trackedRequests,
    };
}
