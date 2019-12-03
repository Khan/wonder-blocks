// @flow
import * as React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import {RequestTracker, TrackerContext} from "./request-tracking.js";

import type {IRequestHandler} from "./types.js";

describe("./request-tracking.js", () => {
    afterEach(() => {
        unmountAll();
        jest.resetAllMocks();
    });

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
        describe("#trackDataRequest", () => {
            it("should get the key for the request", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
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
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
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

            it("should add the handler to the cache if it is not present", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                const {
                    trackedHandlers,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedHandlers).toHaveProperty("MY_TYPE", fakeHandler);
            });

            it("should add a static request to the cache if it is not present", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                const {
                    trackedRequests,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedRequests).toHaveProperty("MY_TYPE", {
                    MY_KEY: [options],
                });
            });

            it("should not change the cache if the static request already tracked", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options1);
                requestTracker.trackDataRequest(fakeHandler, options2);
                const {
                    trackedRequests,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedRequests).toHaveProperty("MY_TYPE", {
                    MY_KEY: [options1],
                });
            });

            it("should not update the handler in the cache if it is already present", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler1: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const fakeHandler2: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("static"),
                    type: "MY_TYPE",
                };
                const options1 = {these: "are options"};
                const options2 = {these: "are also options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler1, options1);
                requestTracker.trackDataRequest(fakeHandler2, options2);
                const {
                    trackedHandlers,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedHandlers).toHaveProperty("MY_TYPE", fakeHandler1);
            });

            it("should add refresh request", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("refresh"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                const {
                    trackedRequests,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedRequests).toHaveProperty("MY_TYPE", {
                    MY_KEY: [options],
                });
            });

            it("should add refresh request, even if already tracked", () => {
                // Arrange
                const requestTracker = new RequestTracker();
                const fakeHandler: IRequestHandler<any, any> = {
                    fulfillRequest: jest.fn(),
                    getKey: jest.fn().mockReturnValue("MY_KEY"),
                    cacheHitBehavior: jest.fn().mockReturnValue("refresh"),
                    type: "MY_TYPE",
                };
                const options = {these: "are options"};

                // Act
                requestTracker.trackDataRequest(fakeHandler, options);
                requestTracker.trackDataRequest(fakeHandler, options);
                const {
                    trackedRequests,
                } = requestTracker.tempGetTrackedRequestsAndHandlers();

                // Assert
                expect(trackedRequests).toHaveProperty("MY_TYPE", {
                    MY_KEY: [options, options],
                });
            });
        });
    });
});
