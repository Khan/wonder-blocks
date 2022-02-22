// @flow
import type {ValidCacheData} from "./types.js";

import {GqlError, GqlErrors} from "./gql-error.js";

type RequestCache = {
    [id: string]: Promise<any>,
    ...
};

let _default: RequestFulfillment;

/**
 * This fulfills a request, making sure that in-flight requests are shared.
 */
export class RequestFulfillment {
    static get Default(): RequestFulfillment {
        if (!_default) {
            _default = new RequestFulfillment();
        }
        return _default;
    }

    _requests: RequestCache = {};

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
    ) => Promise<?TData> = <TData: ValidCacheData>(
        id: string,
        {
            handler,
            hydrate = true,
        }: {|
            handler: () => Promise<?TData>,
            hydrate?: boolean,
        |},
    ): Promise<?TData> => {
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
        const request = handler()
            .catch((error: string | Error) => {
                if (error instanceof Error) {
                    throw error;
                }
                throw new GqlError("Request failed", GqlErrors.Unknown, {
                    metadata: {
                        unexpectedError: error,
                    },
                });
            })
            .finally(() => {
                delete this._requests[id];
            });
        this._requests[id] = request;
        return request;
    };
}
