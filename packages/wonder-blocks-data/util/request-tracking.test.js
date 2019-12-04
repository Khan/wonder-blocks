// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import {RequestTracker, TrackerContext} from "./request-tracking.js";
import {ResponseCache} from "./response-cache.js";

import type {IRequestHandler} from "./types.js";

describe("./request-tracking.js", () => {
    describe("TrackerContext", () => {
        afterEach(() => {
            unmountAll();
        });

        it("should default to null", async () => {
            // Arrange

            // Act
            const result = await new Promise((resolve, reject) => {
                mount(
                    <TrackerContext.Consumer>
                        {(fn) => resolve(fn)}
                    </TrackerContext.Consumer>,
                );
            });

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("RequestTracker", () => {
        const createRequestTracker = () =>
            /**
             * We pass our own response cache instance so that the test cases
             * are not sharing the same default instance.
             */
            new RequestTracker(new ResponseCache());

        describe("#trackDataRequest", () => {
            it("should get the key for the request", () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn(),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);

                // Assert
                expect(fakeHandler.getKey).toHaveBeenCalledWith(options);
            });

            it("should throw if encountering an unknown behavior", () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn(),
                    cacheHitBehavior: jest
                        .fn()
                        .mockReturnValue(("made up!": any)),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                const underTest = () =>
                    requestTracker.trackDataRequest(fakeHandler, options);

                // Assert
                expect(underTest).toThrowErrorMatchingInlineSnapshot(
                    `"Invalid behavior: made up!"`,
                );
            });

            it("should track the request and handler", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve("DATA")),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    options,
                );
            });

            it("should not change the cache if the static request already tracked", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options1);
                requestTracker.trackDataRequest(fakeHandler, options2);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledWith(
                    options1,
                );
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(1);
            });

            it("should reuse the existing handler for the handler type from the cache", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const handlerType = "MY_TYPE";
                const fakeHandler1: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn().mockReturnValue("KEY_1"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: handlerType,
                };
                const fakeHandler2: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn().mockReturnValue("KEY_2"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: handlerType,
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are also options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler1, options1);
                requestTracker.trackDataRequest(fakeHandler2, options2);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler1.fulfillRequest).toHaveBeenCalledTimes(2);
                expect(fakeHandler1.fulfillRequest).toHaveBeenCalledWith(
                    options1,
                );
                expect(fakeHandler1.fulfillRequest).toHaveBeenCalledWith(
                    options2,
                );
                expect(fakeHandler2.fulfillRequest).not.toHaveBeenCalled();
            });

            it("should add refresh request, even if already tracked", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("refresh"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                requestTracker.trackDataRequest(fakeHandler, options);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler.fulfillRequest).toHaveBeenCalledTimes(2);
            });
        });

        describe("#fulfillTrackedRequests", () => {
            it("should return an empty cache if no requests tracked", async () => {
                // Arrange
                const requestTracker = createRequestTracker();

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({});
            });

            it("should cache errors caused directly by handlers", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeBadHandler: IRequestHandler<any, any> = {
                    fulfillRequest: () => {
                        throw new Error("OH NO!");
                    },
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                requestTracker.trackDataRequest(fakeBadHandler, "OPTIONS");

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    MY_TYPE: {
                        MY_KEY: {
                            error: "OH NO!",
                        },
                    },
                });
            });

            it("should cache errors occurring in promises", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeBadRequestHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () =>
                        new Promise((resolve, reject) => reject("OH NO!")),
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "BAD_REQUEST",
                };
                requestTracker.trackDataRequest(
                    fakeBadRequestHandler,
                    "OPTIONS1",
                );
                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    BAD_REQUEST: {
                        OPTIONS1: {
                            error: "OH NO!",
                        },
                    },
                });
            });

            it("should cache data and errors for all requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeBadRequestHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () =>
                        new Promise((resolve, reject) => reject("OH NO!")),
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "BAD_REQUEST",
                };
                const fakeBadHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () => {
                        throw new Error("OH NO!");
                    },
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "BAD_HANDLER",
                };
                const fakeRefreshHandler: IRequestHandler<string, any> = {
                    fulfillRequest: (() => {
                        let counter = 0;
                        return (o) => {
                            counter++;
                            return Promise.resolve(`DATA:${counter}`);
                        };
                    })(),
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("refresh"),
                    type: "REFRESH",
                };
                const fakeStaticHandler: IRequestHandler<string, any> = {
                    fulfillRequest: (o) => Promise.resolve("DATA"),
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "STATIC",
                };
                requestTracker.trackDataRequest(
                    fakeBadRequestHandler,
                    "OPTIONS1",
                );
                requestTracker.trackDataRequest(fakeBadHandler, "OPTIONS2");
                requestTracker.trackDataRequest(fakeRefreshHandler, "OPTIONS3");
                requestTracker.trackDataRequest(fakeRefreshHandler, "OPTIONS3");
                requestTracker.trackDataRequest(fakeRefreshHandler, "OPTIONS3");
                requestTracker.trackDataRequest(fakeStaticHandler, "OPTIONS4");

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    BAD_REQUEST: {
                        OPTIONS1: {
                            error: "OH NO!",
                        },
                    },
                    BAD_HANDLER: {
                        OPTIONS2: {
                            error: "OH NO!",
                        },
                    },
                    REFRESH: {
                        OPTIONS3: {
                            data: "DATA:3",
                        },
                    },
                    STATIC: {
                        OPTIONS4: {
                            data: "DATA",
                        },
                    },
                });
            });

            it("should clear the tracked requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeFulfiller = jest.fn(() => Promise.resolve("DATA"));
                const fakeStaticHandler: IRequestHandler<string, any> = {
                    fulfillRequest: fakeFulfiller,
                    getKey: (o) => o,
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "STATIC",
                };
                requestTracker.trackDataRequest(fakeStaticHandler, "1");
                requestTracker.trackDataRequest(fakeStaticHandler, "2");
                requestTracker.trackDataRequest(fakeStaticHandler, "3");

                // Act
                await requestTracker.fulfillTrackedRequests();
                fakeFulfiller.mockClear();
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeFulfiller).not.toHaveBeenCalled();
            });
        });

        describe("#reset", () => {
            it("should clear the tracked data requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("refresh"),
                    type: "MY_TYPE",
                };
                requestTracker.trackDataRequest(fakeHandler, "OPTIONS");

                // Act
                requestTracker.reset();
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler.fulfillRequest).not.toHaveBeenCalled();
            });
        });
    });
});
