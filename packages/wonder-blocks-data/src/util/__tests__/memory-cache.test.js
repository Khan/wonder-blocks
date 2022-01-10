// @flow
import MemoryCache from "../memory-cache.js";

import type {IRequestHandler} from "../types.js";

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
                    BAD: {
                        BAD: {data: "FOOD"},
                    },
                });

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"An error occurred trying to initialize from a response cache snapshot: Error: BANG!"`,
            );
        });

        it("should deep clone the passed source data", () => {
            // Arrange
            const sourceData = {
                MY_HANDLER: {
                    MY_KEY: {data: "THE_DATA"},
                },
            };
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const cache = new MemoryCache(sourceData);
            // Try to mutate the cache.
            sourceData["MY_HANDLER"]["MY_KEY"] = {data: "SOME_NEW_DATA"};
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "THE_DATA"});
        });
    });

    describe("#store", () => {
        it("should store the entry in the cache", () => {
            // Arrange
            const cache = new MemoryCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            cache.store<string, string>(fakeHandler, "options", {data: "data"});
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "data"});
        });

        it("should replace the entry in the handler subcache", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {error: "Oh no!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            cache.store<string, string>(fakeHandler, "options", {
                data: "other_data",
            });
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "other_data"});
        });
    });

    describe("#retrieve", () => {
        it("should return null if the handler subcache is absent", () => {
            // Arrange
            const cache = new MemoryCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });

        it("should return null if the request key is absent from the subcache", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    SOME_OTHER_KEY: {data: "data we don't want"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });

        it("should return the entry if it exists", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toStrictEqual({data: "data!"});
        });
    });

    describe("#remove", () => {
        it("should return false if the handler subcache does not exist", () => {
            // Arrange
            const cache = new MemoryCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.remove(fakeHandler, "options");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return false if the item does not exist in the subcache", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {},
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.remove(fakeHandler, "options");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return true if the entry was removed", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.remove(fakeHandler, "options");

            // Assert
            expect(result).toBeTruthy();
        });

        it("should remove the entry", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            cache.remove(fakeHandler, "options");
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("#removeAll", () => {
        it("should return 0 if the handler subcache is absent", () => {
            // Arrange
            const cache = new MemoryCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.removeAll(fakeHandler);

            // Assert
            expect(result).toBe(0);
        });

        it("should remove matching entries from handler subcache", () => {
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "2"},
                    MY_KEY2: {data: "1"},
                    MY_KEY3: {data: "2"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "1"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            cache.removeAll(fakeHandler, (k, d) => d.data === "2");
            const result = cache.cloneData();

            // Assert
            expect(result).toStrictEqual({
                MY_HANDLER: {
                    MY_KEY2: {data: "1"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "1"},
                },
            });
        });

        it("should return the number of items that matched the predicate and were removed", () => {
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "2"},
                    MY_KEY2: {data: "1"},
                    MY_KEY3: {data: "2"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "1"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.removeAll(
                fakeHandler,
                (k, d) => d.data === "2",
            );

            // Assert
            expect(result).toBe(2);
        });

        it("should remove the entire handler subcache if no predicate", () => {
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                    MY_KEY2: {data: "data!"},
                    MY_KEY3: {data: "data!"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            cache.removeAll(fakeHandler);
            const result = cache.cloneData();

            // Assert
            expect(result).toStrictEqual({
                OTHER_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
        });

        it("should return the number of items that were in the handler subcache if there was no predicate", () => {
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                    MY_KEY2: {data: "data!"},
                    MY_KEY3: {data: "data!"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                fulfillRequest: jest.fn(),
                hydrate: true,
            };

            // Act
            const result = cache.removeAll(fakeHandler);

            // Assert
            expect(result).toBe(3);
        });
    });

    describe("#cloneData", () => {
        it("should return a copy of the cache data", () => {});

        it("should throw if there is an error during cloning", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
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
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeTruthy();
        });

        it("should return false if the cache is empty", () => {
            // Arrange
            const cache = new MemoryCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
            cache.removeAll(
                ({
                    type: "MY_HANDLER",
                }: any),
            );

            // Act
            const result = cache.inUse;

            // Assert
            expect(result).toBeFalsy();
        });
    });
});
