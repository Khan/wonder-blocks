The `Data` component is the frontend piece of our data architecture that
most folks will use. It describes a data requirement in terms of a handler, and
some options. Handlers must implement the
`IRequestHandler` interface.

Among other things, the handler is responsible for fulfilling the request when
asked to do so.

#### Caching

The Wonder Blocks Data framework utilizes a core internal in-memory cache for
supporting server-side rendering (SSR) and client-side provision of data
obtained during SSR to support hydration of the SSR result.

In addition to this internal cache, a custom cache can be provided by a request
handler. Custom caches allow for different client-side caching
strategies (such as using local storage instead of memory). Any custom cache
provided is ignored during SSR.

When retrieving data from cache, the framework will ask the custom cache for its
entry. If the custom cache returns an entry, that is used. If the custom cache
returns `null`, the framework will look for a corresponding in-memory entry with
which the framework has been initialzied, and if there, store the entry in the
custom cache and then return it.

`removeFromCache` and `removeAllFromCache` methods are also provided for
removing values from the in-memory and custom caches.

#### Client-side behavior

##### Cache Miss

When the cache does not yet contain the data, the data must be requested.
In this example, we use a 3 second delayed promise to simulate the request.
We start out without any data and so the request is made. Upon receipt of that
data or an error, we re-render.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {Data, RequestHandler} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

class MyValidHandler extends RequestHandler {
    constructor() {
        super("CACHE_MISS_HANDLER_VALID");
    }

    fulfillRequest(options) {
        return new Promise((resolve, reject) =>
            setTimeout(() => resolve("I'm DATA from a request"), 3000),
        );
    }
}

class MyInvalidHandler extends RequestHandler {
    constructor() {
        super("CACHE_MISS_HANDLER_ERROR");
    }

    fulfillRequest(options) {
        return new Promise((resolve, reject) =>
            setTimeout(() => reject("I'm an ERROR from a request"), 3000),
        );
    }
}

const valid = new MyValidHandler();
const invalid = new MyInvalidHandler();

<View>
    <View>
        <Body>This request will succeed and give us data!</Body>
        <Data handler={valid} options={{some: "options"}}>
            {({loading, data}) => {
                if (loading) {
                    return "Loading...";
                }

                return (
                    <BodyMonospace>{data}</BodyMonospace>
                );
            }}
        </Data>
    </View>
    <Strut size={Spacing.small_12} />
    <View>
        <Body>This request will go boom and give us an error!</Body>
        <Data handler={invalid} options={{some: "options"}}>
            {({loading, error}) => {
                if (loading) {
                    return "Loading...";
                }

                return (
                    <BodyMonospace style={{color: Color.red}}>ERROR: {error}</BodyMonospace>
                );
            }}
        </Data>
    </View>
</View>
```

##### Cache Hit

If the cache already contains data or an error for our request, then the `Data`
component will render it immediately. The cache data is placed there either
by prior successful requests as in the above Cache Miss example, or via calling
`initializeCache` before any requests have been made. A cache hit may also
occur due to the use of the `InterceptCache` component.

For the example below, we called `initializeData` data in our examples for
that method. That way we'd have data ready for us here!

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {InterceptCache, Data, RequestHandler} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

class MyHandler extends RequestHandler {
    constructor() {
        super("CACHE_HIT_HANDLER");
    }

    /**
     * fulfillRequest should not get called as we already have data cached.
     */
    fulfillRequest(options) {
        throw new Error(
            "If you're seeing this error, the examples are broken and data isn't in the cache that should be.",
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
const getEntryInterceptor = function(options) {
    if (options === "DATA") {
        return  { data: "I'm DATA from the cache" };
    }
    return {error: "I'm an ERROR from the cache" };
};

<InterceptCache handler={handler} getEntry={getEntryInterceptor}>
    <View>
        <Body>This cache has data!</Body>
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
    <Strut size={Spacing.small_12} />
    <View>
        <Body>This cache has error!</Body>
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

#### Server-side behavior

##### Cache miss

When the `Data` component does not get data or an error from the cache and it
is rendering server-side, it tells our request tracking that it wants data, and
it renders in its `loading` state. It will always render in this state if there
is no cached response.

##### Cache hit

When the `Data` component gets data or an error from the cache and it is
rendering server-side, it will render as loaded, with that data or error,
as it would client-side. In this situation, it does not track the request it
would have made, as it already has the data and doesn't need to.
