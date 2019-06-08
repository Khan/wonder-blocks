// @flow
import ActionScheduler from "./action-scheduler.js";
import Timeout from "./timeout.js";
import Interval from "./interval.js";
import AnimationFrame from "./animation-frame.js";

jest.mock("./timeout.js");
jest.mock("./interval.js");
jest.mock("./animation-frame.js");

describe("ActionScheduler", () => {
    describe("constructor", () => {
        it("creates instance", () => {
            // Arrange

            // Act
            const result = new ActionScheduler();

            // Assert
            expect(result).toBeDefined();
        });
    });

    describe("#timeout", () => {
        it("should create a timeout", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.timeout(action, 0);

            // Assert
            expect(result).toBeDefined();
        });

        it("should throw if period is less than 0", () => {});

        it("should pass arguments to Timeout", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            actionScheduler.timeout(action, 42, true);

            // Assert
            expect(Timeout).toHaveBeenCalledWith(action, 42, true);
        });

        describe("clearOnResolve", () => {
            it("when true, should call timeout.clear(true) on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testTimeout = actionScheduler.timeout(
                    action,
                    42,
                    false,
                    true,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testTimeout.clear).toHaveBeenCalledWith(true);
            });

            it("when falsy, should call timeout.clear() on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testTimeout = actionScheduler.timeout(
                    action,
                    42,
                    false,
                    false,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testTimeout.clear).toHaveBeenCalledWith(false);
            });
        });
    });

    describe("#interval", () => {
        it("should create an interval", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.interval(action, 1);

            // Assert
            expect(result).toBeDefined();
        });

        it("should throw if period is less than 1", () => {});

        it("should pass arguments to Interval", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            actionScheduler.interval(action, 42, true);

            // Assert
            expect(Interval).toHaveBeenCalledWith(action, 42, true);
        });

        describe("clearOnResolve", () => {
            it("when true, should call interval.clear(true) on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testInterval = actionScheduler.interval(
                    action,
                    42,
                    false,
                    true,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testInterval.clear).toHaveBeenCalledWith(true);
            });

            it("when falsy, should call interval.clear() on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testInterval = actionScheduler.interval(
                    action,
                    42,
                    false,
                    false,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testInterval.clear).toHaveBeenCalledWith(false);
            });
        });
    });

    describe("#animationFrame", () => {
        it("should create an animationframe", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            const result = actionScheduler.animationFrame(action);

            // Assert
            expect(result).toBeDefined();
        });

        it("should pass arguments to AnimationFrame", () => {
            // Arrange
            const actionScheduler = new ActionScheduler();
            const action = jest.fn();

            // Act
            actionScheduler.animationFrame(action, true);

            // Assert
            expect(AnimationFrame).toHaveBeenCalledWith(action, true);
        });

        describe("clearOnResolve", () => {
            it("when true, should call animationFrame.clear(true) on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testFrame = actionScheduler.animationFrame(
                    action,
                    false,
                    true,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testFrame.clear).toHaveBeenCalledWith(true);
            });

            it("when falsy, should call animationFrame.clear() on clearAll", () => {
                // Arrange
                const actionScheduler = new ActionScheduler();
                const action = jest.fn();
                const testFrame = actionScheduler.animationFrame(
                    action,
                    false,
                    false,
                );

                // Act
                actionScheduler.clearAll();

                // Assert
                expect(testFrame.clear).toHaveBeenCalledWith(false);
            });
        });
    });

    describe("#clearAll", () => {});
});
