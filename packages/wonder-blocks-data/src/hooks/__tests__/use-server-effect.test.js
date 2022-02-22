// @flow
import {renderHook as clientRenderHook} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";

import TrackData from "../../components/track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {SsrCache} from "../../util/ssr-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";
import {DataError} from "../../util/data-error.js";
import * as UseRequestInterception from "../use-request-interception.js";

import {useServerEffect} from "../use-server-effect.js";

jest.mock("../use-request-interception.js");

describe("#useServerEffect", () => {
    beforeEach(() => {
        jest.resetAllMocks();

        const responseCache = new SsrCache();
        jest.spyOn(SsrCache, "Default", "get").mockReturnValue(responseCache);
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );

        // Simple implementation of request interception that just returns
        // the handler.
        jest.spyOn(
            UseRequestInterception,
            "useRequestInterception",
        ).mockImplementation((_, handler) => handler);
    });

    it("should call useRequestInterception", () => {
        // Arrange
        const useRequestInterceptSpy = jest
            .spyOn(UseRequestInterception, "useRequestInterception")
            .mockReturnValue(jest.fn());
        const fakeHandler = jest.fn();

        // Act
        serverRenderHook(() => useServerEffect("ID", fakeHandler));

        // Assert
        expect(useRequestInterceptSpy).toHaveBeenCalledWith("ID", fakeHandler);
    });

    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should return null if no cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toBeNull();
        });

        it("should not directly request fulfillment", () => {
            // Arrange
            const fakeHandler = jest.fn();
            const fulfillRequestSpy = jest.spyOn(
                RequestFulfillment.Default,
                "fulfill",
            );

            // Act
            serverRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(fulfillRequestSpy).not.toHaveBeenCalled();
        });

        it("should track the intercepted request", () => {
            // Arrange
            const fakeHandler = jest.fn();
            const interceptedHandler = jest.fn();
            jest.spyOn(
                UseRequestInterception,
                "useRequestInterception",
            ).mockReturnValue(interceptedHandler);
            const trackDataRequestSpy = jest.spyOn(
                RequestTracker.Default,
                "trackDataRequest",
            );

            // Act
            serverRenderHook(() => useServerEffect("ID", fakeHandler), {
                wrapper: TrackData,
            });

            // Assert
            expect(trackDataRequestSpy).toHaveBeenCalledWith(
                "ID",
                interceptedHandler,
                true,
            );
        });

        it("should return data cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(SsrCache.Default, "getEntry").mockReturnValueOnce({
                data: "DATA",
                error: null,
            });

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toEqual({status: "success", data: "DATA"});
        });

        it("should return error cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(SsrCache.Default, "getEntry").mockReturnValueOnce({
                data: null,
                error: "ERROR",
            });

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toEqual({
                status: "error",
                error: expect.any(DataError),
            });
        });
    });

    describe("when client-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it("should return null if no cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toBeNull();
        });

        it("should return data cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(SsrCache.Default, "getEntry").mockReturnValueOnce({
                data: "DATA",
                error: null,
            });

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toEqual({status: "success", data: "DATA"});
        });

        it("should return error cached result", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(SsrCache.Default, "getEntry").mockReturnValueOnce({
                data: null,
                error: "ERROR",
            });

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(result).toEqual({
                status: "error",
                error: expect.any(DataError),
            });
        });

        it("should not track the request", () => {
            // Arrange
            const fakeHandler = jest.fn().mockReturnValue(
                new Promise(() => {
                    /*prevent act() warning*/
                }),
            );
            const trackDataRequestSpy = jest.spyOn(
                RequestTracker.Default,
                "trackDataRequest",
            );

            // Act
            clientRenderHook(() => useServerEffect("ID", fakeHandler), {
                wrapper: TrackData,
            });

            // Assert
            expect(trackDataRequestSpy).not.toHaveBeenCalled();
        });

        it("should not request fulfillment", () => {
            // Arrange
            const fakeHandler = jest.fn().mockReturnValue(
                new Promise(() => {
                    /*prevent act() warning*/
                }),
            );
            const fulfillRequestSpy = jest.spyOn(
                RequestFulfillment.Default,
                "fulfill",
            );

            // Act
            clientRenderHook(() => useServerEffect("ID", fakeHandler));

            // Assert
            expect(fulfillRequestSpy).not.toHaveBeenCalled();
        });
    });
});
