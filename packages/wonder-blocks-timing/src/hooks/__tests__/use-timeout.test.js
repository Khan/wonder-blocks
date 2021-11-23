// @flow
import {renderHook} from "@testing-library/react-hooks";
import {SchedulePolicy, ClearPolicy} from "../../util/policies.js";

import {useTimeout} from "../use-timeout.js";

describe("useTimeout", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("should return an ITimeout", () => {
        // Arrange
        const {result} = renderHook(() => useTimeout(() => {}, 1000));

        // Act

        // Assert
        expect(result.current).toEqual(
            expect.objectContaining({
                clear: expect.any(Function),
                set: expect.any(Function),
                isSet: expect.any(Boolean),
            }),
        );
    });

    it("should default to being immediately set", () => {
        // Arrange
        const {result} = renderHook(() => useTimeout(() => {}, 1000));

        // Act

        // Assert
        expect(result.current.isSet).toBe(true);
    });

    describe("SchedulePolicies.Immediately", () => {
        it("should call the action after the timeout expires", () => {
            // Arrange
            const action = jest.fn();
            renderHook(() => useTimeout(action, 1000));

            // Act
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should update isSet to false after the timeout expires", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            jest.advanceTimersByTime(1000);

            // Assert
            expect(result.current.isSet).toBe(false);
        });

        it("should call the action again if 'set' is called after the action was called", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            jest.advanceTimersByTime(1000);
            result.current.set();
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).toHaveBeenCalledTimes(2);
        });

        it("should restart the timeout if timeoutMs gets updated", () => {
            // Arrange
            const action = jest.fn();
            const {rerender} = renderHook(
                ({timeoutMs}) => useTimeout(action, timeoutMs),
                {
                    initialProps: {timeoutMs: 1000},
                },
            );

            // Act
            jest.advanceTimersByTime(900);
            rerender({timeoutMs: 500});
            jest.advanceTimersByTime(100);

            // Assert
            expect(action).not.toHaveBeenCalled();
            jest.advanceTimersByTime(500);
            expect(action).toHaveBeenCalled();
        });

        it("should should timeout after the new timeoutMs if it gets updated", () => {
            // Arrange
            const action = jest.fn();
            const {rerender} = renderHook(
                ({timeoutMs}) => useTimeout(action, timeoutMs),
                {
                    initialProps: {timeoutMs: 1000},
                },
            );

            // Act
            rerender({timeoutMs: 500});
            jest.advanceTimersByTime(500);

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the new action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}) => useTimeout(action, 1000),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action2).toHaveBeenCalled();
        });

        it("should not call the original action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}) => useTimeout(action, 1000),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action1).not.toHaveBeenCalled();
        });

        it("should not call the action if the timeout is cleared", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            result.current.clear();
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call the action when the timeout is cleared when passing ClearPolicies.Resolve to clear()", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            result.current.clear(ClearPolicy.Resolve);

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the action when the timeout is cleared when using ClearPolicies.Resolve in options", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 1000, {clearPolicy: ClearPolicy.Resolve}),
            );

            // Act
            result.current.clear();

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the action on unmount when using ClearPolicies.Resolve in options", () => {
            // Arrange
            const action = jest.fn();
            const {unmount} = renderHook(() =>
                useTimeout(action, 1000, {clearPolicy: ClearPolicy.Resolve}),
            );

            // Act
            unmount();

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should not call the action on unmount when using the default options", () => {
            // Arrange
            const action = jest.fn();
            const {unmount} = renderHook(() => useTimeout(action, 1000));

            // Act
            unmount();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });

    describe("SchedulePolicies.OnDemand", () => {
        it("should not set the timer on creation", () => {
            // Arrange
            const {result} = renderHook(() =>
                useTimeout(() => {}, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act

            // Assert
            expect(result.current.isSet).toBe(false);
        });

        it("should not call action after timeoutMs if the timer hasn't been set", () => {
            // Arrange
            const action = jest.fn();
            renderHook(() =>
                useTimeout(action, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call action after timeoutMs if the timer has been set", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            result.current.set();
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should reset the timer after calling set() again", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            result.current.set();
            jest.advanceTimersByTime(500);
            result.current.set();
            jest.advanceTimersByTime(500);

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call the action after calling set() again", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            result.current.set();
            jest.advanceTimersByTime(500);
            result.current.set();
            jest.advanceTimersByTime(1000);

            // Assert
            expect(action).toHaveBeenCalled();
        });
    });
});
