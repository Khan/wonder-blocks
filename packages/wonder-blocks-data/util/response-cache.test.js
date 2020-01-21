// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {ResponseCache} from "./response-cache.js";
import MemoryCache from "./memory-cache.js";

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
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
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
            const internalCache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            });
            const cache = new ResponseCache(internalCache);

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

        it("should throw if the data is invalid", () => {
            // Arrange
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });
            const internalCache = new MemoryCache();
            const cache = new ResponseCache(internalCache);

            // Act
            const underTest = () => cache.initialize({});

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize the data response cache: Error: An error occurred trying to initialize from a response cache snapshot: Error: BANG!"`,
            );
        });

        it("should deep clone the cached data", () => {
            // Arrange
            const cache = new ResponseCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
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
    });

    describe("#cacheData", () => {
        describe("no custom cache", () => {
            it("should store the entry in the framework cache", () => {
                // Arrange
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                cache.cacheData(fakeHandler, "options", "data");

                // Assert
                expect(internalCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {data: "data"},
                );
            });
        });

        describe("with custom cache", () => {
            it("SSR should use the framework cache, not the custom cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.cacheData(fakeHandler, "options", "data");

                // Assert
                expect(customCache.store).not.toHaveBeenCalled();
                expect(internalCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {data: "data"},
                );
            });

            it("CSR should use the custom cache, not the framework cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.cacheData(fakeHandler, "options", "data");

                // Assert
                expect(customCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {data: "data"},
                );
                expect(internalCache.store).not.toHaveBeenCalled();
            });
        });
    });

    describe("#cacheError", () => {
        describe("no custom cache", () => {
            it("should store the entry in the framework cache", () => {
                // Arrange
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                cache.cacheError(fakeHandler, "options", new Error("Ooops!"));

                // Assert
                expect(internalCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {error: "Ooops!"},
                );
            });
        });

        describe("with custom cache", () => {
            it("SSR should use the framework cache, not the custom cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.cacheError(fakeHandler, "options", new Error("Ooops!"));

                // Assert
                expect(internalCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {error: "Ooops!"},
                );
                expect(customCache.store).not.toHaveBeenCalled();
            });

            it("CSR should use the custom cache, not the framework cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "store");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.cacheError(fakeHandler, "options", new Error("Ooops!"));

                // Assert
                expect(customCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {error: "Ooops!"},
                );
                expect(internalCache.store).not.toHaveBeenCalled();
            });
        });
    });

    describe("#getEntry", () => {
        describe("no custom cache", () => {
            it("should return null if not in the framework cache", () => {
                // Arrange
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve").mockReturnValue(null);
                const cache = new ResponseCache();
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toBeNull();
            });

            it("should return the cached entry", () => {
                // Arrange
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                const cache = new ResponseCache(internalCache);
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });
        });

        describe("with custom cache", () => {
            it("SSR should use framework cache, not custom cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.getEntry(fakeHandler, "options");

                // Assert
                expect(internalCache.retrieve).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                );
                expect(customCache.retrieve).not.toHaveBeenCalled();
            });

            it("CSR should return custom cached entry", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn().mockReturnValue({data: "custom data!"}),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.getEntry(fakeHandler, "options");

                // Assert
                expect(customCache.retrieve).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                );
                expect(internalCache.retrieve).not.toHaveBeenCalled();
            });

            it("CSR should store framework entry in custom cache when custom cache misses", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
                expect(customCache.store).toBeCalledWith(
                    fakeHandler,
                    "options",
                    {data: "data!"},
                );
            });

            it("CSR should remove framework entry when custom cache misses", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const internalCache = new MemoryCache();
                jest.spyOn(internalCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                jest.spyOn(internalCache, "remove");
                const cache = new ResponseCache(internalCache);
                const customCache = {
                    store: jest.fn(),
                    retrieve: jest.fn(),
                    remove: jest.fn(),
                    removeAll: jest.fn(),
                };
                const fakeHandler: IRequestHandler<string, string> = {
                    getKey: () => "MY_KEY",
                    type: "MY_HANDLER",
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: customCache,
                };

                // Act
                cache.getEntry(fakeHandler, "options");

                // Assert
                expect(internalCache.remove).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                );
            });
        });
    });

    describe("#remove", () => {
        it("should return false if nothing was removed", () => {
            // Arrange
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "remove").mockReturnValue(false);
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn().mockReturnValue(false),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            const result = cache.remove(fakeHandler, "optionsA");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return true if something was removed from framework cache", () => {
            // Arrange
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "remove").mockReturnValue(true);
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn().mockReturnValue(false),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            const result = cache.remove(fakeHandler, "optionsA");

            // Assert
            expect(result).toBeTruthy();
        });

        it("should return true if something was removed from custom cache", () => {
            // Arrange
            const internalCache = new MemoryCache();
            /**
             * This simulates that the internal cache did not remove anything.
             * That way, if the custom cache says it does, we can check that
             * our method is acknowledging that.
             */
            jest.spyOn(internalCache, "remove").mockReturnValue(false);
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                /**
                 * We're testing that this mocked valiue propagates to the
                 * framework response cache `remove` call.
                 */
                remove: jest.fn().mockReturnValue(true),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "IGNORED",
                type: "IGNORED",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            const result = cache.remove(fakeHandler, "PRETEND_KEY");

            // Assert
            expect(result).toBeTruthy();
        });

        it("SSR should call framework cache, not custom cache", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "remove");
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn(),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            cache.remove(fakeHandler, "optionsA");

            // Assert
            expect(customCache.remove).not.toHaveBeenCalled();
            expect(internalCache.remove).toHaveBeenCalledWith(
                fakeHandler,
                "optionsA",
            );
        });
    });

    describe("#removeAll", () => {
        it("CSR should call removeAll on custom and framework caches", () => {
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "removeAll");
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn(),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };
            const predicate = () => false;

            // Act
            cache.removeAll(fakeHandler, predicate);

            // Assert
            expect(customCache.removeAll).toHaveBeenCalledWith(
                fakeHandler,
                predicate,
            );
            expect(internalCache.removeAll).toHaveBeenCalledWith(
                fakeHandler,
                predicate,
            );
        });

        it("should return total number of entries removed", () => {
            // Arrange
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "removeAll").mockReturnValue(1);
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn(),
                removeAll: jest.fn().mockReturnValue(1),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            const result = cache.removeAll(fakeHandler);

            // Assert
            expect(result).toBe(2);
        });

        it("SSR should call framework cache, not custom cache", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "removeAll");
            const cache = new ResponseCache(internalCache);
            const customCache = {
                store: jest.fn(),
                retrieve: jest.fn(),
                remove: jest.fn(),
                removeAll: jest.fn(),
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: customCache,
            };

            // Act
            cache.removeAll(fakeHandler);

            // Assert
            expect(customCache.removeAll).not.toHaveBeenCalled();
            expect(internalCache.removeAll).toHaveBeenCalledWith(
                fakeHandler,
                undefined,
            );
        });
    });

    describe("#cloneCachedData", () => {
        it("should clone the internal cache", () => {
            // Arrange
            const internalCache = new MemoryCache();
            jest.spyOn(internalCache, "cloneData").mockReturnValue("CLONE!");
            const cache = new ResponseCache(internalCache);
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: (options) => options,
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
            };
            // Let's add to the initialized state to check that everything
            // is cloning as we expect.
            cache.cacheData(fakeHandler, "OPTIONS1", "DATA");
            cache.cacheError(fakeHandler, "OPTIONS2", new Error("OH NO!"));

            // Act
            const result = cache.cloneCachedData();

            // Assert
            expect(internalCache.cloneData).toHaveBeenCalled();
            expect(result).toBe("CLONE!");
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
