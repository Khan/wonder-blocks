import {SerializableInMemoryCache} from "../serializable-in-memory-cache";

describe("SerializableInMemoryCache", () => {
    describe("#constructor", () => {
        it("should clone the passed source data", () => {
            // Arrange
            const sourceData = {
                scope: {
                    key: "value",
                },
            };

            // Act
            const cache = new SerializableInMemoryCache(sourceData);
            // Try to mutate the cache.
            sourceData["scope"] = {key: "SOME_NEW_DATA"};
            const result = cache.get("scope", "key");

            // Assert
            expect(result).toStrictEqual("value");
        });

        it("should throw if the cloning fails", () => {
            // Arrange
            const WSCore = require("@khanacademy/wonder-stuff-core");
            jest.spyOn(WSCore, "clone").mockImplementationOnce(() => {
                throw new Error("BANG!");
            });

            // Act
            const underTest = () =>
                new SerializableInMemoryCache({
                    scope: {
                        BAD: "FOOD",
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize from a response cache snapshot: Error: BANG!"`,
            );
        });
    });

    describe("#set", () => {
        it.each`
            id
            ${null}
            ${""}
            ${5}
            ${() => "BOO"}
        `("should throw if the id is $id", ({id}: any) => {
            // Arrange
            const cache = new SerializableInMemoryCache();

            // Act
            const underTest = () => cache.set("scope", id, "value");

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        it.each`
            scope
            ${null}
            ${""}
            ${5}
            ${() => "BOO"}
        `("should throw if the scope is $scope", ({scope}: any) => {
            // Arrange
            const cache = new SerializableInMemoryCache();

            // Act
            const underTest = () => cache.set(scope, "key", "value");

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        it("should throw if the value is a function", () => {
            // Arrange
            const cache = new SerializableInMemoryCache();

            // Act
            const underTest = () => cache.set("scope", "key", () => "value");

            // Assert
            expect(underTest).toThrowErrorMatchingSnapshot();
        });

        it("should store the entry in the cache", () => {
            // Arrange
            const cache = new SerializableInMemoryCache();

            // Act
            cache.set("scope", "key", "data");
            const result = cache.get("scope", "key");

            // Assert
            expect(result).toStrictEqual("data");
        });

        it("should replace the entry in the cache", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope: {
                    key: "data",
                },
            });

            // Act
            cache.set("scope", "key", "other_data");
            const result = cache.get("scope", "key");

            // Assert
            expect(result).toStrictEqual("other_data");
        });
    });

    describe("#retrieve", () => {
        it("should return null if the scope is not cached", () => {
            // Arrange
            const cache = new SerializableInMemoryCache();

            // Act
            const result = cache.get("scope", "key");

            // Assert
            expect(result).toBeNull();
        });

        it("should return null if the value is not in the cache scope", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope: {
                    key1: "data",
                },
            });

            // Act
            const result = cache.get("scope", "key2");

            // Assert
            expect(result).toBeNull();
        });

        it("should return the entry if it exists", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope: {key: "value"},
            });

            // Act
            const result = cache.get("scope", "key");

            // Assert
            expect(result).toStrictEqual("value");
        });
    });

    describe("#purge", () => {
        it("should remove the entry", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {
                    key1: "data1",
                    key2: "data2",
                },
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });

            // Act
            cache.purge("scope1", "key2");
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({
                scope1: {
                    key1: "data1",
                },
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });
        });

        it("should remove the entire scope if the purged item is the last item in the scope", () => {
            const cache = new SerializableInMemoryCache({
                scope1: {
                    key2: "data2",
                },
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });

            // Act
            cache.purge("scope1", "key2");
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });
        });
    });

    describe("#purgeScope", () => {
        it("should remove matching entries only", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {
                    key1: "a",
                    key2: "b",
                    key3: "a",
                },
                scope2: {
                    key1: "a",
                    key2: "b",
                    key3: "a",
                },
            });

            // Act
            cache.purgeScope("scope1", (id: any, value: any) => value === "a");
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({
                scope1: {
                    key2: "b",
                },
                scope2: {
                    key1: "a",
                    key2: "b",
                    key3: "a",
                },
            });
        });

        it("should remove the entire scope when there is no predicate", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {
                    key1: "data1",
                    key2: "data2",
                },
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });

            // Act
            cache.purgeScope("scope1");
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({
                scope2: {
                    key1: "data1",
                    key2: "data2",
                },
            });
        });

        it("should not throw if the scope does not exist", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {
                    key1: "data1",
                },
            });

            // Act
            const act = () => cache.purgeScope("scope2");

            // Arrange
            expect(act).not.toThrow();
        });
    });

    describe("#purgeAll", () => {
        it("should remove matching entries only", () => {
            const cache = new SerializableInMemoryCache({
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            });

            // Act
            cache.purgeAll((scope: any, id: any, value: any) => value === "2");
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({
                scope2: {key: "1"},
            });
        });

        it("should remove the all items if there is no predicate", () => {
            const cache = new SerializableInMemoryCache({
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            });

            // Act
            cache.purgeAll();
            const result = cache.clone();

            // Assert
            expect(result).toStrictEqual({});
        });
    });

    describe("#clone", () => {
        it("should return a copy of the cache data", () => {
            // Arrange
            const data = {
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            } as const;
            const cache = new SerializableInMemoryCache(data);

            // Act
            const result = cache.clone();

            // Assert
            expect(result).not.toBe(data);
        });

        it("should throw if there is an error during cloning", () => {
            // Arrange
            const WSCore = require("@khanacademy/wonder-stuff-core");
            const cache = new SerializableInMemoryCache({
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            });
            jest.spyOn(WSCore, "clone").mockImplementationOnce(() => {
                throw new Error("BANG!");
            });

            // Act
            const act = () => cache.clone();

            // Assert
            expect(act).toThrowErrorMatchingInlineSnapshot(`
                "An error occurred while trying to clone the cache
                	caused by
                		Error: BANG!"
            `);
        });
    });

    describe("@inUse", () => {
        it("should return true if the cache contains data", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            });

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeTruthy();
        });

        it("should return false if the cache is empty", () => {
            // Arrange
            const cache = new SerializableInMemoryCache({
                scope1: {key: "2"},
                scope2: {key: "1"},
                scope3: {key: "2"},
            });
            cache.purgeAll();

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeFalsy();
        });
    });
});
