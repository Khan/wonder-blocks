// @flow
export type Behavior = "static" | "refresh";

type HandlerSubcache = {
    [key: string]: any,
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
     * Fulfil a given request.
     *
     * @param {TOptions} options Options tha the request may need.
     * @return {Promise<TData>} A promise of the requested data.
     */
    fulfilRequest(options: TOptions): Promise<TData>;

    /**
     * The handler type; this is used to uniquely identify this handler from
     * any other handler.
     */
    get type(): string;

    /**
     * Get the cache hit behavior of this handler for a given request.
     */
    cacheHitBehavior(options: TOptions): Behavior;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}
