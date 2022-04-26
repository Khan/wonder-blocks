// @flow
import {RequestFulfillment} from "../request-fulfillment.js";
import {DataError} from "../data-error.js";

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
                error: expect.any(DataError),
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

    describe("#abort", () => {
        it("should delete the given request from the inflight requests", () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const fakeRequestHandler = () => Promise.resolve("DATA!");
            const promise = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Act
            requestFulfillment.abort("ID");
            const result = requestFulfillment.fulfill("ID", {
                handler: fakeRequestHandler,
            });

            // Assert
            expect(result).not.toBe(promise);
        });
    });

    describe("#abortAll", () => {
        it("should abort all inflight requests", () => {
            // Arrange
            const requestFulfillment = new RequestFulfillment();
            const abortSpy = jest.spyOn(requestFulfillment, "abort");
            const fakeRequestHandler = () => Promise.resolve("DATA!");
            requestFulfillment.fulfill("ID1", {
                handler: fakeRequestHandler,
            });
            requestFulfillment.fulfill("ID2", {
                handler: fakeRequestHandler,
            });

            // Act
            requestFulfillment.abortAll();

            // Assert
            expect(abortSpy).toHaveBeenCalledWith("ID1");
            expect(abortSpy).toHaveBeenCalledWith("ID2");
        });
    });
});
