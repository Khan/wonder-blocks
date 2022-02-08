// @flow
import type {ValidData, CacheEntry, Cache} from "./types.js";

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
 * This is only used within our framework for SSR (see ./response-cache.js).
 */
export default class MemoryCache {
    _cache: Cache;

    constructor(source: ?$ReadOnly<Cache> = null) {
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

    /**
     * Indicate if this cache is being used or now.
     *
     * When the cache has entries, returns `true`; otherwise, returns `false`.
     */
    get inUse(): boolean {
        return Object.keys(this._cache).length > 0;
    }

    store: <TData: ValidData>(id: string, entry: CacheEntry<TData>) => void = <
        TData: ValidData,
    >(
        id: string,
        entry: CacheEntry<TData>,
    ): void => {
        const frozenEntry = Object.freeze(entry);

        // Cache the data.
        this._cache[id] = frozenEntry;
    };

    retrieve: <TData: ValidData>(id: string) => ?CacheEntry<TData> = <
        TData: ValidData,
    >(
        id: string,
    ): ?CacheEntry<TData> => {
        // Get the response.
        const internalEntry = this._cache[id];
        if (internalEntry == null) {
            return null;
        }

        return internalEntry;
    };

    remove: (id: string) => boolean = (id: string): boolean => {
        // NOTE(somewhatabstract): We could invoke removeAll with a predicate
        // to match the key of the entry we're removing, but that's an
        // inefficient way to remove a single item, so let's not do that.

        // Get the entry.
        const internalEntry = this._cache[id];
        if (internalEntry == null) {
            return false;
        }

        // Delete the entry.
        delete this._cache[id];
        return true;
    };

    removeAll: (
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<ValidData>>,
        ) => boolean,
    ) => number = (
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<ValidData>>,
        ) => boolean,
    ): number => {
        let removedCount = 0;
        if (typeof predicate === "function") {
            // Apply the predicate to what we have cached.
            for (const [key, entry] of Object.entries(this._cache)) {
                if (predicate(key, (entry: any))) {
                    removedCount++;
                    delete this._cache[key];
                }
            }
        } else {
            // We're removing everything so delete the entire subcache.
            removedCount = Object.keys(this._cache).length;
            this._cache = {};
        }
        return removedCount;
    };

    cloneData: () => $ReadOnly<Cache> = (): $ReadOnly<Cache> => {
        try {
            return deepClone(this._cache);
        } catch (e) {
            throw new Error(
                `An error occurred while trying to clone the cache: ${e}`,
            );
        }
    };
}
