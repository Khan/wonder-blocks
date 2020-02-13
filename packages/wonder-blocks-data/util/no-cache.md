The `ICache` interface is included below for reference in case you would like
to implement your own caching strategy.

```js static
interface ICache<TOptions, TData: ValidData> {
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
```

Use this with your request handler if you want to support server-side
rendering of your data requests, but also want to ensure data is never cached
on the client-side.

This is better than having `shouldRefreshCache` always return `true` in the
handler as this ensures that cache space and memory are never used for the
requested data after hydration has finished.
