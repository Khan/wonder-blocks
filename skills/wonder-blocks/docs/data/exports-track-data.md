# TrackData

The `TrackData` component is a server-side only component. It should be used as
a parent to the components whose data requests you want to fulfill during
server-side rendering.

#### Client-side behavior

If used outside of server-side mode (as set using `Server.setServerSide`), this
component will throw, as demonstrated below.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {TrackData} from "@khanacademy/wonder-blocks-data";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromError(error) {
        return {error: error.message};
    }

    render() {
        if (typeof jest !== "undefined") {
            /**
             * The snapshot test just sees the error getting thrown, not the
             * awesome error boundary, so we have to hack around it to keep
             * this live example, but not get test failures.
             */
            return "Sorry, no snapshot for you";
        }

        if (this.state.error) {
            return <View>{this.state.error}</View>;
        }
        return this.props.children;
    }
}

<ErrorBoundary>
    <View>
        <TrackData>
            <Body>
                This only renders if we're in server-side mode and the page hot
                reloaded
            </Body>
        </TrackData>
    </View>
</ErrorBoundary>;
```

#### Server-side behavior

When used server-side, this component tracks any data requests made through
the `Data` component during a render cycle. This data can then be obtained
using the `fetchTrackedRequests` method. The data can then be used in an
additional render cycle to render with that data.

```jsx
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {
    Data,
    TrackData,
    fetchTrackedRequests,
} from "@khanacademy/wonder-blocks-data";

const myPretendHandler = () =>
    new Promise((resolve, reject) => setTimeout(() => resolve("DATA!"), 3000));

class Example extends React.Component {
    constructor() {
        super();
        /**
         * For this demonstration, we need to hack the return of isServerSide solely
         * for the scope of this component.
         */
        this.state = {};
    }

    static getDerivedStateFromError(error) {
        return {error};
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    setClientMode() {
        window.location.reload();
    }

    setServerMode() {
        Server.setServerSide();
        this.setState({refresh: Date.now(), error: null});
    }

    _renderErrorOrContent() {
        if (typeof jest !== "undefined") {
            /**
             * The snapshot test just sees the error getting thrown, not the
             * awesome error boundary, so we have to hack around it to keep
             * this live example, but not get test failures.
             */
            return "Sorry, no snapshot for you";
        }

        if (this.state.error) {
            return (
                <React.Fragment>
                    <Strut size={spacing.small_12} />
                    <Body>
                        We can't show you anything useful in client-side mode
                    </Body>
                </React.Fragment>
            );
        }

        const data = this.state.data
            ? JSON.stringify(this.state.data, undefined, "  ")
            : "Data requested...";

        return (
            <React.Fragment>
                <Strut size={spacing.small_12} />
                <TrackData>
                    <Data
                        handler={myPretendHandler}
                        requestId="TRACK_DATA_EXAMPLE"
                    >
                        {(result) => (
                            <View>
                                <BodyMonospace>{`Loading: ${
                                    result.status === "loading"
                                }`}</BodyMonospace>
                                <BodyMonospace>{`Data: ${JSON.stringify(
                                    result.data,
                                )}`}</BodyMonospace>
                            </View>
                        )}
                    </Data>
                </TrackData>
                <Strut size={spacing.small_12} />
                <View>
                    <Body>
                        The above components requested data, but we're
                        server-side, so all that happened is we tracked the
                        request. In this example, we've also called
                        `fetchTrackedRequests` to fetch that tracked data.
                    </Body>
                    <Strut size={spacing.small_12} />
                    <Body>
                        In about 3 seconds, it will appear below. Notice that
                        when it does, the above still doesn't update. That's
                        because during SSR, the data is not updated in the
                        rendered tree.
                    </Body>
                    <Strut size={spacing.small_12} />
                    <BodyMonospace>{data}</BodyMonospace>
                </View>
            </React.Fragment>
        );
    }

    render() {
        try {
            return (
                <View key={this.state.refresh}>
                    {Server.isServerSide() ? (
                        <React.Fragment>
                            <Button
                                kind={"secondary"}
                                onClick={() => this.setClientMode()}
                            >
                                Back to Client-side Mode (reloads page)
                            </Button>
                            <Strut size={spacing.small_12} />
                            <Button
                                kind={"secondary"}
                                onClick={() => this.setServerMode()}
                            >
                                Re-mount
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button
                            kind={"primary"}
                            onClick={() => this.setServerMode()}
                        >
                            Enable Server-side Mode
                        </Button>
                    )}
                    {this._renderErrorOrContent()}
                </View>
            );
        } finally {
            if (!this.state.data && Server.isServerSide()) {
                setTimeout(
                    () =>
                        fetchTrackedRequests().then((data) => {
                            if (this._mounted) {
                                this.setState({data});
                            }
                        }),
                    0,
                );
            }
        }
    }
}

<Example />;
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
- [Exports Intercept Requests](exports-intercept-requests.md)
- [Exports Purge Caches](exports-purge-caches.md)
- [Exports Purge Hydration Cache](exports-purge-hydration-cache.md)
- [Exports Scoped In Memory Cache](exports-scoped-in-memory-cache.md)
- [Exports Serializable In Memory Cache](exports-serializable-in-memory-cache.md)
- [Exports Shared Cache](exports-shared-cache.md)
- [Exports Status](exports-status.md)
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
