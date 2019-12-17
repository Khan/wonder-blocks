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
import Data from "./data.js";

import type {IRequestHandler} from "../util/types.js";

describe("./data.js", () => {
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

            it("should initialize state as loading", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                const wrapper = shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(wrapper).toHaveState("loading", true);
                expect(wrapper).toHaveState("data", null);
                expect(wrapper).toHaveState("error", null);
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
                shallow(
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
                shallow(
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

            it("should initialize state with data from cache", () => {
                // Arrange
                const fakeHandler: IRequestHandler<string, string> = {
                    fulfillRequest: () => Promise.resolve("data"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "MY_HANDLER",
                };
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                const wrapper = shallow(
                    <Data handler={fakeHandler} options={"options"}>
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(wrapper).toHaveState("loading", false);
                expect(wrapper).toHaveState("data", "YAY! DATA!");
                expect(wrapper).toHaveState("error", undefined);
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
                shallow(
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
                shallow(
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
        });
    });
});
