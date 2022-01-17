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

Removes an entry associated with the given handler from the hydration cache. The given handler and options identify the entry to be removed.

If an item is removed, this returns `true`; otherwise, `false`.

This can be used after `initializeCache` to manipulate the cache prior to hydration.
This can be useful during testing.

### Usage

```js static
removeFromCache(handler: IRequestHandler<TOptions, TData>, options: TOptions): boolean;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `handler` | `IRequestHandler<TOptions, TData>` | _Required_ | The handler type for the data to be removed. |
| `options` | `TOptions` | _Required_ | The options that identify the cached request data to be removed. |

## removeAllFromCache

Removes all entries associated to the given handler that match a given predicate from the hydration cache. If no predicate is given, all cached entries for the given handler are removed.

This returns the count of entries removed.

This can be used after `initializeCache` to manipulate the cache prior to hydration.
This can be useful during testing (especially to clear the cache so that it can be initialized again).

### Usage

```js static
removeAllFromCache(handler: IRequestHandler<TOptions, TData>, predicate: (key: string, entry: $ReadOnly<CacheEntry<TData>>) => boolean): number;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `handler` | `IRequestHandler<TOptions, TData>` | _Required_ | The handler type for the data to be removed. |
| `predicate` | `(key: string, entry: $ReadOnly<CacheEntry<TData>>) => boolean)` | _Optional_ | A predicate to identify which entries to remove. If absent, all data for the handler type is removed; if present, any entries for which the predicate returns `true` will be returned. |

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

type HandlerSubcache = {
    [key: string]: CacheEntry,
    ...,
};

type ResponseCache = {
    [handlerType: string]: HandlerSubcache,
    ...,
};
```

A response cache is divided into subcaches by handler type. An example is
shown below.

```js static
const responseCache = {
    HANDLER_TYPE_A: {
        DATA_ID_1: {error: "It go 💥boom 😢"},
        DATA_ID_2: {data: ["array", "of", "data"]},
    },
    HANDLER_TYPE_B: {
        DATA_ID_3: {
            data: {
                some: "data",
            },
        },
    },
};
```

In this example, the cache contains data retrieved by two handlers; one with
type `HANDLER_TYPE_A` and one with type `HANDLER_TYPE_B`. Within each subcache,
the data responses are keyed by the returned value of the respective [request
handler](#requesthandler)'s `getKey` method for the relevant request.
