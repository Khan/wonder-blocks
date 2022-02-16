// @flow
import type {Result, ValidCacheData} from "./types.js";

import {GqlError, GqlErrors} from "./gql-error.js";

type RequestCache = {
    [id: string]: Promise<Result<any>>,
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
            handler: () => Promise<TData>,
            hydrate?: boolean,
        |},
    ) => Promise<Result<TData>> = <TData: ValidCacheData>(
        id: string,
        {
            handler,
            hydrate = true,
        }: {|
            handler: () => Promise<TData>,
            hydrate?: boolean,
        |},
    ): Promise<Result<TData>> => {
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
            .then((data: ?TData): Result<TData> => {
                if (data == null) {
                    return {
                        status: "aborted",
                    };
                }
                return {
                    status: "success",
                    data,
                };
            })
            .catch((error: string | Error): Result<TData> => {
                const actualError =
                    typeof error === "string"
                        ? new GqlError("Request failed", GqlErrors.Unknown, {
                              metadata: {
                                  unexpectedError: error,
                              },
                          })
                        : error;

                // Return aborted result if the request was aborted.
                // The only way to detect this reliably, it seems, is to
                // check the error name and see if it's "AbortError" (this
                // is also what Apollo does).
                // Even then, it's reliant on the handler supporting aborts.
                // TODO(somewhatabstract, FEI-4276): Add first class abort
                // support to the handler API.
                if (actualError.name === "AbortError") {
                    return {
                        status: "aborted",
                    };
                }
                return {
                    status: "error",
                    error: actualError,
                };
            })
            .finally(() => {
                delete this._requests[id];
            });

        // Store the request in our cache.
        this._requests[id] = request;

        return request;
    };
}
