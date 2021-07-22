// @flow
import * as React from "react";
import {mount} from "enzyme";

import {RequestTracker, TrackerContext} from "../request-tracking.js";
import {ResponseCache} from "../response-cache.js";

import type {IRequestHandler} from "../types.js";

describe("../request-tracking.js", () => {
    describe("TrackerContext", () => {
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
                const getKeySpy = jest.fn();
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(() => Promise.resolve(null)),
                    getKey: getKeySpy,
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);

                // Assert
                expect(getKeySpy).toHaveBeenCalledWith(options);
            });

            it("should track a request", async () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fulfillRequestSpy = jest.fn();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fulfillRequestSpy).toHaveBeenCalledWith(options);
                expect(fulfillRequestSpy).toHaveBeenCalledTimes(1);
            });

            it("should track each matching request once", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fulfillRequestSpy = jest.fn().mockResolvedValue(null);
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: (options) => JSON.stringify(options),
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options1);
                requestTracker.trackDataRequest(fakeHandler, options2);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fulfillRequestSpy).toHaveBeenCalledWith(options1);
                expect(fulfillRequestSpy).toHaveBeenCalledTimes(1);
            });

            it("should reuse the existing handler for the handler type from the cache", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const handlerType = "MY_TYPE";
                const fulfillRequestSpy1 = jest.fn();
                const fakeHandler1: IRequestHandler<any, any> = {
                    fulfillRequest: fulfillRequestSpy1,
                    getKey: jest.fn().mockReturnValue("MY_KEY1"),
                    shouldRefreshCache: () => false,
                    type: handlerType,
                    cache: null,
                    hydrate: true,
                };
                const fulfillRequestSpy2 = jest.fn();
                const fakeHandler2: IRequestHandler<any, any> = {
                    fulfillRequest: fulfillRequestSpy2,
                    getKey: jest.fn().mockReturnValue("MY_KEY2"),
                    shouldRefreshCache: () => false,
                    type: handlerType,
                    cache: null,
                    hydrate: true,
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are also options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler1, options1);
                requestTracker.trackDataRequest(fakeHandler2, options2);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fulfillRequestSpy1).toHaveBeenCalledTimes(2);
                expect(fulfillRequestSpy1).toHaveBeenCalledWith(options1);
                expect(fulfillRequestSpy1).toHaveBeenCalledWith(options2);
                expect(fulfillRequestSpy2).not.toHaveBeenCalled();
            });
        });

        describe("#hasUnfulfilledRequests", () => {
            it("should return false if no requests have been tracked", () => {
                // Arrange
                const requestTracker = createRequestTracker();

                // Act
                const result = requestTracker.hasUnfulfilledRequests;

                // Assert
                expect(result).toBe(false);
            });

            it("should return true if there are requests waiting to be fulfilled", () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                const options = {these: "are options"};
                requestTracker.trackDataRequest(fakeHandler, options);

                // Act
                const result = requestTracker.hasUnfulfilledRequests;

                // Assert
                expect(result).toBe(true);
            });

            it("should return false if all tracked requests have been fulfilled", () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn().mockResolvedValue(5),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                const options = {these: "are options"};
                requestTracker.trackDataRequest(fakeHandler, options);
                requestTracker.fulfillTrackedRequests();

                // Act
                const result = requestTracker.hasUnfulfilledRequests;

                // Assert
                expect(result).toBe(false);
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
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
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
                    shouldRefreshCache: () => false,
                    type: "BAD_REQUEST",
                    cache: null,
                    hydrate: true,
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
                /**
                 * We're going to check a few things here:
                 * - Handlers that crash when making the request
                 * - Handlers that reject the promise
                 * - Handlers that resolve
                 */
                const fakeBadRequestHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () =>
                        new Promise((resolve, reject) => reject("OH NO!")),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "BAD_REQUEST",
                    cache: null,
                    hydrate: true,
                };
                const fakeBadHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () => {
                        throw new Error("OH NO!");
                    },
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "BAD_HANDLER",
                    cache: null,
                    hydrate: true,
                };
                const fakeValidHandler: IRequestHandler<string, any> = {
                    fulfillRequest: (() => {
                        let counter = 0;
                        return (o) => {
                            counter++;
                            return Promise.resolve(`DATA:${counter}`);
                        };
                    })(),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "VALID",
                    cache: null,
                    hydrate: true,
                };
                requestTracker.trackDataRequest(
                    fakeBadRequestHandler,
                    "OPTIONS1",
                );
                requestTracker.trackDataRequest(fakeBadHandler, "OPTIONS2");
                requestTracker.trackDataRequest(fakeValidHandler, "OPTIONS3");
                requestTracker.trackDataRequest(fakeValidHandler, "OPTIONS4");

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
                    VALID: {
                        OPTIONS3: {
                            data: "DATA:1",
                        },
                        OPTIONS4: {
                            data: "DATA:2",
                        },
                    },
                });
            });

            it("should cope gracefully with null fulfillments", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                jest.spyOn(
                    requestTracker._requestFulfillment,
                    "fulfill",
                ).mockReturnValue(null);
                const fakeValidHandler: IRequestHandler<string, any> = {
                    fulfillRequest: () => Promise.resolve("DATA"),
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "VALID",
                    cache: null,
                    hydrate: true,
                };
                requestTracker.trackDataRequest(fakeValidHandler, "OPTIONS1");

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({});
            });

            it("should clear the tracked requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeFulfiller = jest.fn(() => Promise.resolve("DATA"));
                const fakeStaticHandler: IRequestHandler<string, any> = {
                    fulfillRequest: fakeFulfiller,
                    getKey: (o) => o,
                    shouldRefreshCache: () => false,
                    type: "STATIC",
                    cache: null,
                    hydrate: true,
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
                const fulfillRequestSpy = jest.fn().mockResolvedValue(null);
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: fulfillRequestSpy,
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    shouldRefreshCache: () => false,
                    type: "MY_TYPE",
                    cache: null,
                    hydrate: true,
                };
                requestTracker.trackDataRequest(fakeHandler, "OPTIONS");

                // Act
                requestTracker.reset();
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fulfillRequestSpy).not.toHaveBeenCalled();
            });
        });
    });
});
