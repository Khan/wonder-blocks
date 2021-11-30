// @flow
import Interval from "../interval.js";
import {SchedulePolicy, ClearPolicy} from "../policies.js";

describe("Interval", () => {
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
            const result = new Interval(() => {}, 1000);

            // Assert
            expect(result).toBeDefined();
        });

        it("throws if the action is not a function", () => {
            // Arrange

            // Act
            const underTest = () => new Interval((null: any), 1);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Action must be a function"`,
            );
        });

        it("throws if the period is less than 1", () => {
            // Arrange

            // Act
            const underTest = () => new Interval(() => {}, 0);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Interval period must be >= 1"`,
            );
        });

        it("sets an interval when schedule policy is SchedulePolicy.Immediately", () => {
            // Arrange
            const intervalSpy = jest.spyOn(global, "setInterval");

            // Act
            // eslint-disable-next-line no-new
            new Interval(() => {}, 1000, SchedulePolicy.Immediately);

            // Assert
            expect(intervalSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it("is false when the interval has not been set", () => {
            // Arrange
            const interval = new Interval(
                () => {},
                1000,
                SchedulePolicy.OnDemand,
            );

            // Act
            const result = interval.isSet;

            // Assert
            expect(result).toBeFalsy();
        });

        it("is true when the interval is active", () => {
            // Arrange
            const interval = new Interval(() => {}, 1000);
            interval.set();

            // Act
            const result = interval.isSet;

            // Assert
            expect(result).toBeTruthy();
        });

        it("is false when the interval is cleared", () => {
            // Arrange
            const interval = new Interval(() => {}, 1000);
            interval.set();
            interval.clear();

            // Act
            const result = interval.isSet;

            // Assert
            expect(result).toBeFalsy();
        });
    });

    describe("#set", () => {
        it("should call setInterval", () => {
            // Arrange
            const intervalSpy = jest.spyOn(global, "setInterval");
            const interval = new Interval(
                () => {},
                500,
                SchedulePolicy.OnDemand,
            );

            // Act
            interval.set();

            // Assert
            expect(intervalSpy).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
                500,
            );
        });

        it("should invoke setInterval to call the given action", () => {
            // Arrange
            const intervalSpy = jest.spyOn(global, "setInterval");
            const action = jest.fn();
            const interval = new Interval(
                () => action(),
                500,
                SchedulePolicy.OnDemand,
            );
            interval.set();
            const scheduledAction = intervalSpy.mock.calls[0][0];

            // Act
            scheduledAction();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should clear the active interval", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(
                () => action(),
                500,
                SchedulePolicy.OnDemand,
            );
            interval.set();

            // Act
            interval.set();
            jest.advanceTimersByTime(501);

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should set an interval that stays active while not cleared", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(() => action(), 500);
            interval.set();

            // Act
            jest.advanceTimersByTime(1501);

            // Assert
            expect(action).toHaveBeenCalledTimes(3);
        });
    });

    describe("#clear", () => {
        it("should clear an active interval", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500);
            interval.set();

            // Act
            interval.clear();
            jest.advanceTimersByTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500);
            interval.set();

            // Act
            interval.clear(ClearPolicy.Resolve);
            jest.advanceTimersByTime(501);

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if clear policy is ClearPolicy.Cancel", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(
                action,
                500,
                SchedulePolicy.Immediately,
            );

            // Act
            interval.clear(ClearPolicy.Cancel);
            jest.advanceTimersByTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if interval is inactive and clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500, SchedulePolicy.OnDemand);

            // Act
            interval.clear(ClearPolicy.Resolve);
            jest.advanceTimersByTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
