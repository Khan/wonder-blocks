Sometimes, you may want to generate tests that check the loading state and
subsequent loaded state are working correctly for your uses of `Data`.
So, rather than manipulating cache usage with `InterceptCache` you can
manipulate request fulfillment and cache refresh using the `InterceptData`
component.

This component takes five props; children to be rendered, the handler of the
type of data requests that are to be intercepted, and either a `fulfillRequest`
method, a `shouldRefreshCache` method, or both.

Note that this component is expected to be used only within test cases and
usually only as a single instance. In flight requests for a given handler
type can be shared and as such, using `InterceptData` alongside non-intercepted
`Data` components with the same handler type can have undetermined outcomes.

The `fulfillRequest` intercept function has the form:

```js static
(options: TOptions) => ?Promise<TData>;
```

If this method is omitted or returns `null`, the default behavior occurs. This
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

The `shouldRefreshCache` intercept function has the form:

```js static
(options: TOptions, cachedEntry: ?$ReadOnly<CacheEntry<TData>>) => ?boolean;
```

If this method is omitted or returns `null`, the default behavior occurs. This
means that if `cacheEntry` has a value, that will be used; otherwise, the
`shouldRefreshCache` method of the handler assigned to the `Data` component
being intercepted will be invoked.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import {InterceptData, Data, RequestHandler} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

class MyHandler extends RequestHandler {
    constructor() {
        super("INTERCEPT_DATA_HANDLER2");
        let _counter = 0;
        this.fulfillRequest = function(options) {
            return Promise.resolve(`DATA ${_counter++}`);
        }
    }

    shouldRefreshData(options) {
        return false;
    }
}

const handler = new MyHandler();
const shouldRefreshCacheInterceptor = function(options) {
    if (options === "DATA") {
        return true;
    }
    return null;
};

class SchedulableExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stamp: Date.now(),
        };
    }

    componentDidMount() {
        this.props.schedule.interval(() => this.setState({
            stamp: Date.now(),
        }), 1000);
    }

    render() {
        /**
         * The key on the View is what causes the re-render.
         *
         * The re-render causes the `Data` component to render again.
         * That causes it to check if it should refresh the cache.
         * and that in turn causes a new data request that updates the value
         * being rendered.
         *
         * Without the key to cause the re-render, no additional request would
         * be made.
         */
        return (
            <InterceptData handler={handler} shouldRefreshCache={shouldRefreshCacheInterceptor}>
                <View key={this.state.stamp}>
                    <Body>This re-renders once a second. On the render, the cache is refreshed and so we see an update.</Body>
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
        );
    }
}

const Example = withActionScheduler(SchedulableExample);

<Example />

```
