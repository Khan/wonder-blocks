// @flow
import Interval from "./interval.js";

describe("Interval", () => {
    beforeEach(() => {
        jest.useFakeTimers();
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

        it("sets an interval when autoSchedule is true", () => {
            // Arrange

            // Act
            // eslint-disable-next-line no-new
            new Interval(() => {}, 1000, true);

            // Assert
            expect(setInterval).toHaveBeenCalledTimes(1);
        });
    });

    describe("isSet", () => {
        it("is false when the interval has not been set", () => {
            // Arrange
            const interval = new Interval(() => {}, 1000, false);

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
            const interval = new Interval(() => {}, 500);

            // Act
            interval.set();

            // Assert
            expect(setInterval).toHaveBeenNthCalledWith(
                1,
                expect.any(Function),
                500,
            );
        });

        it("should invoke setInterval to call the given action", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(() => action(), 500);
            interval.set();
            // Flow doesn't know we added jest mocks to this $FlowFixMe
            const scheduledAction = setInterval.mock.calls[0][0];

            // Act
            scheduledAction();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should clear the active interval", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(() => action(), 500);
            interval.set();

            // Act
            interval.set();
            jest.runTimersToTime(501);

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should set an interval that stays active while not cleared", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(() => action(), 500);
            interval.set();

            // Act
            jest.runTimersToTime(1501);

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
            jest.runTimersToTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if resolve is true", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500);
            interval.set();

            // Act
            interval.clear(true);
            jest.runTimersToTime(501);

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if resolve is false", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500, true);

            // Act
            interval.clear(false);
            jest.runTimersToTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if interval is inactive", () => {
            // Arrange
            const action = jest.fn();
            const interval = new Interval(action, 500, false);

            // Act
            interval.clear(true);
            jest.runTimersToTime(501);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
