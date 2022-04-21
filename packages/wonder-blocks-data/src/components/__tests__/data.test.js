/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {render, act} from "@testing-library/react";

// eslint-disable-next-line import/extensions
import * as ReactDOMServer from "react-dom/server";
import {Server, View} from "@khanacademy/wonder-blocks-core";

import {clearSharedCache} from "../../hooks/use-shared-cache.js";
import TrackData from "../track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {SsrCache} from "../../util/ssr-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import InterceptRequests from "../intercept-requests.js";
import Data from "../data.js";
import {
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    WhenClientSide,
} from "../../hooks/use-hydratable-effect.js";

describe("Data", () => {
    beforeEach(() => {
        clearSharedCache();

        const responseCache = new SsrCache();
        jest.spyOn(SsrCache, "Default", "get").mockReturnValue(responseCache);
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(),
        );
    });

    describe("CSR: isServerSide false", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        describe("without hydrated data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will not have cached data to be
                 * retrieved in the beginning.
                 */
                jest.spyOn(SsrCache.Default, "getEntry").mockReturnValueOnce(
                    null,
                );
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

            it("should share single request across all uses", async () => {
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

            it("should render with an error if the handler request rejects to an error", async () => {
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
                await act(() =>
                    fulfillSpy.mock.results[0].value.catch(() => {
                        /* do nothing */
                    }),
                );

                // Assert
                expect(fakeChildrenFn).toHaveBeenNthCalledWith(2, {
                    status: "error",
                    error: expect.any(Error),
                });
                expect(fakeChildrenFn).toHaveBeenCalledTimes(2);
            });

            it("should render with data if the handler resolves with data", async () => {
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

            it("should render with aborted if the request rejects with an abort error", async () => {
                // Arrange
                const fulfillSpy = jest.spyOn(
                    RequestFulfillment.Default,
                    "fulfill",
                );

                const abortError = new Error("bang bang, abort!");
                abortError.name = "AbortError";
                const fakeHandler = () => Promise.reject(abortError);
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
                    status: "aborted",
                });
            });

            it("should render with an error if the RequestFulfillment rejects with an error", async () => {
                // Arrange
                const fulfillSpy = jest
                    .spyOn(RequestFulfillment.Default, "fulfill")
                    .mockResolvedValue({
                        status: "error",
                        error: new Error("CATASTROPHE!"),
                    });

                const fakeHandler = () => Promise.resolve("YAY!");
                const fakeChildrenFn = jest.fn(() => null);

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
                    error: expect.any(Error),
                });
            });

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
                expect(fakeChildrenFn).toHaveBeenCalledTimes(1);
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "loading",
                });

                // We have to do this or testing-library gets very upset.
                await act(() => fulfillSpy.mock.results[0].value);
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
                const catastrophe = Promise.resolve({
                    status: "error",
                    error: new Error("CATASTROPHE!"),
                });
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
                    error: expect.any(Error),
                });
            });

            describe("with data interceptor", () => {
                it("should request data from interceptor", async () => {
                    // Arrange
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptHandler = jest
                        .fn()
                        .mockResolvedValue("INTERCEPTED DATA");

                    // Act
                    render(
                        <InterceptRequests interceptor={interceptHandler}>
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptRequests>,
                    );
                    await act(() => interceptHandler.mock.results[0].value);

                    // Assert
                    expect(interceptHandler).toHaveBeenCalledTimes(1);
                    expect(fakeHandler).not.toHaveBeenCalled();
                });

                it("should invoke handler method if interceptor method returns null", async () => {
                    // Arrange
                    const fakeHandler = jest.fn().mockResolvedValue("data");
                    const fakeChildrenFn = jest.fn(() => null);
                    const interceptHandler = jest.fn(() => null);

                    // Act
                    render(
                        <InterceptRequests interceptor={interceptHandler}>
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptRequests>,
                    );
                    await act(() => fakeHandler.mock.results[0].value);

                    // Assert
                    expect(interceptHandler).toHaveBeenCalledTimes(1);
                    expect(fakeHandler).toHaveBeenCalledTimes(1);
                });
            });

            it("should retain old data while reloading if retainResultOnChange is true", async () => {
                // Arrange
                const response1 = Promise.resolve("data1");
                const response2 = Promise.resolve("data2");
                const fakeHandler1 = () => response1;
                const fakeHandler2 = () => response2;
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                const wrapper = render(
                    <Data
                        handler={fakeHandler1}
                        requestId="ID1"
                        retainResultOnChange={true}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );
                fakeChildrenFn.mockClear();
                await act(() => response1);
                wrapper.rerender(
                    <Data
                        handler={fakeHandler2}
                        requestId="ID2"
                        retainResultOnChange={true}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() => response2);

                // Assert
                expect(fakeChildrenFn).not.toHaveBeenCalledWith({
                    status: "loading",
                });
                expect(fakeChildrenFn).toHaveBeenCalledWith({
                    status: "success",
                    data: "data1",
                });
                expect(fakeChildrenFn).toHaveBeenLastCalledWith({
                    status: "success",
                    data: "data2",
                });
            });
        });

        describe("with hydrated data", () => {
            beforeEach(() => {
                /**
                 * Each of these test cases will start out with some cached data
                 * retrieved.
                 */
                jest.spyOn(
                    SsrCache.Default,
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

            it("should not request data when clientBehavior is WhenClientSide.ExecuteWhenNoSuccessResult and cache has a valid success result", () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data
                        handler={fakeHandler}
                        requestId="ID"
                        clientBehavior={
                            WhenClientSide.ExecuteWhenNoSuccessResult
                        }
                    >
                        {fakeChildrenFn}
                    </Data>,
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            });

            it("should request data if cached data value is valid but clientBehavior is WhenClientSide.AlwaysExecute is true", async () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data
                        handler={fakeHandler}
                        requestId="ID"
                        clientBehavior={WhenClientSide.AlwaysExecute}
                    >
                        {fakeChildrenFn}
                    </Data>,
                );
                await act(() => fakeHandler.mock.results[0].value);

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
                    SsrCache.Default,
                    "getEntry",
                    // Fake once because that's how the cache would work,
                    // deleting the hydrated value as soon as it was used.
                ).mockReturnValueOnce({
                    error: "BOO! ERROR!",
                });
            });

            it("should always request data if there's a cached error", async () => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");
                const fakeChildrenFn = jest.fn(() => null);

                // Act
                render(
                    <Data handler={fakeHandler} requestId="ID">
                        {fakeChildrenFn}
                    </Data>,
                );
                // Have to await the promise in an act to keep TL/R happy.
                await act(() => fakeHandler.mock.results[0].value);

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
                jest.spyOn(SsrCache.Default, "getEntry").mockReturnValue(null);
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
                        <InterceptRequests interceptor={interceptedHandler}>
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptRequests>,
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
                            <InterceptRequests interceptor={interceptedHandler}>
                                <Data handler={fakeHandler} requestId="ID">
                                    {fakeChildrenFn}
                                </Data>
                            </InterceptRequests>
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
                jest.spyOn(SsrCache.Default, "getEntry").mockReturnValue({
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
                jest.spyOn(SsrCache.Default, "getEntry").mockReturnValue({
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
                    error: expect.any(Error),
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
                        <InterceptRequests interceptor={interceptHandler}>
                            <Data handler={fakeHandler} requestId="ID">
                                {fakeChildrenFn}
                            </Data>
                        </InterceptRequests>,
                    );

                    // Assert
                    expect(fakeHandler).not.toHaveBeenCalled();
                    expect(interceptHandler).not.toHaveBeenCalled();
                });
            });
        });
    });
});
