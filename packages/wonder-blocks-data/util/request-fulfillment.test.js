// @flow
import {ResponseCache} from "./response-cache.js";
import {RequestFulfillment} from "./request-fulfillment.js";

import type {IRequestHandler} from "./types.js";

describe("RequestFulfillment", () => {
    it("should provide static default instance", () => {
        // Arrange

        // Act
        const defaultInstance = RequestFulfillment.Default;

        // Assert
        expect(defaultInstance).toBe(RequestFulfillment.Default);
        expect(defaultInstance).toBeInstanceOf(RequestFulfillment);
    });

    describe("#fulfill", () => {
        it("should cache errors caused directly by handlers", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeBadHandler: IRequestHandler<any, any> = {
                fulfillRequest: () => {
                    throw new Error("OH NO!");
                },
                getKey: jest.fn().mockReturnValue("MY_KEY"),
                invalidateCache: () => false,
                type: "MY_TYPE",
            };

            // Act
            await requestFulfillment.fulfill(fakeBadHandler, "OPTIONS");

            // Assert
            expect(responseCache.cloneCachedData()).toStrictEqual({
                MY_TYPE: {
                    MY_KEY: {
                        error: "OH NO!",
                    },
                },
            });
        });

        it("should cache errors occurring in promises", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeBadRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () =>
                    new Promise((resolve, reject) => reject("OH NO!")),
                getKey: (o) => o,
                invalidateCache: () => false,
                type: "BAD_REQUEST",
            };

            // Act
            await requestFulfillment.fulfill(fakeBadRequestHandler, "OPTIONS");

            // Assert
            expect(responseCache.cloneCachedData()).toStrictEqual({
                BAD_REQUEST: {
                    OPTIONS: {
                        error: "OH NO!",
                    },
                },
            });
        });

        it("should cache data from requests", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                invalidateCache: () => false,
                type: "VALID_REQUEST",
            };

            // Act
            await requestFulfillment.fulfill(fakeRequestHandler, "OPTIONS");

            // Assert
            expect(responseCache.cloneCachedData()).toStrictEqual({
                VALID_REQUEST: {
                    OPTIONS: {
                        data: "DATA!",
                    },
                },
            });
        });

        it("should return a promise of the result", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                invalidateCache: () => false,
                type: "VALID_REQUEST",
            };

            // Act
            const result = await requestFulfillment.fulfill(
                fakeRequestHandler,
                "OPTIONS",
            );

            // Assert
            expect(result).toStrictEqual({
                data: "DATA!",
            });
        });

        it("should reuse inflight requests", () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                invalidateCache: () => false,
                type: "VALID_REQUEST",
            };

            // Act
            const promise = requestFulfillment.fulfill(
                fakeRequestHandler,
                "OPTIONS",
            );
            const result = requestFulfillment.fulfill(
                fakeRequestHandler,
                "OPTIONS",
            );

            // Assert
            expect(result).toBe(promise);
        });

        it("should remove inflight requests upon completion", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                invalidateCache: () => false,
                type: "VALID_REQUEST",
            };

            // Act
            const promise = requestFulfillment.fulfill(
                fakeRequestHandler,
                "OPTIONS",
            );
            await promise;
            const result = requestFulfillment.fulfill(
                fakeRequestHandler,
                "OPTIONS",
            );

            // Assert
            expect(result).not.toBe(promise);
        });
    });
});
