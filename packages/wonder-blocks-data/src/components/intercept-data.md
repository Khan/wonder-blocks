When you want to generate tests that check the loading state and
subsequent loaded state are working correctly for your uses of `Data` you can
use the `InterceptData` component.

This component takes three props; children to be rendered, the handler of the
to fulfill the request, and the id of the request that is being intercepted.

Note that this component is expected to be used only within test cases and
usually only as a single instance. In flight requests for a given handler
type can be shared and as such, using `InterceptData` alongside non-intercepted
`Data` components with the same id can have indeterminate outcomes.

The `handler` intercept function has the form:

```js static
() => ?Promise<?TData>;
```

If this method returns `null`, the default behavior occurs. This
means that a request will be made for data via the handler assigned to the
`Data` component being intercepted.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptData, Data} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

const myHandler = () => Promise.reject(new Error("You should not see this!"));

const interceptHandler = () => Promise.resolve("INTERCEPTED DATA!");

<InterceptData handler={interceptHandler} requestId="INTERCEPT_EXAMPLE">
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
</InterceptData>
```
