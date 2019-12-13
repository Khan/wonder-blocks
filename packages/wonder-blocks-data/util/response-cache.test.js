// @flow
import {ResponseCache} from "./response-cache.js";

import type {IRequestHandler} from "./types.js";

describe("./response-cache.js", () => {
    afterEach(() => {
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
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            cache.initialize({
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            });
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });

        it("should throw if the cache is already intialized", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            });

            // Act
            const underTest = () =>
                cache.initialize({
                    MY_HANDLER: {
                        MY_OTHER_KEY: {data: "MORE_DATA"},
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Cannot initialize data response cache more than once"`,
            );
        });

        it("should deep clone the cached data", () => {
            // Arrange
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };
            const sourceData = {
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            };

            // Act
            cache.initialize(sourceData);
            // Try to mutate the cache.
            sourceData["MY_HANDLER"]["MY_KEY"] = {data: "SOME_NEW_DATA"};
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });

        it("should throw if the cloning fails", () => {
            // Arrange
            const cache = new ResponseCache();
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () =>
                cache.initialize({
                    BAD: {
                        BAD: {data: "FOOD"},
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize the data response cache: Error: BANG!"`,
            );
        });
    });

    describe("#cacheData", () => {
        it("should add the entry to the cache", () => {
            // Arrange
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            cache.cacheData(fakeHandler, "options", "data");
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "data"});
        });

        it("should replace the entry in the handler subcache", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {error: "Oh no!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            cache.cacheData(fakeHandler, "options", "other_data");
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "other_data"});
        });
    });

    describe("#cacheError", () => {
        it("should add the entry to the cache", () => {
            // Arrange
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            cache.cacheError(fakeHandler, "options", new Error("Ooops!"));
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({error: "Ooops!"});
        });

        it("should replace the entry in the handler subcache", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: {some: "data"}},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            cache.cacheError(fakeHandler, "options", new Error("Oh no!"));
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({error: "Oh no!"});
        });
    });

    describe("#getEntry", () => {
        it("should return null if the handler subcache is absent", () => {
            // Arrange
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });

        it("should return null if the request key is absent from the subcache", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    SOME_OTHER_KEY: {data: "data we don't want"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });

        it("should return the cached entry", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "data!"});
        });

        it("should delete the cached entry if invalidateCache returns true", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeInvalidatorHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => true,
                fulfillRequest: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };

            // Act
            const invalidated = cache.getEntry(
                fakeInvalidatorHandler,
                "options",
            );
            const result = cache.getEntry(fakeHandler, "options");

            // Assert
            expect(invalidated).toBeNull();
            expect(result).toBeNull();
        });
    });

    describe("#clone", () => {
        it("should deep clone the cached data and errors", () => {
            // Arrange
            const initCache = {
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            };
            const cache = new ResponseCache(initCache);
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: (options) => options,
                type: "MY_HANDLER",
                invalidateCache: () => false,
                fulfillRequest: jest.fn(),
            };
            // Let's add to the initialized state to check that everything
            // is cloning as we expect.
            cache.cacheData(fakeHandler, "OPTIONS1", "DATA");
            cache.cacheError(fakeHandler, "OPTIONS2", new Error("OH NO!"));

            // Act
            const result = cache.cloneCachedData();
            // Update the cache so that it should be different from the clone.
            cache.cacheData(fakeHandler, "OPTIONS1", "SOME_NEW_DATA");

            // Assert
            // Clone is the same as the initialization data.
            expect(result).toStrictEqual({
                MY_HANDLER: {
                    MY_KEY: {
                        data: "THE_DATA",
                    },
                    OPTIONS1: {
                        data: "DATA",
                    },
                    OPTIONS2: {
                        error: "OH NO!",
                    },
                },
            });
        });

        it("should throw if the cloning fails", () => {
            // Arrange
            const cache = new ResponseCache();
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () => cache.cloneCachedData();

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred while trying to clone the cache: Error: BANG!"`,
            );
        });
    });
});
