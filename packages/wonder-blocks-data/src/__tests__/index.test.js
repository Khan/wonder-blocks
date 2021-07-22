// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {
    initializeCache,
    fulfillAllDataRequests,
    hasUnfulfilledRequests,
    removeFromCache,
    removeAllFromCache,
} from "../index.js";
import {ResponseCache} from "../util/response-cache.js";
import {RequestTracker} from "../util/request-tracking.js";

import type {IRequestHandler, ResponseCache as Cache} from "../index.js";

describe("@khanacademy/wonder-blocks-data", () => {
    test("package exports what we expect", async () => {
        // Arrange
        const importedModule = import("../index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "Data",
                "InterceptCache",
                "InterceptData",
                "NoCache",
                "RequestHandler",
                "TrackData",
                "hasUnfulfilledRequests",
                "fulfillAllDataRequests",
                "initializeCache",
                "removeFromCache",
                "removeAllFromCache",
            ].sort(),
        );
    });

    describe("#initializeCache", () => {
        test("invokes ResponseCache.Default.initialize", () => {
            // Arrange
            const initializeSpy = jest.spyOn(
                ResponseCache.Default,
                "initialize",
            );
            const cache: Cache = ({}: any);

            // Act
            initializeCache(cache);

            // Assert
            expect(initializeSpy).toHaveBeenCalledWith(cache);
        });
    });

    describe("#fulfillAllDataRequests", () => {
        test("when server-side, invokes RequestTracker.Default.fulfillTrackedRequests", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const fulfillTrackedRequests = jest.spyOn(
                RequestTracker.Default,
                "fulfillTrackedRequests",
            );

            // Act
            fulfillAllDataRequests();

            // Assert
            expect(fulfillTrackedRequests).toHaveBeenCalled();
        });

        test("when client-side, rejects with error", async () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);

            // Act
            const underTest = fulfillAllDataRequests();

            // Assert
            await expect(underTest).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Data requests are not tracked when client-side"`,
            );
        });
    });

    describe("#hasUnfulfilledRequests", () => {
        test("when server-side, invokes RequestTracker.Default.hasUnfulfilledRequests", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const hasUnfulfilledRequestsSpy = jest.spyOn(
                RequestTracker.Default,
                "hasUnfulfilledRequests",
                "get",
            );

            // Act
            hasUnfulfilledRequests();

            // Assert
            expect(hasUnfulfilledRequestsSpy).toHaveBeenCalled();
        });

        test("when client-side, rejects with error", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);

            // Act
            const underTest = () => hasUnfulfilledRequests();

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Data requests are not tracked when client-side"`,
            );
        });
    });

    describe("#removeFromCache", () => {
        test("invokes ResponseCache.Default.remove", () => {
            // Arrange
            const removeSpy = jest.spyOn(ResponseCache.Default, "remove");
            const fakeHandler: IRequestHandler<string, string> = ({}: any);

            // Act
            removeFromCache(fakeHandler, "REMOVE");

            // Assert
            expect(removeSpy).toHaveBeenCalledWith(fakeHandler, "REMOVE");
        });
    });

    describe("#removeAllFromCache", () => {
        test("invokes ResponseCache.Default.removeAll", () => {
            // Arrange
            const removeAllSpy = jest.spyOn(ResponseCache.Default, "removeAll");
            const fakeHandler: IRequestHandler<string, string> = ({}: any);
            const predicate = () => false;

            // Act
            removeAllFromCache(fakeHandler, predicate);

            // Assert
            expect(removeAllSpy).toHaveBeenCalledWith(fakeHandler, predicate);
        });
    });
});
