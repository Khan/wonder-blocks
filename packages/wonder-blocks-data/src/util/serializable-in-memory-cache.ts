import {clone} from "@khanacademy/wonder-stuff-core";
import {DataError, DataErrors} from "./data-error";
import {ScopedInMemoryCache} from "./scoped-in-memory-cache";
import type {ValidCacheData, RawScopedCache} from "./types";

/**
 * Describe a serializable in-memory cache.
 */
export class SerializableInMemoryCache extends ScopedInMemoryCache {
    constructor(initialCache: RawScopedCache = {}) {
        try {
            super(clone(initialCache));
        } catch (e: any) {
            throw new DataError(
                `An error occurred trying to initialize from a response cache snapshot: ${e}`,
                DataErrors.InvalidInput,
            );
        }
    }

    /**
     * Set a value in the cache.
     */
    set(scope: string, id: string, value: ValidCacheData): void {
        super.set(scope, id, Object.freeze(clone(value)));
    }

    /**
     * Clone the cache.
     */
    clone(): RawScopedCache {
        try {
            return clone(this._cache);
        } catch (e: any) {
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
