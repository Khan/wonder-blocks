// @flow
import type {
    CacheEntry,
    ResponseCache as Cache,
    IRequestHandler,
} from "./types.js";

function deepClone<T: {...}>(source: T | $ReadOnly<T>): $ReadOnly<T> {
    /**
     * We want to deep clone the source cache to dodge mutations by external
     * references. So we serialize the source cache to JSON and parse it
     * back into a new object.
     */
    const serializedInitCache = JSON.stringify(source);
    const cloneInitCache = JSON.parse(serializedInitCache);
    return Object.freeze(cloneInitCache);
}

/**
 * The default instance is stored here.
 * It's created below in the Default() static property.
 */
let _default: ResponseCache;

/**
 * Implements the response cache.
 *
 * INTERNAL USE ONLY
 */
export class ResponseCache {
    static get Default() {
        if (!_default) {
            _default = new ResponseCache();
        }
        return _default;
    }

    _cache: Cache = {};

    constructor(source: ?Cache = undefined) {
        if (source != null) {
            this.initialize(source);
        }
    }

    _setCacheEntry<TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): CacheEntry<TData> {
        const requestType = handler.type;

        // Ensure we have a cache location for this handler type.
        this._cache[requestType] = this._cache[requestType] || {};

        // Cache the data.
        const key = handler.getKey(options);
        this._cache[requestType][key] = Object.freeze(entry);
        return this._cache[requestType][key];
    }

    /**
     * Initialize the cache from a given cache state.
     *
     * This can only be called if the cache is not already in use.
     */
    initialize = (source: $ReadOnly<Cache>): void => {
        if (Object.keys(this._cache).length !== 0) {
            throw new Error(
                "Cannot initialize data response cache more than once",
            );
        }

        try {
            /**
             * Object.assign only performs a shallow clone.
             * So we deep clone it and then assign the clone values to our
             * internal cache.
             */
            const cloneInitCache = deepClone(source);
            Object.assign(this._cache, cloneInitCache);
        } catch (e) {
            throw new Error(
                `An error occurred trying to initialize the data response cache: ${e}`,
            );
        }
    };

    /**
     * Cache data for a specific response.
     */
    cacheData = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        data: TData,
    ): CacheEntry<TData> => {
        return this._setCacheEntry(handler, options, {data});
    };

    /**
     * Cache an error for a specific response.
     */
    cacheError = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        error: Error | string,
    ): CacheEntry<TData> => {
        const errorMessage = typeof error === "string" ? error : error.message;
        return this._setCacheEntry(handler, options, {error: errorMessage});
    };

    /**
     * Retrieve data from our cache.
     */
    getEntry = <TOptions, TData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>> => {
        const requestType = handler.type;

        // Get the subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return null;
        }

        const key = handler.getKey(options);
        if (handler.invalidateCache(options)) {
            delete handlerCache[key];
        }

        // Get the response.
        const entry = handlerCache[key];
        return entry == null ? null : entry;
    };

    /**
     * Deep clone the cache.
     */
    clone = (): $ReadOnly<Cache> => {
        try {
            return deepClone(this._cache);
        } catch (e) {
            throw new Error(
                `An error occurred while trying to clone the cache: ${e}`,
            );
        }
    };
}
