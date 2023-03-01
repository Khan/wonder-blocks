import type {Result, ValidCacheData} from "./types";

import {DataError, DataErrors} from "./data-error";

type RequestCache = {
    [id: string]: Promise<Result<any>>;
};

type FulfillOptions<TData extends ValidCacheData> = {
    handler: () => Promise<TData>;
    hydrate?: boolean;
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
    fulfill: <TData extends ValidCacheData>(
        id: string,
        options: FulfillOptions<TData>,
    ) => Promise<Result<TData>> = <TData extends ValidCacheData>(
        id: string,
        {handler, hydrate = true}: FulfillOptions<TData>,
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
            .then(
                (data: TData): Result<TData> => ({
                    status: "success",
                    data,
                }),
            )
            .catch((error: string | Error): Result<TData> => {
                const actualError =
                    typeof error === "string"
                        ? new DataError("Request failed", DataErrors.Unknown, {
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

    /**
     * Abort an inflight request.
     *
     * NOTE: Currently, this does not perform an actual abort. It merely
     * removes the request from being tracked.
     */
    abort: (id: string) => void = (id) => {
        // TODO(somewhatabstract, FEI-4276): Add first class abort
        // support to the handler API.
        // For now, we will just clear the request out of the list.
        // When abort is implemented, the `finally` in the `fulfill` method
        // would handle the deletion.
        delete this._requests[id];
    };

    /**
     * Abort all inflight requests.
     *
     * NOTE: Currently, this does not perform actual aborts. It merely
     * removes the requests from our tracking.
     */
    abortAll: () => void = (): void => {
        Object.keys(this._requests).forEach((id) => this.abort(id));
    };
}
