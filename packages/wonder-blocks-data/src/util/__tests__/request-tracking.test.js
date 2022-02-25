// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";

import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestTracker, TrackerContext} from "../request-tracking.js";
import {SsrCache} from "../ssr-cache.js";

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
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        const createRequestTracker = () =>
            /**
             * We pass our own response cache instance so that the test cases
             * are not sharing the same default instance.
             */
            new RequestTracker(new SsrCache());

        describe("@Default", () => {
            it("should return an instance of RequestTracker", () => {
                // Arrange

                // Act
                const result = RequestTracker.Default;

                // Assert
                expect(result).toBeInstanceOf(RequestTracker);
            });

            it("should return the same instance on each call", () => {
                // Arrange

                // Act
                const result1 = RequestTracker.Default;
                const result2 = RequestTracker.Default;

                // Assert
                expect(result1).toBe(result2);
            });
        });

        describe("#trackDataRequest", () => {
            it("should track a request", async () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler = jest.fn();

                // Act
                requestTracker.trackDataRequest("ID", fakeHandler, false);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            });

            it("should track each matching request once", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler = jest.fn().mockResolvedValue("DATA");

                // Act
                requestTracker.trackDataRequest("ID", fakeHandler, true);
                requestTracker.trackDataRequest("ID", fakeHandler, true);
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
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
                const fakeHandler = jest.fn();
                requestTracker.trackDataRequest("ID", fakeHandler, true);

                // Act
                const result = requestTracker.hasUnfulfilledRequests;

                // Assert
                expect(result).toBe(true);
            });

            it("should return false if all tracked requests have been fulfilled", () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler = jest.fn().mockResolvedValue(5);
                requestTracker.trackDataRequest("ID", fakeHandler, false);
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
                const fakeBadHandler = () => {
                    throw new Error("OH NO!");
                };
                requestTracker.trackDataRequest("ID", fakeBadHandler, true);

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    ID: {
                        error: "OH NO!",
                    },
                });
            });

            it("should cache errors occurring in promises", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeBadRequestHandler = () =>
                    new Promise((resolve, reject) => reject("OH NO!"));
                requestTracker.trackDataRequest(
                    "ID",
                    fakeBadRequestHandler,
                    true,
                );
                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    ID: {
                        error: "Request failed",
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
                const fakeBadRequestHandler = () =>
                    new Promise((resolve, reject) => reject("OH NO!"));
                const fakeBadHandler = () => {
                    throw new Error("OH NO!");
                };
                const fakeValidHandler = (() => {
                    let counter = 0;
                    return (o) => {
                        counter++;
                        return Promise.resolve(`DATA:${counter}`);
                    };
                })();
                requestTracker.trackDataRequest(
                    "BAD_REQUEST",
                    fakeBadRequestHandler,
                    true,
                );
                requestTracker.trackDataRequest(
                    "BAD_HANDLER",
                    fakeBadHandler,
                    true,
                );
                requestTracker.trackDataRequest(
                    "VALID_HANDLER1",
                    fakeValidHandler,
                    true,
                );
                requestTracker.trackDataRequest(
                    "VALID_HANDLER2",
                    fakeValidHandler,
                    true,
                );

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({
                    BAD_REQUEST: {
                        error: "Request failed",
                    },
                    BAD_HANDLER: {
                        error: "OH NO!",
                    },
                    VALID_HANDLER1: {
                        data: "DATA:1",
                    },
                    VALID_HANDLER2: {
                        data: "DATA:2",
                    },
                });
            });

            it("should ignore loading results", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                jest.spyOn(
                    requestTracker._requestFulfillment,
                    "fulfill",
                ).mockResolvedValue({status: "loading"});
                const fakeValidHandler = () =>
                    Promise.reject(new Error("Not called for this test case"));
                requestTracker.trackDataRequest("ID", fakeValidHandler, true);

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({});
            });

            it("should ignore aborted results", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                jest.spyOn(
                    requestTracker._requestFulfillment,
                    "fulfill",
                ).mockResolvedValue({status: "aborted"});
                const fakeValidHandler = () =>
                    Promise.reject(new Error("Not called for this test case"));
                requestTracker.trackDataRequest("ID", fakeValidHandler, false);

                // Act
                const result = await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(result).toStrictEqual({});
            });

            it("should clear the tracked requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeStaticHandler = jest.fn(() =>
                    Promise.resolve("DATA"),
                );
                requestTracker.trackDataRequest("1", fakeStaticHandler, true);
                requestTracker.trackDataRequest("2", fakeStaticHandler, true);
                requestTracker.trackDataRequest("3", fakeStaticHandler, true);

                // Act
                await requestTracker.fulfillTrackedRequests();
                fakeStaticHandler.mockClear();
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeStaticHandler).not.toHaveBeenCalled();
            });
        });

        describe("#reset", () => {
            it("should clear the tracked data requests", async () => {
                // Arrange
                const requestTracker = createRequestTracker();
                const fakeHandler = jest.fn().mockResolvedValue("DATA");
                requestTracker.trackDataRequest("ID", fakeHandler, true);

                // Act
                requestTracker.reset();
                await requestTracker.fulfillTrackedRequests();

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            });
        });
    });
});
