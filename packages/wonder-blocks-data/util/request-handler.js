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

    constructor(type: string, defaultCacheHitBehavior: Behavior = "static") {
        this._type = type;
        this._defaultCacheHitBehavior = defaultCacheHitBehavior;
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
        throw new Error("Not implemented");
    }
}
