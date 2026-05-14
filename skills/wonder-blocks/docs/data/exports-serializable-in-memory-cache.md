# SerializableInMemoryCache

This class is a specialization of [`ScopedInMemoryCache`](./?path=/docs/packages-data-exports-scopedinmemorycache--docs). This specialization requires that values added can be serialized to and from strings.

## constructor()

```ts
new SerializableInMemoryCache(initialCache?: RawScopedCache)
```

Creates a new instance. The `initialCache`, if provided, will be cloned and used as the initial state of the cache.

### Throws

| Error Type                                        | Error Name              | Reason                             |
| ------------------------------------------------- | ----------------------- | ---------------------------------- |
| [`DataError`](./?path=/docs/packages-data-exports-dataerror--docs) | `InvalidInputDataError` | Could not clone the initial cache. |

## inUse

```ts
if (cache.inUse) {
    // Cache is in use
}
```

Is `true` if the cache contains any data; otherwise, `false`.

## set()

```ts
set<TValue: ValidCacheData>(
    scope: string,
    id: string,
    value: TValue,
): void;
```

Sets a value in the cache within a given scope. The value is cloned and the clone is frozen before being added to the cache.

### Throws

| Error Type                                        | Error Name              | Reason                                     |
| ------------------------------------------------- | ----------------------- | ------------------------------------------ |
| [`DataError`](./?path=/docs/packages-data-exports-dataerror--docs) | `InvalidInputDataError` | `id` and `scope` must be non-empty strings |
| [`DataError`](./?path=/docs/packages-data-exports-dataerror--docs) | `InvalidInputDataError` | `value` must be a non-function value       |

## get()

```ts
get(scope: string, id: string): ?ValidCacheData;
```

Gets a value from the cache. If a value with the given identifier (`id`) is not found within the given scope (`scope`) of the cache, `null` is returned.

## clone()

```ts
clone(): RawScopedCache;
```

Returns a clone of the current cache.

### Throws

| Error Type                                        | Error Name          | Reason                     |
| ------------------------------------------------- | ------------------- | -------------------------- |
| [`DataError`](./?path=/docs/packages-data-exports-dataerror--docs) | `InternalDataError` | Could not clone the cache. |

## purge()

```ts
purge(scope: string, id: string): void;
```

Purges the value from the cache. If a value with the given identifier (`id`) is not found within the given scope (`scope`) of the cache, nothing happens.

## purgeScope()

```ts
purgeScope(
    scope: string,
    predicate?: (id: string, value: ValidCacheData) => boolean,
): void;
```

Purges items within a given scope (`scope`) of the cache from that scope. If a predicate is provided, only items for which the predicate returns `true` will be purged; otherwise, the entire scope will be purged.

## purgeAll()

```ts
purgeAll(
    predicate?: (
        scope: string,
        id: string,
        value: ValidCacheData,
    ) => boolean,
): void;
```

Purges all items from the cache. If a predicate is provided, only items for which the predicate returns `true` will be purged; otherwise, the entire cache will be purged.


---

## Related docs

- [Overview](overview.md)
- [Exports Abort Inflight Requests](exports-abort-inflight-requests.md)
- [Exports Data](exports-data.md)
- [Exports Data Error](exports-data-error.md)
- [Exports Data Errors](exports-data-errors.md)
- [Exports Fetch Tracked Requests](exports-fetch-tracked-requests.md)
- [Exports Get Gql Request Id](exports-get-gql-request-id.md)
- [Exports Gql Error](exports-gql-error.md)
- [Exports Gql Errors](exports-gql-errors.md)
- [Exports Gql Router](exports-gql-router.md)
- [Exports Has Tracked Requests To Be Fetched](exports-has-tracked-requests-to-be-fetched.md)
- [Exports Initialize Hydration Cache](exports-initialize-hydration-cache.md)
- [Exports Intercept Requests](exports-intercept-requests.md)
- [Exports Purge Caches](exports-purge-caches.md)
- [Exports Purge Hydration Cache](exports-purge-hydration-cache.md)
- [Exports Scoped In Memory Cache](exports-scoped-in-memory-cache.md)
- [Exports Shared Cache](exports-shared-cache.md)
- [Exports Status](exports-status.md)
- [Exports Track Data](exports-track-data.md)
- [Exports Use Cached Effect](exports-use-cached-effect.md)
- [Exports Use Gql](exports-use-gql.md)
- [Exports Use Hydratable Effect](exports-use-hydratable-effect.md)
- [Exports Use Server Effect](exports-use-server-effect.md)
- [Exports Use Shared Cache](exports-use-shared-cache.md)
- [Exports When Client Side](exports-when-client-side.md)
- [Graph Ql](graph-ql.md)
- [Server Side Rendering And Hydration](server-side-rendering-and-hydration.md)
- [Testing](testing.md)
- [Types Cached Response](types-cached-response.md)
- [Types Error Options](types-error-options.md)
- [Types Fetch Policy](types-fetch-policy.md)
- [Types Gql Context](types-gql-context.md)
- [Types Gql Fetch Fn](types-gql-fetch-fn.md)
- [Types Gql Fetch Options](types-gql-fetch-options.md)
- [Types Gql Operation](types-gql-operation.md)
- [Types Gql Operation Type](types-gql-operation-type.md)
- [Types Raw Scoped Cache](types-raw-scoped-cache.md)
- [Types Response Cache](types-response-cache.md)
- [Types Result](types-result.md)
- [Types Scoped Cache](types-scoped-cache.md)
- [Types Valid Cache Data](types-valid-cache-data.md)
