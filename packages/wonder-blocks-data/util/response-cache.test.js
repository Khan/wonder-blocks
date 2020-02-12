// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
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
        describe("no custom cache", () => {
            it("should add the entry to the cache", () => {
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
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                cache.cacheData(fakeHandler, "options", "other_data");
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toStrictEqual({data: "other_data"});
            });
        });

        describe("with custom cache", () => {
            it("SSR should use the framework cache, not the custom cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
                const cache = new ResponseCache();
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
                /**
                 * We want to bypass the custom stuff and grab from the real
                 * storage so we can validate without side-effects.
                 *
                 * TODO(somewhatabstract): Isolate framework cache.
                 * We should probably isolate the framework cache itself better
                 * to fix this.
                 */
                const result = cache._cache["MY_HANDLER"]["MY_KEY"];

                // Assert
                expect(customCache.store).not.toHaveBeenCalled();
                expect(result).toStrictEqual({data: "data"});
            });

            it("CSR should use the custom cache, not the framework cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const cache = new ResponseCache();
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
                /**
                 * We want to bypass the custom stuff and grab from the real
                 * storage so we can validate without side-effects.
                 *
                 * TODO(somewhatabstract): Isolate framework cache.
                 * We should probably isolate the framework cache itself better
                 * to fix this.
                 */
                const result = cache._cache["MY_HANDLER"];

                // Assert
                expect(customCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {data: "data"},
                );
                expect(result).toBeUndefined();
            });
        });
    });

    describe("#cacheError", () => {
        describe("no custom cache", () => {
            it("should add the entry to the cache", () => {
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
                    shouldRefreshCache: () => false,
                    fulfillRequest: jest.fn(),
                    cache: null,
                };

                // Act
                cache.cacheError(fakeHandler, "options", new Error("Oh no!"));
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toStrictEqual({error: "Oh no!"});
            });
        });

        describe("with custom cache", () => {
            it("SSR should use the framework cache, not the custom cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(true);
                const cache = new ResponseCache();
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
                /**
                 * We want to bypass the custom stuff and grab from the real
                 * storage so we can validate without side-effects.
                 *
                 * TODO(somewhatabstract): Isolate framework cache.
                 * We should probably isolate the framework cache itself better
                 * to fix this.
                 */
                const result = cache._cache["MY_HANDLER"]["MY_KEY"];

                // Assert
                expect(result).toStrictEqual({error: "Ooops!"});
                expect(customCache.store).not.toHaveBeenCalled();
            });

            it("CSR should use the custom cache, not the framework cache", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const cache = new ResponseCache();
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
                /**
                 * We want to bypass the custom stuff and grab from the real
                 * storage so we can validate without side-effects.
                 *
                 * TODO(somewhatabstract): Isolate framework cache.
                 * We should probably isolate the framework cache itself better
                 * to fix this.
                 */
                const result = cache._cache["MY_HANDLER"];

                // Assert
                expect(customCache.store).toHaveBeenCalledWith(
                    fakeHandler,
                    "options",
                    {error: "Ooops!"},
                );
                expect(result).toBeUndefined();
            });
        });
    });

    describe("#getEntry", () => {
        describe("no custom cache", () => {
            it("should return null if the handler subcache is absent", () => {
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
                const cache = new ResponseCache({
                    MY_HANDLER: {
                        MY_KEY: {data: "data!"},
                    },
                });
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
                const cache = new ResponseCache({
                    MY_HANDLER: {
                        MY_KEY: {data: "data!"},
                    },
                });
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
                expect(customCache.retrieve).not.toHaveBeenCalled();
            });

            it("CSR should return custom cached entry", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const cache = new ResponseCache({
                    MY_HANDLER: {
                        MY_KEY: {data: "data!"},
                    },
                });
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
                const result = cache.getEntry(fakeHandler, "options");

                // Assert
                expect(result).toStrictEqual({data: "custom data!"});
            });

            it("CSR should store framework entry in custom cache when custom cache misses", () => {
                // Arrange
                jest.spyOn(Server, "isServerSide").mockReturnValue(false);
                const cache = new ResponseCache({
                    MY_HANDLER: {
                        MY_KEY: {data: "data!"},
                    },
                });
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
                const cache = new ResponseCache({
                    MY_HANDLER: {
                        MY_KEY: {data: "data!"},
                    },
                });
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
                // TODO(somewhatabstract): Abstract away need to poke insides
                expect(cache._cache["MY_HANDLER"]["MY_KEY"]).toBeUndefined();
            });
        });
    });

    describe("#remove", () => {
        it("should return false if nothing was removed", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_OTHER_KEY: {data: "data!"},
                },
            });
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
            const result = cache.remove(fakeHandler, "optionsA");

            // Assert
            expect(result).toBeFalsy();
        });

        it("should return true if something was removed from framework cache", () => {
            // Arrange
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
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
            const result = cache.remove(fakeHandler, "optionsA");

            // Assert
            expect(result).toBeTruthy();
        });

        it("should return true if something was removed from custom cache", () => {
            // Arrange
            const cache = new ResponseCache();
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

        it("SSR should not call custom cache", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_OTHER_KEY: {data: "data!"},
                },
            });
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
        });
    });

    describe("#removeAll", () => {
        it("CSR should call removeAll on custom cache", () => {
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
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
        });

        it("should remove matching entries from handler subcache", () => {
            const cache = new ResponseCache({
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
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
            };

            // Act
            const result = cache.removeAll(
                fakeHandler,
                (k, d) => d.data === "2",
            );
            const after = cache.cloneCachedData();

            // Assert
            expect(result).toBe(2);
            expect(after).toStrictEqual({
                MY_HANDLER: {
                    MY_KEY2: {data: "1"},
                },
                OTHER_HANDLER: {
                    MY_KEY: {data: "1"},
                },
            });
        });

        it("should remove all entries from handler subcache if no predicate", () => {
            const cache = new ResponseCache({
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
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
            };

            // Act
            const result = cache.removeAll(fakeHandler);
            const after = cache.cloneCachedData();

            // Assert
            expect(result).toBe(3);
            expect(after).toStrictEqual({
                MY_HANDLER: {},
                OTHER_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
        });

        it("should return total number of entries removed", () => {
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_KEY: {data: "data!"},
                },
            });
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

        it("SSR should not call custom cache", () => {
            // Arrange
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
            const cache = new ResponseCache({
                MY_HANDLER: {
                    MY_OTHER_KEY: {data: "data!"},
                },
            });
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
        });
    });

    describe("#cloneCachedData", () => {
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
