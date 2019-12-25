/* eslint-disable max-lines */
// @flow
import * as React from "react";

// eslint-disable-next-line import/extensions
import * as ReactDOMServer from "react-dom/server";
import {Server, View} from "@khanacademy/wonder-blocks-core";
import {shallow} from "enzyme";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import TrackData from "./track-data.js";
import {RequestFulfillment} from "../util/request-fulfillment.js";
import {ResponseCache} from "../util/response-cache.js";
import {RequestTracker} from "../util/request-tracking.js";
import InterceptCache from "./intercept-cache.js";
import InterceptData from "./intercept-data.js";
import Data from "./data.js";

import type {IRequestHandler} from "../util/types.js";

describe("Data", () => {
    beforeEach(() => {
        const responseCache = new ResponseCache();
        jest.spyOn(ResponseCache, "Default", "get").mockReturnValue(
            responseCache,
        );
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(responseCache),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
    });

    afterEach(() => {
        unmountAll();
        jest.resetAllMocks();
    });

    describe("CSR: isServerSide false", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        describe("without cached data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will never have cached data
                 * retrieved.
                 */
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
            });

            it("should make request for data on construction", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("data")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    "options",
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });

            it("should initially render children with loading", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith(
                    expect.objectContaining({
                        loading: true,
                    }),
                );
            });

            it("should share single request across all uses", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(
                        () => new Promise((resolve, reject) => {}),
                    ),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <View>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                    </View>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    "options",
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });

            it("should render with an error if the request resolves to an error", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.reject(new Error("OH NOES!")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                /**
                 * We wait for the fulfillment to resolve.
                 */
                await fulfillSpy.mock.results[0].value;

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: false,
                    error: "OH NOES!",
                });
            });

            it("should render with data if the request resolves with data", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("YAY! DATA!"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                /**
                 * We wait for the fulfillment to resolve.
                 */
                await fulfillSpy.mock.results[0].value;

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: false,
                    data: "YAY! DATA!",
                });
            });

            it("should render with an error if the request rejects", async () => {
                // Arrange
                const fulfillSpy = jest
                    .spyOn(RequestFulfillment.Default, "fulfill")
                    .mockReturnValue(Promise.reject("CATASTROPHE!"));

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("YAY!"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);
                const consoleSpy = jest
                    .spyOn(console, "error")
                    .mockImplementation(() => {
                        /* Just to shut it up */
                    });

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                /**
                 * We wait for the fulfillment to reject.
                 */
                await fulfillSpy.mock.results[0].value.catch(() => {});

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: false,
                    error: "CATASTROPHE!",
                });
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Unexpected error occurred during data fulfillment: CATASTROPHE!",
                );
            });

            it("should start loading if the handler changes and request not cached", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.reject(new Error("OH NOES!")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "TYPE1",
                };
                const fakeHandler2: IRequestHandler<string, string> = {
                    fulfillRequest: () => new Promise(() => {}),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "TYPE2",
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                // Make sure we render as laoded.
                await fulfillSpy.mock.results[0].value;
                // Clear out calls so everything is from the props change.
                fulfillSpy.mockClear();
                fakeChildrenFn.mockClear();

                // Act
                wrapper.setProps({
                    handler: fakeHandler2,
                });

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(1);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: true,
                });
            });

            it("should start loading if the options key changes and is not cached", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("HELLO!"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                await fulfillSpy.mock.results[0].value;
                fulfillSpy.mockClear();
                fakeChildrenFn.mockClear();

                // Act
                wrapper.setProps({
                    options: "new-options",
                });

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(1);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: true,
                });
            });

            describe("with cache interceptor", () => {
                it("should call the interceptor with null", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeGetEntryFn).toHaveBeenCalledWith(
                        "options",
                        "options",
                        null,
                    );
                });

                it("should defer to the handler if interceptor returns null", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                        "options",
                    );
                });

                it("should render with the intercepted cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        error: "BOOMY BOOM!",
                    }));

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        error: "BOOMY BOOM!",
                    });
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });
            });

            describe("with data interceptor", () => {
                it("should request data from interceptor", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    mount(
                        <InterceptData
                            handler={fakeHandler}
                            fulfillRequest={fulfillRequestFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fulfillRequestFn).toHaveBeenCalledWith("options");
                    expect(fulfillRequestFn).toHaveBeenCalledTimes(1);
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });
            });
        });

        describe("with cache data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with some cached data
                 * retrieved.
                 */
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    data: "YAY! DATA!",
                });
            });

            it("should not request data on construction", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
            });

            it("should request data if shouldRefreshCache returns true", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("data")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => true,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    "options",
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });

            it("should render first time with the cached data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    loading: false,
                    data: "YAY! DATA!",
                });
            });

            it("should render with new data if the handler changes and request cached", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.reject(new Error("OH NOES!")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "TYPE1",
                };
                const fakeHandler2: IRequestHandler<string, string> = {
                    fulfillRequest: () => new Promise(() => {}),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "TYPE2",
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                // Clear out calls so everything is from the props change.
                fakeChildrenFn.mockClear();
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    data: "NEW DATA!",
                });

                // Act
                wrapper.setProps({
                    handler: fakeHandler2,
                });

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(1);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: false,
                    data: "NEW DATA!",
                });
            });

            it("should render with new data if the options key changes and is cached", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("Not called!"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                fakeChildrenFn.mockClear();
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    data: "NEW DATA!",
                });

                // Act
                wrapper.setProps({
                    options: "new-options",
                });

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(1);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    loading: false,
                    data: "NEW DATA!",
                });
            });

            describe("with cache interceptor", () => {
                it("should call the interceptor with current cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeGetEntryFn).toHaveBeenCalledWith(
                        "options",
                        "options",
                        {data: "YAY! DATA!"},
                    );
                });

                it("should defer to the main cache if interceptor returns null", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        data: "YAY! DATA!",
                    });
                });

                it("should render with the intercepted cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        error: "BOOMY BOOM!",
                    }));

                    // Act
                    mount(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        error: "BOOMY BOOM!",
                    });
                });
            });

            describe("with data interceptor", () => {
                it("should request data from handler if interceptor shouldRefreshCache returns true", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: jest.fn(() => false),
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const shouldRefreshCacheFn = jest.fn(() => true);

                    // Act
                    mount(
                        <InterceptData
                            handler={fakeHandler}
                            shouldRefreshCache={shouldRefreshCacheFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                        "options",
                    );
                    expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
                    expect(
                        fakeHandler.shouldRefreshCache,
                    ).not.toHaveBeenCalled();
                });

                it("should request data from interceptor if handler shouldRefreshCache returns true", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => true,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    mount(
                        <InterceptData
                            handler={fakeHandler}
                            fulfillRequest={fulfillRequestFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fulfillRequestFn).toHaveBeenCalledWith("options");
                    expect(fulfillRequestFn).toHaveBeenCalledTimes(1);
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });

                it("should request data from interceptor if interceptor shouldRefreshCache returns true", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const shouldRefreshCacheFn = jest.fn(() => true);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    mount(
                        <InterceptData
                            handler={fakeHandler}
                            fulfillRequest={fulfillRequestFn}
                            shouldRefreshCache={shouldRefreshCacheFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fulfillRequestFn).toHaveBeenCalledWith("options");
                    expect(fulfillRequestFn).toHaveBeenCalledTimes(1);
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("SSR: isServerSide true", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        describe("without cached data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will never have cached data
                 * retrieved.
                 */
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue(
                    null,
                );
            });

            it("should not request data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("data")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
            });

            it("should render children with loading", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith(
                    expect.objectContaining({
                        loading: true,
                    }),
                );
            });

            it("should invoke the tracking call", () => {
                // Arrange
                const trackSpy = jest.spyOn(
                    RequestTracker.Default,
                    "trackDataRequest",
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <TrackData>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                    </TrackData>,
                );

                // Assert
                expect(trackSpy).toHaveBeenCalledWith(fakeHandler, "options");
            });

            describe("with cache interceptor", () => {
                it("should call the interceptor with null", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeGetEntryFn).toHaveBeenCalledWith(
                        "options",
                        "options",
                        null,
                    );
                });

                it("should render with the intercepted cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        error: "BOOMY BOOM!",
                    }));

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        error: "BOOMY BOOM!",
                    });
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });

                it("should not invoke the tracking call", () => {
                    // Arrange
                    const trackSpy = jest.spyOn(
                        RequestTracker.Default,
                        "trackDataRequest",
                    );
                    const fakeHandler = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        data: "BOOMY BOOM!",
                    }));

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptCache
                                handler={fakeHandler}
                                getEntry={fakeGetEntryFn}
                            >
                                <Data handler={fakeHandler} options={"options"}>
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptCache>
                        </TrackData>,
                    );

                    // Assert
                    expect(trackSpy).not.toHaveBeenCalled();
                });
            });

            describe("with data interceptor", () => {
                it("should not request data from the interceptor", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptData
                            handler={fakeHandler}
                            fulfillRequest={fulfillRequestFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fulfillRequestFn).not.toHaveBeenCalled();
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                });

                it("should invoke the tracking call", () => {
                    // Arrange
                    const trackSpy = jest.spyOn(
                        RequestTracker.Default,
                        "trackDataRequest",
                    );
                    const fakeHandler = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const shouldRefreshCacheFn = jest.fn(() => true);

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptData
                                handler={fakeHandler}
                                shouldRefreshCache={shouldRefreshCacheFn}
                            >
                                <Data handler={fakeHandler} options={"options"}>
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptData>
                        </TrackData>,
                    );

                    // Assert
                    expect(trackSpy).toHaveBeenCalledWith(
                        expect.objectContaining({
                            ...fakeHandler,
                            shouldRefreshCache: expect.any(Function),
                        }),
                        "options",
                    );
                });

                it("should invoke tracking call with handler that defers to interceptor", () => {
                    // Arrange
                    const trackSpy = jest.spyOn(
                        RequestTracker.Default,
                        "trackDataRequest",
                    );
                    const fakeHandler = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const shouldRefreshCacheFn = jest.fn(() => true);

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptData
                                handler={fakeHandler}
                                shouldRefreshCache={shouldRefreshCacheFn}
                            >
                                <Data handler={fakeHandler} options={"options"}>
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptData>
                        </TrackData>,
                    );
                    trackSpy.mock.calls[0][0].shouldRefreshCache(
                        "options",
                        null,
                    );

                    // Assert
                    expect(shouldRefreshCacheFn).toHaveBeenCalledWith(
                        "options",
                        null,
                    );
                    expect(shouldRefreshCacheFn).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe("with cached data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with some cached data
                 * retrieved.
                 */
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    data: "YAY! DATA!",
                });
            });

            it("should not request data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("data")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
            });

            it("should render children with data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith(
                    expect.objectContaining({
                        loading: false,
                        data: "YAY! DATA!",
                    }),
                );
            });

            it("should render children with error", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    error: "OH NO! IT GO BOOM",
                });
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith(
                    expect.objectContaining({
                        loading: false,
                        error: "OH NO! IT GO BOOM",
                    }),
                );
            });

            it("should not invoke the tracking call", () => {
                // Arrange
                const trackSpy = jest.spyOn(
                    RequestTracker.Default,
                    "trackDataRequest",
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <TrackData>
                        <Data handler={fakeHandler} options={"options"}>
                            {fakeChildrenFn}
                        </Data>
                    </TrackData>,
                );

                // Assert
                expect(trackSpy).not.toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                );
            });

            describe("with cache interceptor", () => {
                it("should call the interceptor with current cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeGetEntryFn).toHaveBeenCalledWith(
                        "options",
                        "options",
                        {data: "YAY! DATA!"},
                    );
                });

                it("should defer to the main cache if interceptor returns null", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => null);

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        data: "YAY! DATA!",
                    });
                });

                it("should render with the intercepted cache entry", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        error: "BOOMY BOOM!",
                    }));

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptCache
                            handler={fakeHandler}
                            getEntry={fakeGetEntryFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptCache>,
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledWith({
                        loading: false,
                        error: "BOOMY BOOM!",
                    });
                });

                it("should not invoke the tracking call", () => {
                    // Arrange
                    const trackSpy = jest.spyOn(
                        RequestTracker.Default,
                        "trackDataRequest",
                    );
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: () => Promise.resolve("data"),
                        getKey: (o) => o,
                        shouldRefreshCache: () => false,
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fakeGetEntryFn = jest.fn(() => ({
                        data: "DATA!",
                    }));

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptCache
                                handler={fakeHandler}
                                getEntry={fakeGetEntryFn}
                            >
                                <Data handler={fakeHandler} options={"options"}>
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptCache>
                        </TrackData>,
                    );

                    // Assert
                    expect(trackSpy).not.toHaveBeenCalled();
                });
            });

            describe("with data interceptor", () => {
                it("should not request data from interceptor", () => {
                    // Arrange
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: jest.fn(() => Promise.resolve("data")),
                        getKey: (o) => o,
                        shouldRefreshCache: jest.fn(() => true),
                        type: "MY_HANDLER",
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("data2"),
                    );

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptData
                            handler={fakeHandler}
                            fulfillRequest={fulfillRequestFn}
                        >
                            <Data handler={fakeHandler} options={"options"}>
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
                    expect(fulfillRequestFn).not.toHaveBeenCalled();
                });
            });
        });
    });
});
