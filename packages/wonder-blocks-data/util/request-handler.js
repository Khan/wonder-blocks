// @flow
import type {IRequestHandler} from "./types.js";

/**
 * Base implementation for creating a request handler.
 *
 * Provides a base implementation of the `IRequestHandler` base class for
 * use with the Wonder Blocks Data framework.
 */
export default class RequestHandler<TOptions, TData>
    implements IRequestHandler<TOptions, TData> {
    _type: string;
    _fulfillRequest: (options: TOptions) => Promise<TData>;

    _requestsInFlight: {
        [key: string]: Promise<TData>,
        ...,
    } = {};

    constructor(
        type: string,
        fulfillRequest: (options: TOptions) => Promise<TData>,
    ) {
        this._type = type;
        this._fulfillRequest = fulfillRequest;
    }

    get type() {
        return this._type;
    }

    invalidateCache(options: TOptions): boolean {
        /**
         * By default, the cache is always valid.
         */
        return false;
    }

    getKey(options: TOptions): string {
        try {
            return String(JSON.stringify(options));
        } catch (e) {
            throw new Error(`Failed to auto-generate key: ${e}`);
        }
    }

    fulfillRequest(options: TOptions): Promise<TData> {
        throw new Error("Not implemented");
    }
}
