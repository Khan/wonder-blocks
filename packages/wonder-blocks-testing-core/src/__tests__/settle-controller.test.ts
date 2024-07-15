import {SettleController} from "../settle-controller";
import {SettleSignal} from "../settle-signal";

describe("SettleController", () => {
    it("should have a signal", () => {
        // Arrange

        // Act
        const result = new SettleController();

        // Assert
        expect(result).toHaveProperty("signal", expect.any(SettleSignal));
    });

    describe("#settle", () => {
        it("should settle the signal", () => {
            // Arrange
            const controller = new SettleController();
            const signal = controller.signal;

            // Act
            controller.settle();

            // Assert
            expect(signal.settled).toBe(true);
        });
    });
});
