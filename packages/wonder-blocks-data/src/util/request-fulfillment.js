// @flow
import {ResponseCache} from "./response-cache.js";

import type {ValidCacheData, CachedResponse} from "./types.js";

type RequestCache = {
    [id: string]: Promise<any>,
    ...
};

let _default: RequestFulfillment;

export class RequestFulfillment {
    static get Default(): RequestFulfillment {
        if (!_default) {
            _default = new RequestFulfillment();
        }
        return _default;
    }

    _responseCache: ResponseCache;
    _requests: RequestCache = {};

    constructor(responseCache: ?ResponseCache = undefined) {
        this._responseCache = responseCache || ResponseCache.Default;
    }

    /**
     * Get a promise of a request for a given handler and options.
     *
     * This will return an inflight request if one exists, otherwise it will
     * make a new request. Inflight requests are deleted once they resolve.
     */
    fulfill: <TData: ValidCacheData>(
        id: string,
        options: {|
            handler: () => Promise<?TData>,
            hydrate?: boolean,
        |},
    ) => Promise<?CachedResponse<TData>> = <TData: ValidCacheData>(
        id: string,
        {
            handler,
            hydrate = true,
        }: {|
            handler: () => Promise<?TData>,
            hydrate?: boolean,
        |},
    ): Promise<?CachedResponse<TData>> => {
        /**
         * If we have an inflight request, we'll provide that.
         */
        const inflight = this._requests[id];
        if (inflight) {
            return inflight;
        }

        /**
         * We don't have an inflight request, so let's set one up.
         */
        const {cacheData, cacheError} = this._responseCache;
        try {
            const request = handler()
                .then((data: ?TData) => {
                    delete this._requests[id];
                    if (data == null) {
                        // Request aborted. We won't cache this.
                        return null;
                    }

                    /**
                     * Let's cache the data!
                     *
                     * NOTE: This only caches when we're server side.
                     */
                    return cacheData<TData>(id, data, hydrate);
                })
                .catch((error: string | Error) => {
                    delete this._requests[id];
                    /**
                     * Let's cache the error!
                     *
                     * NOTE: This only caches when we're server side.
                     */
                    return cacheError<TData>(id, error, hydrate);
                });
            this._requests[id] = request;
            return request;
        } catch (e) {
            /**
             * In this case, we don't cache an inflight request, because there
             * really isn't one.
             */
            return Promise.resolve(cacheError<TData>(id, e, hydrate));
        }
    };
}
