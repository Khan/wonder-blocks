// @flow
import {SsrCache} from "../ssr-cache.js";
import {RequestFulfillment} from "../request-fulfillment.js";

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
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const error = new Error("OH NO!");
            const fakeBadHandler = () => {
                throw error;
            };
            const cacheErrorSpy = jest.spyOn(responseCache, "cacheError");

            // Act
            await requestFulfillment.fulfill("ID", {
                handler: fakeBadHandler,
            });

            // Assert
            expect(cacheErrorSpy).toHaveBeenCalledWith("ID", error, true);
        });

        it("should cache errors occurring in promises", async () => {
            // Arrange
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeBadRequestHandler = () =>
                new Promise((resolve, reject) => reject("OH NO!"));
            const cacheErrorSpy = jest.spyOn(responseCache, "cacheError");

            // Act
            await requestFulfillment.fulfill("ID", {
                handler: fakeBadRequestHandler,
            });

            // Assert
            expect(cacheErrorSpy).toHaveBeenCalledWith("ID", "OH NO!", true);
        });

        it("should cache data from requests", async () => {
            // Arrange
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler = () => Promise.resolve("DATA!");
            const cacheDataSpy = jest.spyOn(responseCache, "cacheData");

            // Act
            await requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(cacheDataSpy).toHaveBeenCalledWith("ID", "DATA!", true);
        });

        it("should return a promise of the result", async () => {
            // Arrange
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler = () => Promise.resolve("DATA!");

            // Act
            const result = await requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).toStrictEqual({
                data: "DATA!",
            });
        });

        it("should reuse inflight requests", () => {
            // Arrange
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler = () => Promise.resolve("DATA!");

            // Act
            const promise = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });
            const result = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).toBe(promise);
        });

        it("should remove inflight requests upon completion", async () => {
            // Arrange
            const responseCache = new SsrCache();
            const requestFulfillment = new RequestFulfillment(responseCache);
            const fakeRequestHandler = () => Promise.resolve("DATA!");

            // Act
            const promise = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });
            await promise;
            const result = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).not.toBe(promise);
        });
    });
});
