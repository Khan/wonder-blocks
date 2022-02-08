// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {ResponseCache} from "../response-cache.js";
import MemoryCache from "../memory-cache.js";

describe("../response-cache.js", () => {
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

    describe("@Default", () => {
        it("should return an instance of ResponseCache", () => {
            // Arrange

            // Act
            const result = ResponseCache.Default;

            // Assert
            expect(result).toBeInstanceOf(ResponseCache);
        });

        it("should return the same instance on each call", () => {
            // Arrange

            // Act
            const result1 = ResponseCache.Default;
            const result2 = ResponseCache.Default;

            // Assert
            expect(result1).toBe(result2);
        });
    });

    describe("#initialize", () => {
        it("should initialize the cache with the given data", () => {
            // Arrange
            const cache = new ResponseCache();

            // Act
            cache.initialize({
                MY_KEY: {data: "THE_DATA"},
            });
            const result = cache.getEntry("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });

        it("should throw if the cache is already intialized", () => {
            // Arrange
            const internalCache = new MemoryCache({
                MY_KEY: {data: "THE_DATA"},
            });
            const cache = new ResponseCache(internalCache);

            // Act
            const underTest = () =>
                cache.initialize({
                    MY_OTHER_KEY: {data: "MORE_DATA"},
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
            const sourceData = {
                MY_KEY: {data: "THE_DATA"},
            };

            // Act
            cache.initialize(sourceData);
            // Try to mutate the cache.
            sourceData["MY_KEY"] = {data: "SOME_NEW_DATA"};
            const result = cache.getEntry("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });
    });

    describe("#cacheData", () => {
        describe("when client-side", () => {
            it("should not store the entry in the hydration cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const cache = new ResponseCache(hydrationCache);
                const hydrationStoreSpy = jest.spyOn(hydrationCache, "store");

                // Act
                cache.cacheData("MY_KEY", "data", true);

                // Assert
                expect(hydrationStoreSpy).not.toHaveBeenCalled();
            });

            it("should not store the entry in the ssrOnly cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);
                const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                // Act
                cache.cacheData("MY_KEY", "data", false);

                // Assert
                expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
            });
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            describe("when hydrate is true", () => {
                it("should store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const cache = new ResponseCache(hydrationCache);
                    const hydrationStoreSpy = jest.spyOn(
                        hydrationCache,
                        "store",
                    );

                    // Act
                    cache.cacheData("MY_KEY", "data", true);

                    // Assert
                    expect(hydrationStoreSpy).toHaveBeenCalledWith("MY_KEY", {
                        data: "data",
                    });
                });

                it("should not store the entry in the ssrOnly cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                    // Act
                    cache.cacheData("MY_KEY", "data", true);

                    // Assert
                    expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
                });
            });

            describe("when hydrate is false", () => {
                it("should store the entry in the ssr-only cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                    // Act
                    cache.cacheData("MY_KEY", "data", false);

                    // Assert
                    expect(ssrOnlyStoreSpy).toHaveBeenCalledWith("MY_KEY", {
                        data: "data",
                    });
                });

                it("should not store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const hydrationStoreSpy = jest.spyOn(
                        hydrationCache,
                        "store",
                    );

                    // Act
                    cache.cacheData("MY_KEY", "data", false);

                    // Assert
                    expect(hydrationStoreSpy).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("#cacheError", () => {
        describe("when client-side", () => {
            it("should not store the entry in the hydration cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const cache = new ResponseCache(hydrationCache);
                const hydrationStoreSpy = jest.spyOn(hydrationCache, "store");

                // Act
                cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                // Assert
                expect(hydrationStoreSpy).not.toHaveBeenCalled();
            });

            it("should not store the entry in the ssrOnly cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);
                const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                // Act
                cache.cacheError("MY_KEY", "Ooops!", false);

                // Assert
                expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
            });
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            describe("when hydrate is true", () => {
                it("should store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const cache = new ResponseCache(hydrationCache);
                    const hydrationStoreSpy = jest.spyOn(
                        hydrationCache,
                        "store",
                    );

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                    // Assert
                    expect(hydrationStoreSpy).toHaveBeenCalledWith("MY_KEY", {
                        error: "Ooops!",
                    });
                });

                it("should not store the entry in the ssrOnly cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                    // Assert
                    expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
                });
            });

            describe("when hydrate is false", () => {
                it("should store the entry in the ssr-only cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "store");

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), false);

                    // Assert
                    expect(ssrOnlyStoreSpy).toHaveBeenCalledWith("MY_KEY", {
                        error: "Ooops!",
                    });
                });

                it("should not store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new MemoryCache();
                    const ssrOnlyCache = new MemoryCache();
                    const cache = new ResponseCache(
                        hydrationCache,
                        ssrOnlyCache,
                    );
                    const hydrationStoreSpy = jest.spyOn(
                        hydrationCache,
                        "store",
                    );

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), false);

                    // Assert
                    expect(hydrationStoreSpy).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("#getEntry", () => {
        describe("when client-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
            });

            it("should return null if not in the hydration cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                jest.spyOn(hydrationCache, "retrieve").mockReturnValue(null);
                const cache = new ResponseCache(hydrationCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toBeNull();
            });

            it("should return the cached entry if in the hydration cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                jest.spyOn(hydrationCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                const cache = new ResponseCache(hydrationCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            it("should return null in any cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toBeNull();
            });

            it("should return the cached entry if in the hydration cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                jest.spyOn(hydrationCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                const cache = new ResponseCache(hydrationCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });

            it("should return the cached entry if in the ssr-only cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                jest.spyOn(ssrOnlyCache, "retrieve").mockReturnValue({
                    data: "data!",
                });
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });
        });
    });

    describe("#remove", () => {
        it("should return false if nothing was removed", () => {
            // Arrange
            const hydrationCache = new MemoryCache();
            const ssrOnlycache = new MemoryCache();
            jest.spyOn(hydrationCache, "remove").mockReturnValue(false);
            jest.spyOn(ssrOnlycache, "remove").mockReturnValue(false);
            const cache = new ResponseCache(hydrationCache, ssrOnlycache);

            // Act
            const result = cache.remove("A");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return true if something was removed from hydration cache", () => {
            // Arrange
            const hydrationCache = new MemoryCache();
            jest.spyOn(hydrationCache, "remove").mockReturnValue(true);
            const cache = new ResponseCache(hydrationCache);

            // Act
            const result = cache.remove("A");

            // Assert
            expect(result).toBeTruthy();
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            it("should return true if something was removed from ssr-only cache", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                jest.spyOn(ssrOnlyCache, "remove").mockReturnValue(true);
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.remove("A");

                // Assert
                expect(result).toBeTruthy();
            });
        });
    });

    describe("#removeAll", () => {
        it("should return total number of entries removed from hydration cache", () => {
            // Arrange
            const hydrationCache = new MemoryCache();
            jest.spyOn(hydrationCache, "removeAll").mockReturnValue(1);
            const cache = new ResponseCache(hydrationCache);

            // Act
            const result = cache.removeAll();

            // Assert
            expect(result).toBe(1);
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            it("should return total number of entries removed both caches", () => {
                // Arrange
                const hydrationCache = new MemoryCache();
                const ssrOnlyCache = new MemoryCache();
                jest.spyOn(hydrationCache, "removeAll").mockReturnValue(13);
                jest.spyOn(ssrOnlyCache, "removeAll").mockReturnValue(42);
                const cache = new ResponseCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.removeAll();

                // Assert
                expect(result).toBe(55);
            });
        });
    });

    describe("#cloneHydratableData", () => {
        it("should clone the hydration cache", () => {
            // Arrange
            const hydrationCache = new MemoryCache();
            const cloneSpy = jest
                .spyOn(hydrationCache, "cloneData")
                .mockReturnValue("CLONE!");
            const cache = new ResponseCache(hydrationCache);
            // Let's add to the initialized state to check that everything
            // is cloning as we expect.
            cache.cacheData("KEY1", "DATA", true);
            cache.cacheError("KEY2", new Error("OH NO!"), true);

            // Act
            const result = cache.cloneHydratableData();

            // Assert
            expect(cloneSpy).toHaveBeenCalled();
            expect(result).toBe("CLONE!");
        });

        it("should throw if the cloning fails", () => {
            // Arrange
            const cache = new ResponseCache();
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () => cache.cloneHydratableData();

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred while trying to clone the cache: Error: BANG!"`,
            );
        });
    });
});
