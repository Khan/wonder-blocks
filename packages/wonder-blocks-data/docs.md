## initializeCache

Wonder Blocks Data caches data in its response cache. This cache can be
initialized with data using the `initializeCache` method. The `initializeData`
method can only be called once to populate the cache. Usually, the data to be
passed to `initializeCache` will be obtained by calling `fulfilAllDataRequests`
after tracking data requests (see [TrackData](#trackdata)) during server-side
rendering.

This method can also be used to initialize the response cache for tests.

### Usage

```js static
initializeCache(sourceCache: ResponseCache): void;
```

#### Function arguments

| Argument | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `sourceData` | `ResponseCache` | _Required_ | The source cache that will be used to initialize the response cache. |

### Types

#### ResponseCache

```js static
type HandlerSubcache = {
    [key: string]: any,
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
        DATA_ID_1: "DATA STRING",
        DATA_ID_2: ["array", "of", "data"],
    },
    HANDLER_TYPE_B: {
        DATA_ID_3: {
            some: "data",
        },
    },
};
```

In this example, the cache contains data retrieved by two handlers; one with
type `HANDLER_TYPE_A` and one with type `HANDLER_TYPE_B`. Within each subcache,
the data responses are keyed by the returned value of the respective [request
handler](#requesthandler)'s `getKey` method for the relevant request.
