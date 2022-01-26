// @flow
export type ValidData = string | boolean | number | {...};

export type Status = "loading" | "success" | "error";

export type Result<TData: ValidData> =
    | {|
          status: "loading",
      |}
    | {|
          status: "success",
          data?: TData,
      |}
    | {|
          status: "error",
          error: string,
      |};

export type CacheEntry<TData: ValidData> =
    | {|
          +error: string,
          +data?: ?void,
      |}
    | {|
          +data: TData,
          +error?: ?void,
      |};

type HandlerSubcache = {
    [key: string]: CacheEntry<any>,
    ...
};

export type InterceptFulfillRequestFn<TOptions, TData: ValidData> = (
    options: TOptions,
) => ?Promise<TData>;

export type Interceptor = {|
    fulfillRequest: InterceptFulfillRequestFn<any, any>,
|};

export type InterceptContextData = {
    [key: string]: Interceptor,
    ...
};

export type Cache = {
    [key: string]: HandlerSubcache,
    ...
};

export interface ICache<TOptions, TData: ValidData> {
    /**
     * Stores a value in the cache for the given handler and options.
     */
    store(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
        entry: CacheEntry<TData>,
    ): void;

    /**
     * Retrieves a value from the cache for the given handler and options.
     */
    retrieve(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): ?$ReadOnly<CacheEntry<TData>>;

    /**
     * Remove the cached entry for the given handler and options.
     *
     * If the item exists in the cache, the cached entry is deleted and true
     * is returned. Otherwise, this returns false.
     */
    remove(
        handler: IRequestHandler<TOptions, TData>,
        options: TOptions,
    ): boolean;

    /**
     * Remove all cached entries for the given handler that, optionally, match
     * a given predicate.
     *
     * Returns the number of entries that were cleared from the cache.
     */
    removeAll(
        handler: IRequestHandler<TOptions, TData>,
        predicate?: (
            key: string,
            cachedEntry: $ReadOnly<CacheEntry<TData>>,
        ) => boolean,
    ): number;
}

/**
 * A handler for data requests.
 */
export interface IRequestHandler<TOptions, TData: ValidData> {
    /**
     * Fulfill a given request.
     *
     * @param {TOptions} options Options tha the request may need.
     * @return {Promise<TData>} A promise of the requested data.
     */
    fulfillRequest(options: TOptions): Promise<TData>;

    /**
     * The handler type; this is used to uniquely identify this handler from
     * any other handler.
     */
    get type(): string;

    /**
     * When true, server-side results are cached and hydrated in the client.
     * When false, the server-side cache is not used and results are not
     * hydrated.
     * This should only be set to false if something is ensuring that the
     * hydrated client result will match the server result.
     *
     * For example, if Apollo is used to handle GraphQL requests in SSR mode,
     * it has its own cache that is used to hydrate the client. Setting this
     * to false makes sure we don't store the data twice, which would
     * unnecessarily bloat the data sent back to the client.
     */
    get hydrate(): boolean;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}

export type ResponseCache = $ReadOnly<Cache>;
