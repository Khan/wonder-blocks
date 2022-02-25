// @flow
import {RequestFulfillment} from "../request-fulfillment.js";
import {GqlError} from "../gql-error.js";

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
        it("should resolve to an error result", async () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const fakeBadRequestHandler = () => Promise.reject("OH NO!");

            // Act
            const result = await requestFulfillment.fulfill("ID", {
                handler: fakeBadRequestHandler,
            });

            // Assert
            expect(result).toStrictEqual({
                status: "error",
                error: expect.any(GqlError),
            });
        });

        it("should resolve to an aborted result", async () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const abortError = new Error("abort abort abort, awoooga");
            abortError.name = "AbortError";
            const fakeBadRequestHandler = () => Promise.reject(abortError);

            // Act
            const result = await requestFulfillment.fulfill("ID", {
                handler: fakeBadRequestHandler,
            });

            // Assert
            expect(result).toStrictEqual({
                status: "aborted",
            });
        });

        it("should resolve to a data result", async () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const fakeRequestHandler = () => Promise.resolve("DATA!");

            // Act
            const result = await requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).toStrictEqual({
                status: "success",
                data: "DATA!",
            });
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
