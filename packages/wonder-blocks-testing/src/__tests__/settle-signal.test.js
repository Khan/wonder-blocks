// @flow
import {SettleSignal} from "../settle-signal";

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

    it("should invoke the passed function with a function", () => {
        // Arrange
        const setSettleFn = jest.fn();

        // Act
        // eslint-disable-next-line no-new
        new SettleSignal(setSettleFn);

        // Assert
        expect(setSettleFn).toHaveBeenCalledWith(expect.any(Function));
    });

    describe("setSettleFn argument", () => {
        it("should set settled to true", () => {
            // Arrange
            const setSettleFn = jest.fn();
            const signal = new SettleSignal(setSettleFn);
            const settle = setSettleFn.mock.calls[0][0];

            // Act
            settle();

            // Assert
            expect(signal.settled).toBe(true);
        });

        it("should raise the settled event", () => {
            // Arrange
            const setSettleFn = jest.fn();
            const signal = new SettleSignal(setSettleFn);
            const settle = setSettleFn.mock.calls[0][0];
            const handler = jest.fn();
            signal.addEventListener("settled", handler);

            // Act
            settle();

            // Assert
            expect(handler).toHaveBeenCalled();
        });

        it("should throw if the signal has already been settled", () => {
            // Arrange
            const setSettleFn = jest.fn();
            // eslint-disable-next-line no-new
            new SettleSignal(setSettleFn);
            const settle = setSettleFn.mock.calls[0][0];
            settle();

            // Act
            const result = () => settle();

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
