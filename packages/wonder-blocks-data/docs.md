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

Wonder Blocks Data caches data in its response cache. This cache can be
initialized with data using the `initializeCache` method. The `initializeData`
method can only be called once to populate the cache. Usually, the data to be
passed to `initializeCache` will be obtained by calling `fulfillAllDataRequests`
after tracking data requests (see [TrackData](#trackdata)) during server-side
rendering.

Though method could also be used to initialize the response cache for tests,
it is recommended that the `InterceptCache` component be used instead, since
it can be used repeatedly whereas `initializeCache`, by design, can only be
called while the cache is uninitialized and unused.

### Usage

```js static
initializeCache(sourceCache: $ReadOnly<ResponseCache>): void;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `sourceData` | `$ReadOnly<ResponseCache>` | _Required_ | The source cache that will be used to initialize the response cache. |

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
