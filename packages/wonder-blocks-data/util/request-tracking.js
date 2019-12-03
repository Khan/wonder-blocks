// @flow
import * as React from "react";
import {cacheData, clone} from "./response-cache.js";

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

/**
 * There are two circumstances to handle errors. When calling the
 * handler to fulfil a request and when the subsequent promise
 * fails. We don't want to throw. This is server-side. A log message
 * is all we need. That way the other requests still occur.
 */
const errorHandler = (error: any, handlerType: string, request: any): void =>
    // eslint-disable-next-line no-console
    console.error(
        `Request fulfilment failed for ${handlerType}:${JSON.stringify(
            request,
        )}:\n${error}`,
    );

const fulfilAndCache = <TOptions, TData>(
    handler: IRequestHandler<TOptions, TData>,
    options: TOptions,
) => {
    /**
     * Let's make sure that one bad apple does not spoil the barrel.
     * This should ensure that in the face of errors, not everything
     * falls apart, and should help with debugging bad requests during
     * SSR.
     */
    try {
        return handler
            .fulfilRequest(options)
            .then((data) => cacheData(handler, options, data))
            .catch((error) => errorHandler(error, handler.type, options));
    } catch (e) {
        errorHandler(e, handler.type, options);
    }

    /**
     * If it failed, we'll return null so that our calling code knows to just
     * skip this one.
     */
    return null;
};

/**
 * Initiate fulfilment of all tracked requests.
 *
 * This loops over the requests that were tracked using TrackData, and asks
 * the respective handlers to fulfil those requests in the order they were
 * tracked.
 *
 * Calling this method marks tracked requests as fulfilled; requests are
 * removed from the list of tracked requests by calling this method.
 *
 * @returns {Promise<ResponseCache>} A frozen cache of the data that was cached
 * as a result of fulfilling the tracked requests.
 */
export function fulfilAllDataRequests(): Promise<$ReadOnly<ResponseCache>> {
    const promises = [];

    for (const handlerType of Object.keys(trackedHandlers)) {
        const handler = trackedHandlers[handlerType];
        delete trackedHandlers[handlerType];

        // For each handler, we will perform the request fulfilments!
        const requests = trackedRequests[handlerType];
        delete trackedRequests[handlerType];
        for (const requestKey of Object.keys(requests)) {
            /**
             * First, we remove this from the list of tracked requests, because
             * we are fulfilling it.
             */
            const requestOptions = requests[requestKey];
            delete requests[requestKey];

            /**
             * Each option in the requestOptions represents a refresh.
             * We have to apply these in sequence.
             */
            const promise = requestOptions.reduce(
                (prev: ?Promise<any>, cur: any) => {
                    if (prev == null) {
                        return fulfilAndCache(handler, cur);
                    }
                    /**
                     * Chain the fulfilment of this request off the last.
                     */
                    return prev.then((r) => fulfilAndCache(handler, cur));
                },
                null,
            );

            if (promise != null) {
                promises.push(promise);
            }
        }
    }

    /**
     * If this is called but results in no promises, then we just return an
     * empty frozen cache.
     */
    if (promises.length === 0) {
        return Promise.resolve(Object.freeze({}));
    }

    /**
     * The calling code does not need to see all the data that we retrieved.
     */
    return Promise.all(promises).then(() => clone());
}
