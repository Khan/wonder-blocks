import type {Metadata} from "@khanacademy/wonder-stuff-core";

/**
 * Defines the various fetch policies that can be applied to requests.
 */
// TODO(FEI-5000): Convert to TS enum after all codebases have been migrated
export const FetchPolicy = {
    /**
     * If the data is in the cache, return that; otherwise, fetch from the
     * server.
     */
    CacheBeforeNetwork: "CacheBeforeNetwork" as const,

    /**
     * If the data is in the cache, return that; always fetch from the server
     * regardless of cache.
     */
    CacheAndNetwork: "CacheAndNetwork" as const,

    /**
     * If the data is in the cache, return that; otherwise, do nothing.
     */
    CacheOnly: "CacheOnly" as const,

    /**
     * Ignore any existing cached result; always fetch from the server.
     */
    NetworkOnly: "NetworkOnly" as const,
} as const;

/**
 * Define what can be cached.
 *
 * We disallow functions and undefined as undefined represents a cache miss
 * and functions are not allowed.
 */
export type ValidCacheData =
    | string
    | boolean
    | number
    | Record<any, any>
    | Array<ValidCacheData | null | undefined>;

/**
 * The normalized result of a request.
 */
export type Result<TData extends ValidCacheData> =
    | {
          status: "loading";
      }
    | {
          status: "no-data";
      }
    | {
          status: "success";
          data: TData;
      }
    | {
          status: "error";
          error: Error;
      }
    | {
          status: "aborted";
      };

/**
 * A cache entry for a fulfilled request response.
 */
export type CachedResponse<TData extends ValidCacheData> =
    | {
          readonly error: string;
          readonly data?: undefined;
      }
    | {
          readonly data: TData;
          readonly error?: undefined;
      };

/**
 * A cache of fulfilled request responses.
 */
export type ResponseCache = {
    [key: string]: CachedResponse<any>;
};

/**
 * A cache with scoped sections.
 */
export type RawScopedCache = {
    /**
     * The cache is scoped to allow easier clearing of different types of usage.
     */
    [scope: string]: {
        /**
         * Each value in the cache is then identified within a given scope.
         */
        [id: string]: ValidCacheData;
    };
};

/**
 * Options to pass to error construction.
 */
export type ErrorOptions = {
    /**
     * Metadata to attach to the error.
     */
    metadata?: Metadata | null | undefined;
    /**
     * The error that caused the error being constructed.
     */
    cause?: Error | null | undefined;
};

export interface ScopedCache {
    set(scope: string, id: string, value: ValidCacheData): void;
    /**
     * Retrieve a value from the cache.
     */
    get(scope: string, id: string): ValidCacheData | null | undefined;
    /**
     * Purge an item from the cache.
     */
    purge(scope: string, id: string): void;
    /**
     * Purge a scope of items that match the given predicate.
     *
     * If the predicate is omitted, then all items in the scope are purged.
     */
    purgeScope(
        scope: string,
        predicate?: (id: string, value: ValidCacheData) => boolean,
    ): void;
    /**
     * Purge all items from the cache that match the given predicate.
     *
     * If the predicate is omitted, then all items in the cache are purged.
     */
    purgeAll(
        predicate?: (
            scope: string,
            id: string,
            value: ValidCacheData,
        ) => boolean,
    ): void;
}
