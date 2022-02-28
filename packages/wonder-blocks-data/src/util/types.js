// @flow
import type {Metadata} from "@khanacademy/wonder-stuff-core";

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
    | {...}
    | Array<?ValidCacheData>;

/**
 * The normalized result of a request.
 */
export type Result<TData: ValidCacheData> =
    | {|
          status: "loading",
      |}
    | {|
          status: "success",
          data: TData,
      |}
    | {|
          status: "error",
          error: Error,
      |}
    | {|
          status: "aborted",
      |};

/**
 * A cache entry for a fulfilled request response.
 */
export type CachedResponse<TData: ValidCacheData> =
    | {|
          +error: string,
          +data?: void,
      |}
    | {|
          +data: TData,
          +error?: void,
      |};

/**
 * A cache of fulfilled request responses.
 */
export type ResponseCache = {
    [key: string]: CachedResponse<any>,
    ...
};

/**
 * A cache with scoped sections.
 */
export type ScopedCache = {
    /**
     * The cache is scoped to allow easier clearing of different types of usage.
     */
    [scope: string]: {
        /**
         * Each value in the cache is then identified within a given scope.
         */
        [id: string]: ValidCacheData,
        ...
    },
    ...
};

/**
 * Options to pass to error construction.
 */
export type ErrorOptions = {|
    /**
     * Metadata to attach to the error.
     */
    metadata?: ?Metadata,

    /**
     * The error that caused the error being constructed.
     */
    cause?: ?Error,
|};
