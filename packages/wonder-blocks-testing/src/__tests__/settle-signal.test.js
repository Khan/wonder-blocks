// @flow
import {SettleSignal} from "../settle-signal.js";

describe("SettleSignal", () => {
    it("should extend EventTarget", () => {
        // Arrange

        // Act
        const result = new SettleSignal();

        // Assert
        expect(result).toBeInstanceOf(EventTarget);
    });

    it("should start with settled = false", () => {
        // Arrange

        // Act
        const result = new SettleSignal();

        // Assert
        expect(result).toHaveProperty("settled", false);
    });

    describe("#settle", () => {
        it("should set settled to true", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            signal.settle();

            // Assert
            expect(signal.settled).toBe(true);
        });

        it("should raise the settled event", () => {
            // Arrange
            const signal = new SettleSignal();
            const handler = jest.fn();
            signal.addEventListener("settled", handler);

            // Act
            signal.settle();

            // Assert
            expect(handler).toHaveBeenCalled();
        });

        it("should throw if the signal has already been settled", () => {
            // Arrange
            const signal = new SettleSignal();
            signal.settle();

            // Act
            const result = () => signal.settle();

            // Assert
            expect(result).toThrowErrorMatchingInlineSnapshot(
                `"SettleSignal already settled"`,
            );
        });
    });

    describe("#SettleSignal.settle", () => {
        it("should return a SettleSignal", () => {
            // Arrange

            // Act
            const result = SettleSignal.settle();

            // Assert
            expect(result).toBeInstanceOf(SettleSignal);
        });

        it("should return a SettleSignal that is already settled", () => {
            // Arrange

            // Act
            const result = SettleSignal.settle();

            // Assert
            expect(result).toHaveProperty("settled", true);
        });
    });
});
