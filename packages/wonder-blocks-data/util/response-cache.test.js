// @flow
import typeof * as ResponseCacheModule from "./response-cache.js";

import type {IRequestHandler} from "./types.js";

const getResponseCache = (): ResponseCacheModule => {
    let responseCache: ?ResponseCacheModule;
    jest.isolateModules(() => {
        responseCache = require("./response-cache.js");
    });
    if (responseCache == null) {
        throw new Error("Import failed");
    }
    return responseCache;
};

describe("./response-cache.js", () => {
    afterEach(() => {
        jest.resetModules();

        /**
         * This is needed or the JSON.stringify mocks need to be
         * mockImplementationOnce. This is because if the snapshots need
         * to update, they write the inline snapshot and that appears to invoke
         * prettier which in turn, calls JSON.stringify. And if that mock
         * throws, then boom. No snapshot update and a big old confusing test
         * failure.
         */
        jest.restoreAllMocks();
    });

    describe("#initialize", () => {
        it("should initialize the cache with the given data", () => {
            // Arrange
            const {initialize, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };

            // Act
            initialize({
                MY_HANDLER: {
                    MY_KEY: "THE_DATA",
                },
            });
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBe("THE_DATA");
        });

        it("should throw if the cache is already intialized", () => {
            // Arrange
            const {initialize} = getResponseCache();
            initialize({
                MY_HANDLER: {
                    MY_KEY: "THE_DATA",
                },
            });

            // Act
            const underTest = () =>
                initialize({
                    MY_HANDLER: {
                        MY_OTHER_KEY: "MORE_DATA",
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Cannot initialize data response cache more than once"`,
            );
        });

        it("should deep clone the cached data", () => {
            // Arrange
            const {initialize, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };
            const sourceData = {
                MY_HANDLER: {
                    MY_KEY: "THE_DATA",
                },
            };

            // Act
            initialize(sourceData);
            // Try to mutate the cache.
            sourceData["MY_HANDLER"]["MY_KEY"] = "SOME_NEW_DATA";
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBe("THE_DATA");
        });

        it("should throw if the cloning fails", () => {
            // Arrange
            const {initialize} = getResponseCache();
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () =>
                initialize({
                    BAD: {
                        BAD: "FOOD",
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize the data response cache: Error: BANG!"`,
            );
        });
    });

    describe("#cacheData", () => {
        it("should add the data to the cache", () => {
            // Arrange
            const {cacheData, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };

            // Act
            cacheData(fakeHandler, "options", "data");
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBe("data");
        });

        it("should replace the data in the handler subcache", () => {
            // Arrange
            const {initialize, cacheData, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };
            initialize({
                MY_HANDLER: {
                    MY_KEY: "data",
                },
            });

            // Act
            cacheData(fakeHandler, "options", "other_data");
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBe("other_data");
        });
    });

    describe("#getData", () => {
        it("should return null if the handler subcache is absent", () => {
            // Arrange
            const {getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };

            // Act
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });

        it("should return undefined if the request key is absent from the subcache", () => {
            // Arrange
            const {initialize, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };
            initialize({
                MY_HANDLER: {
                    SOME_OTHER_KEY: "data we don't want",
                },
            });

            // Act
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBeUndefined();
        });

        it("should return the cached data", () => {
            // Arrange
            const {initialize, getData} = getResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                cacheHitBehavior: () => "static",
                fulfillRequest: jest.fn(),
            };
            initialize({
                MY_HANDLER: {
                    MY_KEY: "data!",
                },
            });

            // Act
            const result = getData(fakeHandler, "options");

            // Assert
            expect(result).toBe("data!");
        });
    });
});
