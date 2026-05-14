# Data

The `Data` component is the frontend piece of our data architecture.
It describes a data requirement in terms of a handler and an identifier.
It also has props to govern hydrate behavior as well as loading and client-side
request behavior.

The handler is responsible for fulfilling the request when asked to do so.

#### Server-side Rendering and Hydration

The Wonder Blocks Data framework uses an in-memory cache for supporting
server-side rendering (SSR) and hydration.

##### Server-side behavior

###### Cache miss

When the `Data` component does not get data or an error from the cache and it
is rendering server-side, it tells our request tracking that it wants data, and
it renders in its `loading` state. It will always render in this state if there
is no cached response.

###### Cache hit

When the `Data` component gets data or an error from the cache and it is
rendering server-side, it will render as loaded, with that data or error,
as it would client-side. In this situation, it does not track the request it
would have made, as it already has the data and doesn't need to.

##### Client-side behavior

###### Cache miss

When the hydration cache does not contain the data, the data will be requested.
While the request is pending, the data is rendered in the loading state.
In this example, we use a 3 second delayed promise to simulate the request.
We start out without any data and so the request is made. Upon receipt of that
data or an error, we re-render.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {Data} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

const myValidHandler = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve("I'm DATA from a request"), 3000),
    );

const myInvalidHandler = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => reject("I'm an ERROR from a request"), 3000),
    );

<View>
    <View>
        <Body>This request will succeed and give us data!</Body>
        <Data handler={myValidHandler} requestId="VALID">
            {(result) => {
                if (result.status === "loading") {
                    return "Loading...";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
    <Strut size={spacing.small_12} />
    <View>
        <Body>This request will go boom and give us an error!</Body>
        <Data handler={myInvalidHandler} requestId="INVALID">
            {(result) => {
                if (result.status === "loading") {
                    return "Loading...";
                }

                return (
                    <BodyMonospace style={{color: color.red}}>
                        ERROR: {result.error}
                    </BodyMonospace>
                );
            }}
        </Data>
    </View>
</View>;
```

###### Cache hit

If the hydration cache already contains data or an error for our request, then
the `Data` component will render it immediately. The hydration cache is
populated using the `initializeHydrationCache` method before rendering.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {Data, initializeHydrationCache} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";

const myHandler = () => {
    throw new Error(
        "If you're seeing this error, the examples are broken and data isn't in the cache that should be.",
    );
};

initializeHydrationCache({
    DATA: {
        data: "I'm DATA from the hydration cache",
    },
});

<View>
    <View>
        <Body>This cache has data!</Body>
        <Data handler={myHandler} requestId="DATA">
            {(result) => {
                if (result.status !== "success") {
                    return "If you see this, the example is broken!";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
</View>;
```


---

## Related docs

- [Overview](overview.md)
- [Exports Abort Inflight Requests](exports-abort-inflight-requests.md)
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
- [Exports Serializable In Memory Cache](exports-serializable-in-memory-cache.md)
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
