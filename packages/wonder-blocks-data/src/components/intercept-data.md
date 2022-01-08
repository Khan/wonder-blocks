When you want to generate tests that check the loading state and
subsequent loaded state are working correctly for your uses of `Data` you can
use the `InterceptData` component.

This component takes four props; children to be rendered, the handler of the
type of data requests that are to be intercepted, and a `fulfillRequest`.

Note that this component is expected to be used only within test cases and
usually only as a single instance. In flight requests for a given handler
type can be shared and as such, using `InterceptData` alongside non-intercepted
`Data` components with the same handler type can have indeterminate outcomes.

The `fulfillRequest` intercept function has the form:

```js static
(options: TOptions) => ?Promise<TData>;
```

If this method returns `null`, the default behavior occurs. This
means that a request will be made for data via the handler assigned to the
`Data` component being intercepted.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptData, Data, RequestHandler} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

class MyHandler extends RequestHandler {
    constructor() {
        super("INTERCEPT_DATA_HANDLER1");
    }

    fulfillRequest(options) {
        return Promise.reject(new Error("You should not see this!"));
    }
}

const handler = new MyHandler();
const fulfillRequestInterceptor = function(options) {
    if (options === "DATA") {
        return Promise.resolve("INTERCEPTED DATA!");
    }
    return null;
};

<InterceptData handler={handler} fulfillRequest={fulfillRequestInterceptor}>
    <View>
        <Body>This received intercepted data!</Body>
        <Data handler={handler} options={"DATA"}>
            {({loading, data}) => {
                if (loading) {
                    return "If you see this, the example is broken!";
                }

                return (
                    <BodyMonospace>{data}</BodyMonospace>
                );
            }}
        </Data>
    </View>
</InterceptData>
```
