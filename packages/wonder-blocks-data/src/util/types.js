// @flow
/**
 * Define what can be cached.
 *
 * We disallow functions and undefined as undefined represents a cache miss
 * and functions are not allowed.
 */
export type ValidData = string | boolean | number | {...} | Array<?ValidData>;

/**
 * The normalized result of a request.
 */
export type Result<TData: ValidData> =
    | {|
          status: "loading",
      |}
    | {|
          status: "success",
          data: TData,
      |}
    | {|
          status: "error",
          error: string,
      |}
    | {|
          status: "aborted",
      |};

/**
 * A cache entry for a fulfilled request response.
 */
export type CacheEntry<TData: ValidData> =
    | {|
          +error: string,
          +data?: void,
      |}
    | {|
          +data: TData,
          +error?: void,
      |};

export type InterceptContextData = {
    [id: string]: <TData: ValidData>() => ?Promise<?TData>,
    ...
};

/**
 * A cache of fulfilled request responses.
 */
export type Cache = {
    [key: string]: CacheEntry<any>,
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
        [id: string]: ValidData,
        ...
    },
    ...
};

export type ResponseCache = $ReadOnly<Cache>;
