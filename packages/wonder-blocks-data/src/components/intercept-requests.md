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
(requestId: string) => ?Promise<?TData>;
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
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const myHandler = () => Promise.reject(new Error("You should not see this!"));

const interceptor = (requestId) => requestId === "INTERCEPT_EXAMPLE" ? Promise.resolve("INTERCEPTED DATA!") : null;

<InterceptRequests interceptor={interceptor}>
    <View>
        <Body>This received intercepted data!</Body>
        <Data handler={myHandler} requestId="INTERCEPT_EXAMPLE">
            {(result) => {
                if (result.status !== "success") {
                    return "If you see this, the example is broken!";
                }

                return (
                    <BodyMonospace>{result.data}</BodyMonospace>
                );
            }}
        </Data>
    </View>
</InterceptRequests>
```
