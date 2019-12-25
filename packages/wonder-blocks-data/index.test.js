// @flow
import {initializeCache, fulfillAllDataRequests} from "./index.js";
import {ResponseCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {ResponseCache as Cache} from "./index.js";

describe("@khanacademy/wonder-blocks-data", () => {
    test("package exports what we expect", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "Data",
                "InterceptCache",
                "InterceptData",
                "RequestHandler",
                "TrackData",
                "fulfillAllDataRequests",
                "initializeCache",
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
        test("invokes RequestTracker.Default.fulfillTrackedRequests", () => {
            // Arrange
            const fulfillTrackedRequests = jest.spyOn(
                RequestTracker.Default,
                "fulfillTrackedRequests",
            );

            // Act
            fulfillAllDataRequests();

            // Assert
            expect(fulfillTrackedRequests).toHaveBeenCalled();
        });
    });
});
