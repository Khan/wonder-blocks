// @flow
import MemoryCache from "../memory-cache.js";

describe("MemoryCache", () => {
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
        it("should throw if the cloning fails", () => {
            // Arrange
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () =>
                new MemoryCache({
                    BAD: {data: "FOOD"},
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize from a response cache snapshot: Error: BANG!"`,
            );
        });

        it("should deep clone the passed source data", () => {
            // Arrange
            const sourceData = {
                MY_KEY: {data: "THE_DATA"},
            };

            // Act
            const cache = new MemoryCache(sourceData);
            // Try to mutate the cache.
            sourceData["MY_KEY"] = {data: "SOME_NEW_DATA"};
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });
    });

    describe("#store", () => {
        it("should store the entry in the cache", () => {
            // Arrange
            const cache = new MemoryCache();

            // Act
            cache.store<string, string>("MY_KEY", {data: "data"});
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "data"});
        });

        it("should replace the entry in the handler subcache", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {error: "Oh no!"},
            });

            // Act
            cache.store<string, string>("MY_KEY", {
                data: "other_data",
            });
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "other_data"});
        });
    });

    describe("#retrieve", () => {
        it("should return null if the handler subcache is absent", () => {
            // Arrange
            const cache = new MemoryCache();

            // Act
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toBeNull();
        });

        it("should return null if the request key is absent from the subcache", () => {
            // Arrange
            const cache = new MemoryCache({
                SOME_OTHER_KEY: {data: "data we don't want"},
            });

            // Act
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toBeNull();
        });

        it("should return the entry if it exists", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });

            // Act
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toStrictEqual({data: "data!"});
        });
    });

    describe("#remove", () => {
        it("should return false if item does not exist", () => {
            // Arrange
            const cache = new MemoryCache();

            // Act
            const result = cache.remove("MY_KEY");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return true if the entry was removed", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });

            // Act
            const result = cache.remove("MY_KEY");

            // Assert
            expect(result).toBeTruthy();
        });

        it("should remove the entry", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });

            // Act
            cache.remove("MY_KEY");
            const result = cache.retrieve("MY_KEY");

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("#removeAll", () => {
        it("should return 0 if there are no items in the cache", () => {
            // Arrange
            const cache = new MemoryCache();

            // Act
            const result = cache.removeAll();

            // Assert
            expect(result).toBe(0);
        });

        it("should remove matching entries from cache", () => {
            const cache = new MemoryCache({
                MY_KEY: {data: "2"},
                MY_KEY2: {data: "1"},
                MY_KEY3: {data: "2"},
            });

            // Act
            cache.removeAll((k, d) => d.data === "2");
            const result = cache.cloneData();

            // Assert
            expect(result).toStrictEqual({
                MY_KEY2: {data: "1"},
            });
        });

        it("should return the number of items that matched the predicate and were removed", () => {
            const cache = new MemoryCache({
                MY_KEY: {data: "a"},
                MY_KEY2: {data: "b"},
                MY_KEY3: {data: "a"},
            });

            // Act
            const result = cache.removeAll((k, d) => d.data === "a");

            // Assert
            expect(result).toBe(2);
        });

        it("should remove the all items if there is no predicate", () => {
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
                MY_KEY2: {data: "data!"},
                MY_KEY3: {data: "data!"},
            });

            // Act
            cache.removeAll();
            const result = cache.cloneData();

            // Assert
            expect(result).toStrictEqual({});
        });

        it("should return the number of items that were in the cache if there was no predicate", () => {
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
                MY_KEY2: {data: "data!"},
                MY_KEY3: {data: "data!"},
            });

            // Act
            const result = cache.removeAll();

            // Assert
            expect(result).toBe(3);
        });
    });

    describe("#cloneData", () => {
        it("should return a copy of the cache data", () => {
            // Arrange
            const data = {
                MY_KEY: {data: "data!"},
            };
            const cache = new MemoryCache(data);

            // Act
            const result = cache.cloneData();

            // Assert
            expect(result).not.toBe(data);
        });

        it("should throw if there is an error during cloning", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("BANG!");
            });

            // Act
            const act = () => cache.cloneData();

            // Assert
            expect(act).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred while trying to clone the cache: Error: BANG!"`,
            );
        });
    });

    describe("@inUse", () => {
        it("should return true if the cache contains data", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeTruthy();
        });

        it("should return false if the cache is empty", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_KEY: {data: "data!"},
            });
            cache.removeAll();

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeFalsy();
        });
    });
});
