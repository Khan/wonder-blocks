# InterceptRequests

When you want to generate tests that check the loading state and
subsequent loaded state are working correctly for your uses of `Data` you can
use the `InterceptRequests` component. You can also use this component to
register request interceptors for any code that uses the `useRequestInterception`
hook.

This component takes the children to be rendered, and an interceptor function.

Note that this component is expected to be used only within test cases or
stories. Be careful want request IDs are matched to avoid intercepting the
wrong requests and remember that in-flight requests for a given request ID
can be shared - which means a bad request ID match could share requests across
different request IDs..

The `interceptor` intercept function has the form:

```js static
(requestId: string) => ?Promise<TData>;
```

If this method returns `null`, then the next interceptor in the chain is
invoked, ultimately ending with the original handler. This
means that a request will be made for data via the handler assigned to the
`Data` component being intercepted if no interceptor handles the request first.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptRequests, Data} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";

const myHandler = () => Promise.reject(new Error("You should not see this!"));

const interceptor = (requestId) =>
    requestId === "INTERCEPT_EXAMPLE"
        ? Promise.resolve("INTERCEPTED DATA!")
        : null;

<InterceptRequests interceptor={interceptor}>
    <View>
        <Body>This received intercepted data!</Body>
        <Data handler={myHandler} requestId="INTERCEPT_EXAMPLE">
            {(result) => {
                if (result.status !== "success") {
                    return "If you see this, the example is broken!";
                }

                return <BodyMonospace>{result.data}</BodyMonospace>;
            }}
        </Data>
    </View>
</InterceptRequests>;
```


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
