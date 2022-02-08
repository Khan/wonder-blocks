/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {render, act} from "@testing-library/react";

// eslint-disable-next-line import/extensions
import * as ReactDOMServer from "react-dom/server";
import {Server, View} from "@khanacademy/wonder-blocks-core";

import TrackData from "../track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {ResponseCache} from "../../util/response-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import InterceptData from "../intercept-data.js";
import Data from "../data.js";

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

            it("should make request for data on construction", async () => {
                // Arrange
                const response = Promise.resolve("data");
                const fakeHandler = jest.fn().mockReturnValue(response);
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() => response);

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            });

            it("should initially render children with loading", async () => {
                // Arrange
                const response = Promise.resolve("data");
                const fakeHandler = jest.fn().mockReturnValue(response);
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() => response);

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "loading",
                });
            });

            it("should share single request across all uses", () => {
                // Arrange
                const fakeHandler = jest.fn(
                    () => new Promise((resolve, reject) => {}),
                );
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <View>
                        <Data handler={fakeHandler} requestId="ID">
                            {fakeChildrenFn}
                        </Data>
                        <Data handler={fakeHandler} requestId="ID">
                            {fakeChildrenFn}
                        </Data>
                    </View>,
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            });

            it("should render with an error if the request rejects to an error", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );
                const fakeHandler = () => Promise.reject(new Error("OH NOES!"));
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                /**
                 * We wait for the fulfillment to resolve.
                 */
                await act(() => fulfillSpy.mock.results[0].value);

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

                const fakeHandler = () => Promise.resolve("YAY! DATA!");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                /**
                 * We wait for the fulfillment to resolve.
                 */
                await act(() => fulfillSpy.mock.results[0].value);

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "success",
                    data: "YAY! DATA!",
                });
            });

            it.each`
                error
                ${"CATASTROPHE!"}
                ${new Error("CATASTROPHE!")}
            `(
                "should render with an error if the request rejects with $error",
                async ({error}) => {
                    // Arrange
                    const fulfillSpy = jest
                        .spyOn(RequestFulfillment.Default, "fulfill")
                        .mockReturnValue(Promise.reject(error));

                    const fakeHandler = () => Promise.resolve("YAY!");
                    const fakeChildrenFn = jest.fn(() => null);
                    const consoleSpy = jest
                        .spyOn(console, "error")
                        .mockImplementation(() => {
                            /* Just to shut it up */
                        });

                    // Act
                    render(
                        <Data handler={fakeHandler} requestId="ID">
                            {fakeChildrenFn}
                        </Data>,
                    );
                    /**
                     * We wait for the fulfillment to reject.
                     */
                    await act(() =>
                        fulfillSpy.mock.results[0].value.catch(() => {}),
                    );

                    // Assert
                    expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                    expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                        status: "error",
                        error: "CATASTROPHE!",
                    });
                    expect(consoleSpy).toHaveBeenCalledWith(
                        expect.stringMatching(
                            "Unexpected error occurred during data fulfillment:(?: Error:)? CATASTROPHE!",
                        ),
                    );
                },
            );

            it("should start loading if the id changes and request not cached", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const fakeHandler = () => Promise.resolve("HELLO!");
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                // We want to make sure we render the data state so we can
                // see our switch back to loading.
                await act(() => fulfillSpy.mock.results[0].value);
                fulfillSpy.mockClear();
                fakeChildrenFn.mockClear();

                // Act
                wrapper.rerender(
                    <Data handler={fakeHandler} requestId="NEW_ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                // Render 1: Caused by handler changed
                // Render 2: Caused by result state changing to null
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "loading",
                });
            });

            it("should ignore resolution of pending handler fulfillment when id changes", async () => {
                // Arrange
                const oldRequest = Promise.resolve("OLD DATA");
                const oldHandler = jest
                    .fn()
                    .mockReturnValueOnce(oldRequest)
                    .mockReturnValue(
                        new Promise(() => {
                            /*let's have the new request remain pending*/
                        }),
                    );

                // Act
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = render(
                    <Data handler={oldHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                wrapper.rerender(
                    <Data handler={oldHandler} requestId="NEW_ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() => oldRequest);

                // Assert
                expect(fakeChildrenFn).not.toHaveBeenCalledWith({
                    status: "success",
                    data: "OLD DATA",
                });
            });

            it("should ignore rejection of pending handler fulfillment when id changes", async () => {
                // Arrange
                const oldRequest = Promise.reject(new Error("BOOM!"));
                const oldHandler = jest
                    .fn()
                    .mockReturnValueOnce(oldRequest)
                    .mockReturnValue(
                        new Promise(() => {
                            /*let's have the new request remain pending*/
                        }),
                    );

                // Act
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = render(
                    <Data handler={oldHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                wrapper.rerender(
                    <Data handler={oldHandler} requestId="NEW_ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() =>
                    oldRequest.catch(() => {
                        /*ignore*/
                    }),
                );

                // Assert
                expect(fakeChildrenFn).not.toHaveBeenCalledWith({
                    status: "error",
                    error: "BOOM!",
                });
            });

            it("should ignore catastrophic request fulfillment when id changes", async () => {
                // Arrange
                const catastrophe = Promise.reject("CATASTROPHE!");
                jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                ).mockReturnValueOnce(catastrophe);
                const oldHandler = jest.fn().mockResolvedValue("OLD DATA");

                // Act
                const fakeChildrenFn = jest.fn(() => null);
                const wrapper = render(
                    <Data handler={oldHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                wrapper.rerender(
                    <Data handler={oldHandler} requestId="NEW_ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() =>
                    catastrophe.catch(() => {
                        /* ignore */
                    }),
                );

                // Assert
                expect(fakeChildrenFn).not.toHaveBeenCalledWith({
                    status: "error",
                    error: "CATASTROPHE!",
                });
            });

            describe("with data interceptor", () => {
                it("should request data from interceptor", () => {
                    // Arrange
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptHandler = jest
                        .fn()
                        .mockResolvedValue("INTERCEPTED DATA");

                    // Act
                    render(
                        <InterceptData
                            requestId="ID"
                            handler={interceptHandler}
                        >
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(interceptHandler).toHaveBeenCalledTimes(1);
                    expect(fakeHandler).not.toHaveBeenCalled();
                });

                it("should invoke handler method if interceptor method returns null", () => {
                    // Arrange
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptHandler = jest.fn(() => null);

                    // Act
                    render(
                        <InterceptData
                            handler={interceptHandler}
                            requestId="ID"
                        >
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(interceptHandler).toHaveBeenCalledTimes(1);
                    expect(fakeHandler).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe("with cache data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with some cached data
                 * retrieved.
                 */
                jest.spyOn(
                    ResponseCache.Default,
                    "getEntry",
                    // Fake once because that's how the cache would work,
                    // deleting the hydrated value as soon as it was used.
                ).mockReturnValueOnce({
                    data: "YAY! DATA!",
                });
            });

            it("should render first time with the cached data", () => {
                // Arrange
                const fakeHandler = () => Promise.resolve("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "success",
                    data: "YAY! DATA!",
                });
            });

            it("should retain old data while reloading if showOldDataWhileLoading is true", async () => {
                // Arrange
                const response1 = Promise.resolve("data1");
                const response2 = Promise.resolve("data2");
                const fakeHandler1 = () => response1;
                const fakeHandler2 = () => response2;
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                const wrapper = render(
                    <Data handler={fakeHandler1} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                wrapper.rerender(
                    <Data
                        handler={fakeHandler2}
                        requestId="ID"
                        showOldDataWhileLoading={true}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeChildrenFn).not.toHaveBeenCalledWith({
                    status: "loading",
                });
            });

            it("should not request data when alwaysRequestOnHydration is false and cache has a valid data result", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data
                        handler={fakeHandler}
                        requestId="ID"
                        alwaysRequestOnHydration={false}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            });

            it("should request data if cached data value is valid but alwaysRequestOnHydration is true", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data
                        handler={fakeHandler}
                        requestId="ID"
                        alwaysRequestOnHydration={true}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            });
        });

        describe("with cached abort", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with a cached abort.
                 */
                jest.spyOn(
                    ResponseCache.Default,
                    "getEntry",
                    // Fake once because that's how the cache would work,
                    // deleting the hydrated value as soon as it was used.
                ).mockReturnValueOnce({
                    data: null,
                });
            });

            it("should request data if cached data value is null (i.e. represents an aborted request)", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            });
        });

        describe("with cached error", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with a cached error.
                 */
                jest.spyOn(
                    ResponseCache.Default,
                    "getEntry",
                    // Fake once because that's how the cache would work,
                    // deleting the hydrated value as soon as it was used.
                ).mockReturnValueOnce({
                    error: "BOO! ERROR!",
                });
            });

            it("should always request data if there's a cached error", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
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
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            });

            it("should render children with loading", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} requestId="ID">
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
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <TrackData>
                        <Data handler={fakeHandler} requestId="ID">
                            {fakeChildrenFn}
                        </Data>
                    </TrackData>,
                );

                // Assert
                expect(trackSpy).toHaveBeenCalledWith(
                    "ID",
                    expect.any(Function),
                    true,
                );
            });

            describe("with data interceptor", () => {
                it("should not request data from the interceptor", () => {
                    // Arrange
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptedHandler = jest.fn(() =>
                        Promise.resolve("DATA!"),
                    );

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptData
                            handler={interceptedHandler}
                            requestId="ID"
                        >
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fakeHandler).not.toHaveBeenCalled();
                    expect(interceptedHandler).not.toHaveBeenCalled();
                });

                it("should invoke the tracking call", () => {
                    // Arrange
                    const trackSpy = jest.spyOn(
                        RequestTracker.Default,
                        "trackDataRequest",
                    );
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptedHandler = jest
                        .fn()
                        .mockResolvedValue("INTERCEPTED");

                    // Act
                    ReactDOMServer.renderToString(
                        <TrackData>
                            <InterceptData
                                requestId="ID"
                                handler={interceptedHandler}
                            >
                                <Data handler={fakeHandler} requestId="ID">
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptData>
                        </TrackData>,
                    );

                    // Assert
                    expect(trackSpy).toHaveBeenCalledWith(
                        "ID",
                        expect.any(Function),
                        true,
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
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            });

            it("should render children with data", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} requestId="ID">
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
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <Data handler={fakeHandler} requestId="ID">
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
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                ReactDOMServer.renderToString(
                    <TrackData>
                        <Data handler={fakeHandler} requestId="ID">
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
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptHandler = jest
                        .fn()
                        .mockResolvedValue("INTERCEPTED");

                    // Act
                    ReactDOMServer.renderToString(
                        <InterceptData
                            handler={interceptHandler}
                            requestId="ID"
                        >
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptData>,
                    );

                    // Assert
                    expect(fakeHandler).not.toHaveBeenCalled();
                    expect(interceptHandler).not.toHaveBeenCalled();
                });
            });
        });
    });
});
