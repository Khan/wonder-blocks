// @flow
import {renderHook as clientRenderHook} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";

import TrackData from "../../components/track-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {SsrCache} from "../../util/ssr-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";

import {useServerEffect} from "../use-server-effect.js";

describe("#useServerEffect", () => {
    beforeEach(() => {
        const responseCache = new SsrCache();
        jest.spyOn(SsrCache, "Default", "get").mockReturnValue(responseCache);
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
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

        it("should track the request", () => {
            // Arrange
            const fakeHandler = jest.fn();
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
                fakeHandler,
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
            expect(result).toEqual({data: "DATA", error: null});
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
                data: null,
                error: "ERROR",
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
            expect(result).toEqual({data: "DATA", error: null});
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
                data: null,
                error: "ERROR",
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
