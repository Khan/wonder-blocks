import Timeout from "../timeout";
import {SchedulePolicy, ClearPolicy} from "../policies";

describe("Timeout", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("constructor", () => {
        it("creates instance", () => {
            // Arrange

            // Act
            const result = new Timeout(() => {}, 0);

            // Assert
            expect(result).toBeDefined();
        });

        it("throws if the action is not a function", () => {
            // Arrange

            // Act
            const underTest = () => new Timeout(null as any, 0);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Action must be a function"`,
            );
        });

        it("throws if the period is less than 0", () => {
            // Arrange

            // Act
            const underTest = () => new Timeout(() => {}, -1);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Timeout period must be >= 0"`,
            );
        });

        it("sets a timeout when schedule policy is SchedulePolicy.Immediately", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");

            // Act
            // eslint-disable-next-line no-new
            new Timeout(() => {}, 0, SchedulePolicy.Immediately);

            // Assert
            expect(timeoutSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it("is false when the timeout has not been set", () => {
            // Arrange
            const timeout = new Timeout(() => {}, 0, SchedulePolicy.OnDemand);

            // Act
            const result = timeout.isSet;

            // Assert
            expect(result).toBeFalsy();
        });

        it("is true when the timeout is pending", () => {
            // Arrange
            const timeout = new Timeout(() => {}, 0);
            timeout.set();

            // Act
            const result = timeout.isSet;

            // Assert
            expect(result).toBeTruthy();
        });

        it("is false when the timeout has executed", () => {
            // Arrange
            const timeout = new Timeout(() => {}, 0);
            timeout.set();
            jest.runOnlyPendingTimers();

            // Act
            const result = timeout.isSet;

            // Assert
            expect(result).toBeFalsy();
        });
    });

    describe("#set", () => {
        it("should call setTimeout", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const timeout = new Timeout(() => {}, 500, SchedulePolicy.OnDemand);

            // Act
            timeout.set();

            // Assert
            expect(timeoutSpy).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
                500,
            );
        });

        it("should invoke setTimeout to call the given action", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const action = jest.fn();
            const timeout = new Timeout(
                () => action(),
                500,
                SchedulePolicy.OnDemand,
            );
            timeout.set();
            const scheduledAction = timeoutSpy.mock.calls[0][0];

            // Act
            scheduledAction();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should clear any pending timeout", () => {
            // Arrange
            const action = jest.fn();
            const timeout = new Timeout(() => action(), 500);
            timeout.set();

            // Act
            timeout.set();
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should set the timeout again if it has already executed", () => {
            // Arrange
            const timeoutSpy = jest.spyOn(global, "setTimeout");
            const action = jest.fn();
            const timeout = new Timeout(action, 500, SchedulePolicy.OnDemand);
            timeout.set();
            jest.runAllTimers();

            // Act
            timeout.set();

            // Assert
            expect(timeoutSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("#clear", () => {
        it("should clear a pending timout", () => {
            // Arrange
            const action = jest.fn();
            const timeout = new Timeout(action, 500);
            timeout.set();

            // Act
            timeout.clear();
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const timeout = new Timeout(action, 500);
            timeout.set();

            // Act
            timeout.clear(ClearPolicy.Resolve);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if clear policy is ClearPolicy.Cancel", () => {
            // Arrange
            const action = jest.fn();
            const timeout = new Timeout(
                action,
                500,
                SchedulePolicy.Immediately,
            );

            // Act
            timeout.clear(ClearPolicy.Cancel);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if timeout is not pending", () => {
            // Arrange
            const action = jest.fn();
            const timeout = new Timeout(action, 500, SchedulePolicy.OnDemand);

            // Act
            timeout.clear(ClearPolicy.Resolve);
            jest.runOnlyPendingTimers();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
