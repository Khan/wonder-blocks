// @flow
export type CacheEntry<TData> =
    | {|
          error: string,
          data?: ?void,
      |}
    | {|
          data: TData,
          error?: ?void,
      |};

type HandlerSubcache = {
    [key: string]: CacheEntry<any>,
    ...,
};

export type ResponseCache = {
    [key: string]: HandlerSubcache,
    ...,
};

/**
 * A handler for data requests.
 */
export interface IRequestHandler<TOptions, TData> {
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
     * Determine if the cached data should be invalidated.
     *
     * If this returns true, the framework will fulfill a new request by
     * calling `fulfillRequest`.
     */
    invalidateCache(options: TOptions): boolean;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}
