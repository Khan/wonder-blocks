This class implements the `IRequestHandler` interface. It is to be used as a
base class to implement your own request handler.

```js static
interface IRequestHandler<TOptions, TData> {
    /**
     * Fulfill a given request.
     */
    fulfillRequest(options: TOptions): Promise<TData>;

    /**
     * The handler type; this is used to uniquely identify this handler from
     * any other handler.
     */
    get type(): string;

    /**
     * A custom cache to use with data that this handler requests.
     * This only affects client-side caching of data.
     */
    get cache(): ?ICache<TOptions, TData>;

    /**
     * Determine if the cached data should be refreshed.
     *
     * If this returns true, the framework will use the currently cached value
     * but also request a new value.
     */
    shouldRefreshCache(
        options: TOptions,
        cachedEntry: ?$ReadOnly<CacheEntry<TData>>,
    ): boolean;

    /**
     * Get the key to use for a given request. This should be idempotent for a
     * given options set if you want caching to work across requests.
     */
    getKey(options: TOptions): string;
}
```

The constructor requires a `type` to identify your handler. This should be unique
among the handlers that are used across your application, otherwise, requests
may be fulfilled by the wrong handler.

There is also an optional constructor argument, `cache`, which can be used to
provide a custom cache for use with data the handler fulfills. Custom caches
must implement the `ICache<TOptions, TData>` interface. If this is omitted, the
core Wonder Blocks Data in-memory cache will be used. If you want to avoid
caching in memory, see `NoCache`, whith is a caching strategy that eliminates
the use of caching entirely.

The `fulfillRequest` method of this class is not implemented and will throw if
called. Subclasses will need to implement this method.

A default implementation of `getKey` is provided that serializes the options of
a request to a string and uses that as the cache key. You may want to override
this behavior to simplify the key or to omit some values from the key.

Finally, the `shouldRefreshCache` method is provided for cases where a handler
may want control over cache freshness. By default, this will return `true` for
error results or a missing value. However, in some cases, handlers may want to
make sure cached entries are not stale, and so may return `true` from the
`shouldRefreshCache` method to instruct the framework to make a new request.
The existing cached value will still be used, but an updated value will be
requested.
