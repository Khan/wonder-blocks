// @flow
import {ResponseCache} from "./response-cache.js";

import type {IRequestHandler} from "./types.js";

type Subcache = {
    [key: string]: Promise<any>,
    ...,
};

type RequestCache = {
    [handlerType: string]: Subcache,
    ...,
};

let _default: RequestFulfillment;

export class RequestFulfillment {
    static get Default() {
        if (!_default) {
            _default = new RequestFulfillment();
        }
        return _default;
    }

    _responseCache: ResponseCache;
    _requests: RequestCache = {};

    constructor(responseCache?: ?ResponseCache = undefined) {
        this._responseCache = responseCache || ResponseCache.Default;
    }

    _getHandlerSubcache = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
    ): Subcache => {
        if (!this._requests[handler.type]) {
            this._requests[handler.type] = {};
        }
        return this._requests[handler.type];
    };

    /**
     * Get a promise of a request for a given handler and options.
     *
     * This will return an inflight request if one exists, otherwise it will
     * make a new request. Inflight requests are deleted once they resolve.
     */
    fulfill = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?Promise<void> => {
        const handlerRequests = this._getHandlerSubcache(handler);
        const key = handler.getKey(options);

        /**
         * If we have an inflight request, we'll provide that.
         */
        const inflight = handlerRequests[key];
        if (inflight) {
            return inflight;
        }

        /**
         * We don't have an inflight request, so let's set one up.
         */
        const {cacheData, cacheError} = this._responseCache;
        try {
            const request = handler
                .fulfillRequest(options)
                .then((data) => {
                    /**
                     * Let's cache the data!
                     */
                    cacheData(handler, options, data);
                    delete handlerRequests[key];
                    return undefined;
                })
                .catch((error) => {
                    /**
                     * Let's cache the error!
                     */
                    cacheError(handler, options, error);
                    delete handlerRequests[key];
                    return undefined;
                });
            handlerRequests[key] = request;
            return request;
        } catch (e) {
            cacheError(handler, options, e);
            /**
             * In this case, we don't cache an inflight request, because there
             * really isn't one. Just return null and move on.
             */
            return null;
        }
    };
}
