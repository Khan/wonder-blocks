// @flow
import {ResponseCache} from "../response-cache.js";
import {RequestFulfillment} from "../request-fulfillment.js";

import type {IRequestHandler} from "../types.js";

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
        it("should attempt to cache errors caused directly by handlers", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const error = new Error("OH NO!");
            const fakeBadHandler: IRequestHandler<any, any> = {
                fulfillRequest: () => {
                    throw error;
                },
                getKey: jest.fn().mockReturnValue("MY_KEY"),
                type: "MY_TYPE",
                hydrate: true,
            };
            const cacheErrorSpy = jest.spyOn(responseCache, "cacheError");

            // Act
            await requestFulfillment.fulfill(fakeBadHandler, "OPTIONS");

            // Assert
            expect(cacheErrorSpy).toHaveBeenCalledWith(
                fakeBadHandler,
                "OPTIONS",
                error,
            );
        });

        it("should cache errors occurring in promises", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeBadRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () =>
                    new Promise((resolve, reject) => reject("OH NO!")),
                getKey: (o) => o,
                type: "BAD_REQUEST",
                hydrate: true,
            };
            const cacheErrorSpy = jest.spyOn(responseCache, "cacheError");

            // Act
            await requestFulfillment.fulfill(fakeBadRequestHandler, "OPTIONS");

            // Assert
            expect(cacheErrorSpy).toHaveBeenCalledWith(
                fakeBadRequestHandler,
                "OPTIONS",
                "OH NO!",
            );
        });

        it("should cache data from requests", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                type: "VALID_REQUEST",
                hydrate: true,
            };
            const cacheDataSpy = jest.spyOn(responseCache, "cacheData");

            // Act
            await requestFulfillment.fulfill(fakeRequestHandler, "OPTIONS");

            // Assert
            expect(cacheDataSpy).toHaveBeenCalledWith(
                fakeRequestHandler,
                "OPTIONS",
                "DATA!",
            );
        });

        it("should return a promise of the result", async () => {
            // Arrange
            const responseCache = new ResponseCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler: IRequestHandler<string, any> = {
                fulfillRequest: () => Promise.resolve("DATA!"),
                getKey: (o) => o,
                type: "VALID_REQUEST",
                hydrate: true,
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
                type: "VALID_REQUEST",
                hydrate: true,
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
                type: "VALID_REQUEST",
                hydrate: false,
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
