// @flow
import type {ValidData, CacheEntry, IRequestHandler, ICache} from "./types.js";

/**
 * Base implementation for creating a request handler.
 *
 * Provides a base implementation of the `IRequestHandler` base class for
 * use with the Wonder Blocks Data framework.
 */
export default class RequestHandler<TOptions, TData: ValidData>
    implements IRequestHandler<TOptions, TData> {
    _type: string;
    _cache: ?ICache<TOptions, TData>;
    _hydrate: boolean;

    constructor(
        type: string,
        cache?: ICache<TOptions, TData>,
        hydrate?: boolean = true,
    ) {
        this._type = type;
        this._cache = cache || null;
        this._hydrate = !!hydrate;
    }

    get type(): string {
        return this._type;
    }

    get cache(): ?ICache<TOptions, TData> {
        return this._cache;
    }

    get hydrate(): boolean {
        return this._hydrate;
    }

    shouldRefreshCache(
        options: TOptions,
        cachedEntry: ?$ReadOnly<CacheEntry<TData>>,
    ): boolean {
        /**
         * By default, the cache needs a refresh if the current entry is an
         * error.
         *
         * This means that an error will cause a re-request on render.
         * Useful if the server rendered an error, as it means the client
         * will update after rehydration.
         */
        return cachedEntry == null || cachedEntry.error != null;
    }

    getKey(options: TOptions): string {
        try {
            return options === undefined
                ? "undefined"
                : (JSON.stringify(options): any);
        } catch (e) {
            throw new Error(`Failed to auto-generate key: ${e}`);
        }
    }

    fulfillRequest(options: TOptions): Promise<TData> {
        throw new Error("Not implemented");
    }
}
