## fulfillAllDataRequests

When performing server-side rendering (SSR), the data requests that are being
made via the `Data` component can be tracked by rendering the React tree
inside the `TrackData` component. After this has occurred, the tracked requests
can be fulfilled using `fulfillAllDataRequests`.

This method returns a promise that resolves to a copy of the data that was
cached by fulfilling the tracked requests. In the process, it clears the
record of tracked requests so that new requests can be tracked and fulfilled
if so required.

The returned copy of the data cache can be used with the `initializeCache`
method to prepare the data cache before a subsequent render. This is useful on
the server to then SSR a more complete result, and again on the client, to
rehydrate that result.

### Usage

```js static
fulfillAllDataRequests(): Promise<$ReadOnly<ResponseCache>>;
```

## initializeCache

Wonder Blocks Data caches data in its response cache for hydration. This cache
can be initialized with data using the `initializeCache` method.
The `initializeCache` method can only be called when the hydration cache is
empty.

Usually, the data to be passed to `initializeCache` will be obtained by
calling `fulfillAllDataRequests` after tracking data requests
(see [TrackData](#trackdata)) during server-side rendering.

Combine with `removeFromCache` or `removeAllFromCache` to support your testing
needs.

### Usage

```js static
initializeCache(sourceCache: $ReadOnly<ResponseCache>): void;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `sourceData` | `$ReadOnly<ResponseCache>` | _Required_ | The source cache that will be used to initialize the response cache. |

## removeFromCache

Removes an entry from the cache. The given handler and options identify the entry to be removed.

If an item is removed, this returns `true`; otherwise, `false`.

This can be used after `initializeCache` to manipulate the cache prior to hydration.
This can be useful during testing.

### Usage

```js static
removeFromCache(id: string): boolean;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | _Required_ | The id of the item to be removed. |

## removeAllFromCache

Removes all entries that match a given predicate from the cache. If no predicate is given, all cached entries for the given handler are removed.

This returns the count of entries removed.

This can be used after `initializeCache` to manipulate the cache prior to hydration.
This can be useful during testing (especially to clear the cache so that it can be initialized again).
If the predicate is not given, all items are removed.

### Usage

```js static
removeAllFromCache(predicate?: (key: string, entry: $ReadOnly<CacheEntry<TData>>) => boolean): number;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `predicate` | `(key: string, entry: $ReadOnly<CacheEntry<TData>>) => boolean)` | _Optional_ | A predicate to identify which entries to remove. If absent, all data is removed; if present, any entries for which the predicate returns `true` will be returned. |

## Types

### ResponseCache

```js static
type CacheEntry =
    | {|
        data: any,
      |}
    | {|
        error: string,
      |};

type ResponseCache = {
    [id: string]: CacheEntry,
    ...,
};
```

An example is of the response cache is shown below.

```js static
const responseCache = {
    DATA_ID_1: {error: "It go 💥boom 😢"},
    DATA_ID_2: {data: ["array", "of", "data"]},
    DATA_ID_3: {data: {some: "data"}},
};
```

In this example, the cache contains data retrieved for three different requests.
