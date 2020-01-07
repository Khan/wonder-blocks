Although it is possible to use the `initializeCache` method to setup test cases
when working with the `Data` component, that can be a little cumbersome since
it can only be called once and it requires knowledge of the cache structure.

Instead of jumping through those hoops, you can use the `InterceptCache`
component and provide an override method that will get called when looking up
cached values. This component takes three props:

- children to be rendered
- the handler for data caches that are to be intercepted
- a function for processing the intercept

The intercept function has the form:

```js static
(options: TOptions, cacheEntry: ?$ReadOnly<CacheEntry<TData>>) => ?$ReadOnly<CacheEntry<TData>>
```

`options` are the options that would configure a data request that leads to the
cached result.
`cacheEntry` is the existing entry in the data cache.

If the method returns `null`, the default behavior occurs. This means that if
`cacheEntry` has a value, that will be used; otherwise, a request will be
made for data via the relevant handler assigned to the `Data` component being
intercepted.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptCache, Data, RequestHandler} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

class MyHandler extends RequestHandler {
    constructor() {
        super("INTERCEPT_CACHE_HANDLER");
    }

    /**
     * fulfillRequest should not get called as we already have data cached.
     */
    fulfillRequest(options) {
        throw new Error(
            "If you're seeing this error, the examples are broken.",
        );
    }

    shouldRefreshCache(options, cachedEntry) {
        /**
         * For our purposes, the cache never needs a refresh.
         */
        return false;
    }
}

const handler = new MyHandler();
const getEntryIntercept = function(options) {
    if (options === "ERROR") {
        return {error: "I'm an ERROR from the cache interceptor"};
    }

    return {data: "I'm DATA from the cache interceptor"};
};

<InterceptCache handler={handler} getEntry={getEntryIntercept}>
    <View>
        <Body>This intercepted cache has data!</Body>
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
    <Strut size={Spacing.small} />
    <View>
        <Body>This intercepted cache has error!</Body>
        <Data handler={handler} options={"ERROR"}>
            {({loading, error}) => {
                if (loading) {
                    return "If you see this, the example is broken!";
                }

                return (
                    <BodyMonospace style={{color: Color.red}}>ERROR: {error}</BodyMonospace>
                );
            }}
        </Data>
    </View>
</InterceptCache>
```

This component can also be useful if you want to avoid a data request because
a parent component already has the data you need. Using this component, you
can map already cached data of one request (or a portion thereof) to another
without affecting the cache itself.
