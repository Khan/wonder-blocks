// @flow
import type {Behavior, IRequestHandler} from "./types.js";

/**
 * Base implementation for creating a request handler.
 *
 * Provides a base implementation of the `IRequestHandler` base class for
 * use with the Wonder Blocks Data framework.
 */
export default class RequestHandler<TOptions, TData>
    implements IRequestHandler<TOptions, TData> {
    _type: string;
    _defaultCacheHitBehavior: Behavior;
    _fulfillRequest: (options: TOptions) => Promise<TData>;

    _requestsInFlight: {
        [key: string]: Promise<TData>,
        ...,
    } = {};

    constructor(
        type: string,
        fulfillRequest: (options: TOptions) => Promise<TData>,
        defaultCacheHitBehavior: Behavior = "static",
    ) {
        this._type = type;
        this._defaultCacheHitBehavior = defaultCacheHitBehavior;
        this._fulfillRequest = fulfillRequest;
    }

    get type() {
        return this._type;
    }

    cacheHitBehavior(options: TOptions): Behavior {
        return this._defaultCacheHitBehavior;
    }

    getKey(options: TOptions): string {
        try {
            return String(JSON.stringify(options));
        } catch (e) {
            throw new Error(`Failed to auto-generate key: ${e}`);
        }
    }

    fulfillRequest(options: TOptions): Promise<TData> {
        const behavior = this.cacheHitBehavior(options);

        /**
         * If we already made this request, just return that promise.
         */
        const requestKey = this.getKey(options);
        const existingRequest = this._requestsInFlight[requestKey];

        switch (behavior) {
            case "static":
                /**
                 * If we already made this request, just return that promise.
                 */
                if (existingRequest != null) {
                    return existingRequest;
                }

                /**
                 * It's a new request. Make it, cache it, and return it.
                 */
                const newRequest = this._fulfillRequest(options);
                this._requestsInFlight[requestKey] = newRequest;
                return newRequest;

            case "refresh":
                /**
                 * We are doing a refresh, but these should occur in order,
                 * so let's chain it off the existing one, if it exists.
                 */
                const request =
                    existingRequest == null
                        ? this._fulfillRequest(options)
                        : existingRequest.then(() =>
                              this._fulfillRequest(options),
                          );
                this._requestsInFlight[requestKey] = request;
                return request;

            default:
                throw new Error(`Unknown cache hit behavior: ${behavior}`);
        }
    }
}
