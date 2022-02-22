// @flow
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
        it("should return a promise rejecting to the error", async () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const fakeBadRequestHandler = () => Promise.reject("OH NO!");

            // Act
            const underTest = requestFulfillment.fulfill("ID", {
                handler: fakeBadRequestHandler,
            });

            // Assert
            await expect(underTest).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Request failed"`,
            );
        });

        it("should return a promise resolving to the data result", async () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const fakeRequestHandler = () => Promise.resolve("DATA!");

            // Act
            const result = await requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).toStrictEqual("DATA!");
        });

        it("should reuse inflight requests", () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
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
            const requestFulfillment = new RequestFulfillment();
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
