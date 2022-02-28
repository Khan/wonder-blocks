// @flow
import {clone} from "@khanacademy/wonder-stuff-core";
import {DataError, DataErrors} from "./data-error.js";
import {ScopedInMemoryCache} from "./scoped-in-memory-cache.js";
import type {ValidCacheData, ScopedCache} from "./types.js";

/**
 * Describe a serializable in-memory cache.
 */
export class SerializableInMemoryCache extends ScopedInMemoryCache {
    constructor(initialCache: ScopedCache = {}) {
        try {
            super(clone(initialCache));
        } catch (e) {
            throw new DataError(
                `An error occurred trying to initialize from a response cache snapshot: ${e}`,
                DataErrors.InvalidInput,
            );
        }
    }

    /**
     * Set a value in the cache.
     */
    set<TValue: ValidCacheData>(
        scope: string,
        id: string,
        value: TValue,
    ): void {
        super.set(scope, id, Object.freeze(clone(value)));
    }

    /**
     * Clone the cache.
     */
    clone(): ScopedCache {
        try {
            return clone(this._cache);
        } catch (e) {
            throw new DataError(
                "An error occurred while trying to clone the cache",
                DataErrors.Internal,
                {
                    cause: e,
                },
            );
        }
    }
}
