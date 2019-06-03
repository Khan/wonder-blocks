// @flow
import Timeout from "./timeout.js";

describe("Timeout", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    beforeEach(() => {
        jest.clearAllTimers();
    });

    describe("constructor", () => {
        it("creates instance", () => {
            // Arrange

            // Act
            const result = new Timeout(() => {}, 0);

            // Assert
            expect(result).toBeDefined();
        });

        it("sets a timeout when autoSet is true", () => {
            // Arrange

            // Act
            // eslint-disable-next-line no-new
            new Timeout(() => {}, 0, true);

            // Assert
            expect(setTimeout).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it.skip("is false when the timeout has not been set", () => {});

        it.skip("is true when the timeout is pending", () => {});

        it.skip("is false when the timeout has executed", () => {});
    });

    describe("#set", () => {});

    describe("#clear", () => {});
});
