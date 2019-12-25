// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-data
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {View, Server} from "@khanacademy/wonder-blocks-core";
import {
    initializeCache,
    Data,
    RequestHandler,
    TrackData,
    fulfillAllDataRequests,
} from "@khanacademy/wonder-blocks-data";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";

import InterceptCache from "./components/intercept-cache.js";
import InterceptData from "./components/intercept-data.js";

describe("wonder-blocks-data", () => {
    it("example 1", () => {
        /**
         * We need some data in the cache for some examples later, and we have to
         * initialize the cache before it is used, so let's do that here.
         *
         * We're assuming we're the first thing to start playing with our data cache.
         */
        try {
            initializeCache({
                CACHE_HIT_HANDLER: {
                    '"DATA"': {
                        data: "I'm DATA from the cache",
                    },
                    '"ERROR"': {
                        error: "I'm an ERROR from the cache",
                    },
                },
            });
        } catch (e) {
            // It's OK, probably hot loaded and tried to init again.
        }

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
                    setTimeout(
                        () => reject("I'm an ERROR from a request"),
                        3000,
                    ),
                );
            }
        }

        const valid = new MyValidHandler();
        const invalid = new MyInvalidHandler();
        const example = (
            <View>
                <View>
                    <Body>This request will succeed and give us data!</Body>
                    <Data
                        handler={valid}
                        options={{
                            some: "options",
                        }}
                    >
                        {({loading, data}) => {
                            if (loading) {
                                return "Loading...";
                            }

                            return <BodyMonospace>{data}</BodyMonospace>;
                        }}
                    </Data>
                </View>
                <Strut size={Spacing.small} />
                <View>
                    <Body>This request will go boom and give us an error!</Body>
                    <Data
                        handler={invalid}
                        options={{
                            some: "options",
                        }}
                    >
                        {({loading, error}) => {
                            if (loading) {
                                return "Loading...";
                            }

                            return (
                                <BodyMonospace
                                    style={{
                                        color: Color.red,
                                    }}
                                >
                                    ERROR: {error}
                                </BodyMonospace>
                            );
                        }}
                    </Data>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 2", () => {
        /**
         * For snapshot tests, we'll be run in an isolated manner, so we need to also
         * make sure our cache is initialized. This will error for the web docs, but
         * enable our snapshot tests to snapshot what we want them to.
         */
        try {
            initializeCache({
                CACHE_HIT_HANDLER: {
                    '"DATA"': {
                        data: "I'm DATA from the cache",
                    },
                    '"ERROR"': {
                        error: "I'm an ERROR from the cache",
                    },
                },
            });
        } catch (e) {
            // It's OK, probably hot loaded and tried to init again.
        }

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
        const example = (
            <View>
                <View>
                    <Body>This cache has data!</Body>
                    <Data handler={handler} options={"DATA"}>
                        {({loading, data}) => {
                            if (loading) {
                                return "If you see this, the example is broken!";
                            }

                            return <BodyMonospace>{data}</BodyMonospace>;
                        }}
                    </Data>
                </View>
                <Strut size={Spacing.small} />
                <View>
                    <Body>This cache has error!</Body>
                    <Data handler={handler} options={"ERROR"}>
                        {({loading, error}) => {
                            if (loading) {
                                return "If you see this, the example is broken!";
                            }

                            return (
                                <BodyMonospace
                                    style={{
                                        color: Color.red,
                                    }}
                                >
                                    ERROR: {error}
                                </BodyMonospace>
                            );
                        }}
                    </Data>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 3", () => {
        class ErrorBoundary extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};
            }

            static getDerivedStateFromError(error) {
                return {
                    error: error.message,
                };
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

        const example = (
            <ErrorBoundary>
                <View>
                    <TrackData>
                        <Body>
                            This only renders if we're in server-side mode and
                            the page hot reloaded
                        </Body>
                    </TrackData>
                </View>
            </ErrorBoundary>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 4", () => {
        class MyPretendHandler extends RequestHandler {
            constructor() {
                super("MY_PRETEND_HANDLER");
            }

            fulfillRequest(options) {
                return new Promise((resolve, reject) =>
                    setTimeout(() => resolve("DATA!"), 3000),
                );
            }
        }

        class Example extends React.Component {
            constructor() {
                super();
                /**
                 * For this demonstration, we need to hack the return of isServerSide solely
                 * for the scope of this component.
                 */

                this.state = {};
                this._handler = new MyPretendHandler();
            }

            static getDerivedStateFromError(error) {
                return {
                    error,
                };
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
                this.setState({
                    refresh: Date.now(),
                    error: null,
                });
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
                            <Strut size={Spacing.small} />
                            <Body>
                                We can't show you anything useful in client-side
                                mode
                            </Body>
                        </React.Fragment>
                    );
                }

                const data = this.state.data
                    ? JSON.stringify(this.state.data, undefined, "  ")
                    : "Data requested...";
                return (
                    <React.Fragment>
                        <Strut size={Spacing.small} />
                        <TrackData>
                            <Data handler={this._handler} options={{}}>
                                {({loading, data, error}) => (
                                    <View>
                                        <BodyMonospace>{`Loading: ${loading}`}</BodyMonospace>
                                        <BodyMonospace>{`Data: ${JSON.stringify(
                                            data,
                                        )}`}</BodyMonospace>
                                    </View>
                                )}
                            </Data>
                        </TrackData>
                        <Strut size={Spacing.small} />
                        <View>
                            <Body>
                                The above components requested data, but we're
                                server-side, so all that happened is we tracked
                                the request. In this example, we've also called
                                `fulfillAllDataRequests` to fetch that tracked
                                data.
                            </Body>
                            <Strut size={Spacing.small} />
                            <Body>
                                In about 3 seconds, it will appear below. Notice
                                that when it does, the above still doesn't
                                update. That's because during SSR, the data is
                                not updated in the rendered tree.
                            </Body>
                            <Strut size={Spacing.small} />
                            <Body>
                                If you click to remount after the data appears,
                                we'll rerender with the now cached data, and
                                above should update accordingly.
                            </Body>
                            <Strut size={Spacing.small} />
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
                                    <Strut size={Spacing.small} />
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
                                fulfillAllDataRequests().then((data) => {
                                    if (this._mounted) {
                                        this.setState({
                                            data,
                                        });
                                    }
                                }),
                            0,
                        );
                    }
                }
            }
        }

        const example = <Example />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
