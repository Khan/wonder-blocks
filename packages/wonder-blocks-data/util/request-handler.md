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
     * Determine if the cached data should be invalidated.
     *
     * If this returns true, the framework will invalidate the cached value
     * such that a new request is required.
     */
    invalidateCache(options: TOptions): boolean;

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

The `fulfillRequest` method of this class is not implemented and will throw if
called. Subclasses will need to implement this method.

A default implementation of `getKey` is provided that serializes the options of
a request to a string and uses that as the cache key. You may want to override
this behavior to simplify the key or to omit some values from the key.

Finally, the `invalidateCache` method is provided for cases where a handler
may want control over cache validity. By default, once something is in the
cache, it stays there as-is. However, in some cases, handlers may want to make
sure cached entries aren't stale, and so may return `true` from the
`invalidateCache` method to instruct the framework to ignore the cache and make
a new request. If a handler permanently returns `true` from this call then the
cache will never be used and a new request will be made each time the request
result is required.
