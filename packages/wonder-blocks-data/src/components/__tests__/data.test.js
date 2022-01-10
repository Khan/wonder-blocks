/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

// eslint-disable-next-line import/extensions
import * as ReactDOMServer from "react-dom/server";
import {Server, View} from "@khanacademy/wonder-blocks-core";

import TrackData from "../track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {ResponseCache} from "../../util/response-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import InterceptData from "../intercept-data.js";
import Data from "../data.js";

import type {IRequestHandler} from "../../util/types.js";

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
        jest.resetAllMocks();
    });

    describe("CSR: isServerSide false", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        describe("without cached data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will not have cached data to be
                 * retrieved in the beginning.
                 */
                jest.spyOn(
                    ResponseCache.Default,
                    "getEntry",
                ).mockReturnValueOnce(null);
            });

            it("should make request for data on construction", () => {
                // Arrange
                const fulfillRequestSpy = jest.fn(() =>
                    Promise.resolve("data"),
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fulfillRequestSpy).toHaveBeenCalledWith("options");
                expect(fulfillRequestSpy).toHaveBeenCalledTimes(1);
            });

            it("should initially render children with loading", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
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
                    status: "loading",
                });
            });

            it("should share single request across all uses", () => {
                // Arrange
                const fulfillRequestSpy = jest.fn(
                    () => new Promise((resolve, reject) => {}),
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
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
                expect(fulfillRequestSpy).toHaveBeenCalledWith("options");
                expect(fulfillRequestSpy).toHaveBeenCalledTimes(1);
            });

            it("should render with an error if the request rejects to an error", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.reject(new Error("OH NOES!")),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
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
                    status: "error",
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
                    type: "MY_HANDLER",
                    hydrate: true,
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
                    status: "success",
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
                    type: "MY_HANDLER",
                    hydrate: true,
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
                    status: "error",
                    error: "CATASTROPHE!",
                });
                expect(consoleSpy).toHaveBeenCalledWith(
                    "Unexpected error occurred during data fulfillment: CATASTROPHE!",
                );
            });

            it("should render loading if the handler changes and request not cached", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.reject(new Error("OH NOES!")),
                    getKey: (o) => o,
                    type: "TYPE1",
                    hydrate: true,
                };
                const fakeHandler2: IRequestHandler<string, string> = {
                    fulfillRequest: () =>
                        new Promise(() => {
                            /*pending*/
                        }),
                    getKey: (o) => o,
                    type: "TYPE2",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                // We want to make sure we render the error state so we can
                // see our switch back to loading.
                await fulfillSpy.mock.results[0].value;
                // Clear out calls so everything is from the props change.
                fulfillSpy.mockClear();
                fakeChildrenFn.mockClear();

                // Act
                wrapper.setProps({
                    handler: fakeHandler2,
                });

                // Assert
                // Render 1: Caused by handler changed
                // Render 2: Caused by result state changing to null
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "loading",
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
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = mount(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );
                // We want to make sure we render the data state so we can
                // see our switch back to loading.
                await fulfillSpy.mock.results[0].value;
                fulfillSpy.mockClear();
                fakeChildrenFn.mockClear();

                // Act
                wrapper.setProps({
                    options: "new-options",
                });

                // Assert
                // Render 1: Caused by handler changed
                // Render 2: Caused by result state changing to null
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "loading",
                });
            });

            describe("with data interceptor", () => {
                it("should request data from interceptor", () => {
                    // Arrange
                    const fulfillRequestSpy = jest
                        .fn()
                        .mockResolvedValue("data");
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: fulfillRequestSpy,
                        getKey: (o) => o,
                        type: "MY_HANDLER",
                        hydrate: true,
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
                    expect(fulfillRequestSpy).not.toHaveBeenCalled();
                });

                it("should invoke handler method if interceptor method returns null", () => {
                    // Arrange
                    const fulfillRequestSpy = jest
                        .fn()
                        .mockResolvedValue("data");
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: fulfillRequestSpy,
                        getKey: (o) => o,
                        type: "MY_HANDLER",
                        hydrate: true,
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() => null);

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
                    expect(fulfillRequestSpy).toHaveBeenCalled();
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

            it("should render first time with the cached data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
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
                    status: "success",
                    data: "YAY! DATA!",
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
                const fulfillRequestSpy = jest.fn().mockResolvedValue("data");
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fulfillRequestSpy).not.toHaveBeenCalled();
            });

            it("should render children with loading", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "loading",
                });
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
                    type: "MY_HANDLER",
                    hydrate: true,
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

            describe("with data interceptor", () => {
                it("should not request data from the interceptor", () => {
                    // Arrange
                    const fulfillRequestSpy = jest
                        .fn()
                        .mockResolvedValue("data");
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: fulfillRequestSpy,
                        getKey: (o) => o,
                        type: "MY_HANDLER",
                        hydrate: true,
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
                    expect(fulfillRequestSpy).not.toHaveBeenCalled();
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
                        type: "MY_HANDLER",
                        hydrate: true,
                    };
                    const fakeChildrenFn = jest.fn(() => null);
                    const fulfillRequestFn = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptData
                                handler={
                                    (fakeHandler: IRequestHandler<
                                        string,
                                        string,
                                    >)
                                }
                                fulfillRequest={fulfillRequestFn}
                            >
                                <Data handler={fakeHandler} options={"options"}>
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptData>
                        </TrackData>,
                    );

                    // Assert
                    expect(trackSpy).toHaveBeenCalledWith(
                        {
                            fulfillRequest: expect.any(Function),
                            getKey: expect.any(Function),
                            type: "MY_HANDLER",
                            hydrate: true,
                        },
                        "options",
                    );
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
                const fulfillRequestSpy = jest.fn().mockResolvedValue("data");
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fulfillRequestSpy).not.toHaveBeenCalled();
            });

            it("should render children with data", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "success",
                    data: "YAY! DATA!",
                });
            });

            it("should render children with error", () => {
                // Arrange
                jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValue({
                    error: "OH NO! IT GO BOOM",
                });
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    type: "MY_HANDLER",
                    hydrate: true,
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "error",
                    error: "OH NO! IT GO BOOM",
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
                    type: "MY_HANDLER",
                    hydrate: true,
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

            describe("with data interceptor", () => {
                it("should not request data from interceptor", () => {
                    // Arrange
                    const fulfillRequestSpy = jest
                        .fn()
                        .mockResolvedValue("data");
                    const fakeHandler: IRequestHandler<string, string> = {
                        fulfillRequest: fulfillRequestSpy,
                        getKey: (o) => o,
                        type: "MY_HANDLER",
                        hydrate: true,
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
                    expect(fulfillRequestSpy).not.toHaveBeenCalled();
                    expect(fulfillRequestFn).not.toHaveBeenCalled();
                });
            });
        });
    });
});
