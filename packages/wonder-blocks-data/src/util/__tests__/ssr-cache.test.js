// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {SsrCache} from "../ssr-cache.js";
import {SerializableInMemoryCache} from "../serializable-in-memory-cache.js";

describe("../ssr-cache.js", () => {
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

    describe("#constructor", () => {
        it("should default the ssr-only cache to a cache instance", () => {
            // Arrange

            // Act
            const cache = new SsrCache();

            // Assert
            expect(cache._ssrOnlyCache).toBeInstanceOf(
                SerializableInMemoryCache,
            );
        });

        it("should set the hydration cache to the passed instance if there is one", () => {
            // Arrange
            const passedInstance = new SerializableInMemoryCache();

            // Act
            const cache = new SsrCache(null, passedInstance);

            // Assert
            expect(cache._ssrOnlyCache).toBe(passedInstance);
        });

        it("should default the hydration cache to a cache instance", () => {
            // Arrange

            // Act
            const cache = new SsrCache();

            // Assert
            expect(cache._hydrationCache).toBeInstanceOf(
                SerializableInMemoryCache,
            );
        });

        it("should set the hydration cache to the passed instance if there is one", () => {
            // Arrange
            const passedInstance = new SerializableInMemoryCache();

            // Act
            const cache = new SsrCache(passedInstance);

            // Assert
            expect(cache._hydrationCache).toBe(passedInstance);
        });
    });

    describe("@Default", () => {
        it("should return an instance of SsrCache", () => {
            // Arrange

            // Act
            const result = SsrCache.Default;

            // Assert
            expect(result).toBeInstanceOf(SsrCache);
        });

        it("should return the same instance on each call", () => {
            // Arrange

            // Act
            const result1 = SsrCache.Default;
            const result2 = SsrCache.Default;

            // Assert
            expect(result1).toBe(result2);
        });
    });

    describe("#initialize", () => {
        it("should initialize the cache with the given data", () => {
            // Arrange
            const cache = new SsrCache();

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
            const internalCache = new SerializableInMemoryCache({
                MY_KEY: {data: "THE_DATA"},
            });
            const cache = new SsrCache(internalCache);

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

        it("should deep clone the cached data", () => {
            // Arrange
            const cache = new SsrCache();
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
                const hydrationCache = new SerializableInMemoryCache();
                const cache = new SsrCache(hydrationCache);
                const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

                // Act
                cache.cacheData("MY_KEY", "data", true);

                // Assert
                expect(hydrationStoreSpy).not.toHaveBeenCalled();
            });

            it("should not store the entry in the ssrOnly cache", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const ssrOnlyCache = new SerializableInMemoryCache();
                const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

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
                    const hydrationCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache);
                    const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

                    // Act
                    cache.cacheData("MY_KEY", "data", true);

                    // Assert
                    expect(hydrationStoreSpy).toHaveBeenCalledWith(
                        "default",
                        "MY_KEY",
                        {
                            data: "data",
                        },
                    );
                });

                it("should not store the entry in the ssrOnly cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

                    // Act
                    cache.cacheData("MY_KEY", "data", true);

                    // Assert
                    expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
                });
            });

            describe("when hydrate is false", () => {
                it("should store the entry in the ssr-only cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

                    // Act
                    cache.cacheData("MY_KEY", "data", false);

                    // Assert
                    expect(ssrOnlyStoreSpy).toHaveBeenCalledWith(
                        "default",
                        "MY_KEY",
                        {
                            data: "data",
                        },
                    );
                });

                it("should not store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

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
                const hydrationCache = new SerializableInMemoryCache();
                const cache = new SsrCache(hydrationCache);
                const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

                // Act
                cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                // Assert
                expect(hydrationStoreSpy).not.toHaveBeenCalled();
            });

            it("should not store the entry in the ssrOnly cache", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const ssrOnlyCache = new SerializableInMemoryCache();
                const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

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
                    const hydrationCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache);
                    const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                    // Assert
                    expect(hydrationStoreSpy).toHaveBeenCalledWith(
                        "default",
                        "MY_KEY",
                        {
                            error: "Ooops!",
                        },
                    );
                });

                it("should not store the entry in the ssrOnly cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), true);

                    // Assert
                    expect(ssrOnlyStoreSpy).not.toHaveBeenCalled();
                });
            });

            describe("when hydrate is false", () => {
                it("should store the entry in the ssr-only cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const ssrOnlyStoreSpy = jest.spyOn(ssrOnlyCache, "set");

                    // Act
                    cache.cacheError("MY_KEY", new Error("Ooops!"), false);

                    // Assert
                    expect(ssrOnlyStoreSpy).toHaveBeenCalledWith(
                        "default",
                        "MY_KEY",
                        {
                            error: "Ooops!",
                        },
                    );
                });

                it("should not store the entry in the hydration cache", () => {
                    // Arrange
                    const hydrationCache = new SerializableInMemoryCache();
                    const ssrOnlyCache = new SerializableInMemoryCache();
                    const cache = new SsrCache(hydrationCache, ssrOnlyCache);
                    const hydrationStoreSpy = jest.spyOn(hydrationCache, "set");

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
                const hydrationCache = new SerializableInMemoryCache();
                jest.spyOn(hydrationCache, "get").mockReturnValue(null);
                const cache = new SsrCache(hydrationCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toBeNull();
            });

            it("should return the cached entry if in the hydration cache", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                jest.spyOn(hydrationCache, "get").mockReturnValue({
                    data: "data!",
                });
                const cache = new SsrCache(hydrationCache);

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
                const hydrationCache = new SerializableInMemoryCache();
                const ssrOnlyCache = new SerializableInMemoryCache();
                const cache = new SsrCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toBeNull();
            });

            it("should return the cached entry if in the hydration cache", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                jest.spyOn(hydrationCache, "get").mockReturnValue({
                    data: "data!",
                });
                const cache = new SsrCache(hydrationCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });

            it("should return the cached entry if in the ssr-only cache", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const ssrOnlyCache = new SerializableInMemoryCache();
                jest.spyOn(ssrOnlyCache, "get").mockReturnValue({
                    data: "data!",
                });
                const cache = new SsrCache(hydrationCache, ssrOnlyCache);

                // Act
                const result = cache.getEntry("MY_KEY");

                // Assert
                expect(result).toStrictEqual({data: "data!"});
            });
        });
    });

    describe("#cloneHydratableData", () => {
        it("should clone the hydration cache", () => {
            // Arrange
            const hydrationCache = new SerializableInMemoryCache();
            const cloneSpy = jest
                .spyOn(hydrationCache, "clone")
                .mockReturnValue({
                    default: "CLONE!",
                });
            const cache = new SsrCache(hydrationCache);
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
    });

    describe("#purgeData", () => {
        describe("when client-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
            });

            it("should remove all entries from the hydration cache when client-side without predicate", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const purgeAllSpy = jest.spyOn(hydrationCache, "purgeAll");
                const cache = new SsrCache(hydrationCache);

                // Act
                cache.purgeData();

                // Assert
                expect(purgeAllSpy).toHaveBeenCalledWith(undefined);
            });

            it("should pass a predicate to hydration cache purge if a predicate is passed", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const purgeAllSpy = jest.spyOn(hydrationCache, "purgeAll");
                const cache = new SsrCache(
                    hydrationCache,
                    new SerializableInMemoryCache(),
                );

                // Act
                cache.purgeData(() => true);

                // Assert
                expect(purgeAllSpy).toHaveBeenCalledWith(expect.any(Function));
            });

            it("should pass a predicate to the hydration cache that calls the predicate it was given", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache({
                    default: {
                        KEY1: {
                            data: "DATA",
                        },
                    },
                });
                const cache = new SsrCache(
                    hydrationCache,
                    new SerializableInMemoryCache(),
                );
                const predicate = jest.fn().mockReturnValue(false);

                // Act
                cache.purgeData(predicate);

                // Assert
                expect(predicate).toHaveBeenCalledWith("KEY1", {data: "DATA"});
            });
        });

        describe("when server-side", () => {
            beforeEach(() => {
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            });

            it("should remove all entries from hydration cache when server-side without predicate", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const hydrationPurgeAllSpy = jest.spyOn(
                    hydrationCache,
                    "purgeAll",
                );
                const cache = new SsrCache(
                    hydrationCache,
                    new SerializableInMemoryCache(),
                );

                // Act
                cache.purgeData();

                // Assert
                expect(hydrationPurgeAllSpy).toHaveBeenCalledWith(undefined);
            });

            it("should remove all entries from ssr cache when server-side without predicate", () => {
                // Arrange
                const ssrOnlyCache = new SerializableInMemoryCache();
                const ssrPurgeAllSpy = jest.spyOn(ssrOnlyCache, "purgeAll");
                const cache = new SsrCache(
                    new SerializableInMemoryCache(),
                    ssrOnlyCache,
                );

                // Act
                cache.purgeData();

                // Assert
                expect(ssrPurgeAllSpy).toHaveBeenCalledWith(undefined);
            });

            it("should pass a predicate to hydration cache purge if a predicate is passed", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const purgeAllSpy = jest.spyOn(hydrationCache, "purgeAll");
                const cache = new SsrCache(
                    hydrationCache,
                    new SerializableInMemoryCache(),
                );

                // Act
                cache.purgeData(() => true);

                // Assert
                expect(purgeAllSpy).toHaveBeenCalledWith(expect.any(Function));
            });

            it("should pass a predicate to srr cache purge if a predicate is passed", () => {
                // Arrange
                const ssrOnlyCache = new SerializableInMemoryCache();
                const purgeAllSpy = jest.spyOn(ssrOnlyCache, "purgeAll");
                const cache = new SsrCache(
                    new SerializableInMemoryCache(),
                    ssrOnlyCache,
                );

                // Act
                cache.purgeData(() => true);

                // Assert
                expect(purgeAllSpy).toHaveBeenCalledWith(expect.any(Function));
            });

            it("should pass a predicate to the hydration cache that calls the predicate it was given", () => {
                // Arrange
                const hydrationCache = new SerializableInMemoryCache();
                const cache = new SsrCache(
                    hydrationCache,
                    new SerializableInMemoryCache(),
                );
                cache.cacheData("KEY1", "DATA", true);
                const predicate = jest.fn().mockReturnValue(false);

                // Act
                cache.purgeData(predicate);

                // Assert
                expect(predicate).toHaveBeenCalledWith("KEY1", {data: "DATA"});
            });

            it("should pass a predicate to the ssr cache that calls the predicate it was given", () => {
                // Arrange
                const ssrOnlyCache = new SerializableInMemoryCache();
                const cache = new SsrCache(
                    new SerializableInMemoryCache(),
                    ssrOnlyCache,
                );
                cache.cacheData(
                    "KEY1",
                    "DATA",
                    false /*false so that the data goes into the ssr only cache*/,
                );
                const predicate = jest.fn().mockReturnValue(false);

                // Act
                cache.purgeData(predicate);

                // Assert
                expect(predicate).toHaveBeenCalledWith("KEY1", {data: "DATA"});
            });
        });
    });
});
