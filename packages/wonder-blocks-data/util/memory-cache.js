// @flow
import type {
    ValidData,
    ICache,
    CacheEntry,
    Cache,
    IRequestHandler,
} from "./types.js";

function deepClone<T: {...}>(source: T | $ReadOnly<T>): $ReadOnly<T> {
    /**
     * We want to deep clone the source cache to dodge mutations by external
     * references. So we serialize the source cache to JSON and parse it
     * back into a new object.
     *
     * NOTE: This doesn't work for get/set property accessors.
     */
    const serializedInitCache = JSON.stringify(source);
    const cloneInitCache = JSON.parse(serializedInitCache);
    return Object.freeze(cloneInitCache);
}

/**
 * INTERNAL USE ONLY
 *
 * Special case cache implementation for the memory cache.
 *
 * This is only used within our framework. Handlers don't need to
 * provide this as a custom cache as the framework will default to this in the
 * absence of a custom cache. We use this for SSR too (see ./response-cache.js).
 */
export default class MemoryCache<TOptions, TData: ValidData>
    implements ICache<TOptions, TData> {
    _cache: Cache;

    constructor(source: ?$ReadOnly<Cache> = undefined) {
        this._cache = {};
        if (source != null) {
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
                    `An error occurred trying to initialize from a response cache snapshot: ${e}`,
                );
            }
        }
    }

    get inUse() {
        return Object.keys(this._cache).length > 0;
    }

    store = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): void => {
        const requestType = handler.type;

        const frozenEntry = Object.isFrozen(entry)
            ? entry
            : Object.freeze(entry);

        // Ensure we have a cache location for this handler type.
        this._cache[requestType] = this._cache[requestType] || {};

        // Cache the data.
        const key = handler.getKey(options);
        this._cache[requestType][key] = frozenEntry;
    };

    retrieve = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?CacheEntry<TData> => {
        const requestType = handler.type;

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return null;
        }

        // Get the response.
        const key = handler.getKey(options);
        const internalEntry = handlerCache[key];
        if (internalEntry == null) {
            return null;
        }

        return internalEntry;
    };

    remove = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean => {
        const requestType = handler.type;

        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return false;
        }

        // Get the entry.
        const key = handler.getKey(options);
        const internalEntry = handlerCache[key];
        if (internalEntry == null) {
            return false;
        }

        // Delete the entry.
        delete handlerCache[key];
        return true;
    };

    removeAll = <TOptions, TData: ValidData>(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ) => {
        const requestType = handler.type;

        // Get the internal subcache for the handler.
        const handlerCache = this._cache[requestType];
        if (!handlerCache) {
            return 0;
        }

        // Apply the predicate to what we have cached.
        let removedCount = 0;
        for (const [key, entry] of Object.entries(handlerCache)) {
            if (
                typeof predicate !== "function" ||
                predicate(key, (entry: any))
            ) {
                removedCount++;
                delete handlerCache[key];
            }
        }
        return removedCount;
    };

    cloneData = (): $ReadOnly<Cache> => {
        try {
            return deepClone(this._cache);
        } catch (e) {
            throw new Error(
                `An error occurred while trying to clone the cache: ${e}`,
            );
        }
    };
}
