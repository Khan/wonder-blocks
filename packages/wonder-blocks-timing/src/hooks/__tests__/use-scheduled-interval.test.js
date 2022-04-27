// @flow
import {renderHook, act} from "@testing-library/react-hooks";
import {SchedulePolicy, ClearPolicy} from "../../util/policies.js";

import {useScheduledInterval} from "../use-scheduled-interval.js";

describe("useScheduledInterval", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("throws if the action is not a function", () => {
        // Arrange

        // Act
        const {result} = renderHook(() =>
            useScheduledInterval((null: any), 1000),
        );

        // Assert
        expect(result.error).toEqual(Error("Action must be a function"));
    });

    it("throws if the period is less than 1", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useScheduledInterval(() => {}, 0));

        // Assert
        expect(result.error).toEqual(Error("Interval period must be >= 1"));
    });

    it("sets an interval when schedule policy is SchedulePolicy.Immediately", () => {
        // Arrange
        const intervalSpy = jest.spyOn(global, "setInterval");

        // Act
        renderHook(() => useScheduledInterval(() => {}, 1000));

        // Assert
        expect(intervalSpy).toHaveBeenCalledTimes(1);
    });

    it("should call the action before unmounting", () => {
        const action = jest.fn();
        const {unmount} = renderHook(() =>
            useScheduledInterval(action, 1000, {
                clearPolicy: ClearPolicy.Resolve,
            }),
        );

        act(() => {
            unmount();
        });

        expect(action).toHaveBeenCalled();
    });

    it("should call the current action", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}) => useScheduledInterval(action, 500),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});
        jest.advanceTimersByTime(501);

        // Assert
        expect(action2).toHaveBeenCalledTimes(1);
    });

    it("should only call setInterval once even if action changes", () => {
        // Arrange
        const intervalSpy = jest.spyOn(global, "setInterval");
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}) => useScheduledInterval(action, 500),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});

        // Assert
        expect(intervalSpy).toHaveBeenCalledTimes(1);
    });

    it("should use the new interval after changing it", () => {
        // Arrange
        const action = jest.fn();
        const {rerender} = renderHook(
            ({intervalMs}) => useScheduledInterval(action, intervalMs),
            {
                initialProps: {intervalMs: 500},
            },
        );
        rerender({intervalMs: 1000});

        // Act
        jest.advanceTimersByTime(1501);

        // Assert
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("should restart the interval if intervalMs changes", () => {
        // Arrange
        const intervalSpy = jest.spyOn(global, "setInterval");
        const {rerender} = renderHook(
            ({intervalMs}) => useScheduledInterval(() => {}, intervalMs),
            {
                initialProps: {intervalMs: 500},
            },
        );

        // Act
        rerender({intervalMs: 1000});

        // Assert
        expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), 500);
        expect(intervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    describe("isSet", () => {
        it("is false when the interval has not been set [SchedulePolicy.OnDemand]", () => {
            // Arrange
            const {result} = renderHook(() =>
                useScheduledInterval(() => {}, 1000, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeFalsy();
        });

        it("is true when the interval is active", () => {
            // Arrange
            const {result} = renderHook(() =>
                useScheduledInterval(() => {}, 1000),
            );
            act(() => {
                result.current.set();
            });

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeTruthy();
        });

        it("is false when the interval is cleared", () => {
            // Arrange
            const {result} = renderHook(() =>
                useScheduledInterval(() => {}, 1000),
            );
            act(() => {
                result.current.set();
                result.current.clear();
            });

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeFalsy();
        });
    });

    describe("#set", () => {
        it("should call setInterval", () => {
            // Arrange
            const intervalSpy = jest.spyOn(global, "setInterval");
            const {result} = renderHook(() =>
                useScheduledInterval(() => {}, 500, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
            });

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
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            act(() => {
                result.current.set();
            });
            const scheduledAction = intervalSpy.mock.calls[0][0];

            // Act
            scheduledAction();

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should clear the active interval", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                result.current.set();
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should set an interval that stays active while not cleared", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                jest.advanceTimersByTime(1501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(3);
        });

        it("should continue to be set after calling it multiple times", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should set the timeout after clearing it", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                result.current.clear();
            });

            // Act
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("shouldn't throw an error if called after the component unmounted", () => {
            const action = jest.fn();
            const {result, unmount} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                unmount();
            });

            // Act
            const underTest = () => result.current.set();

            // Assert
            expect(underTest).not.toThrow();
        });
    });

    describe("#clear", () => {
        it("should clear an active interval", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                result.current.clear();
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    clearPolicy: ClearPolicy.Resolve,
                }),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if clear policy is ClearPolicy.Cancel", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    schedulePolicy: SchedulePolicy.Immediately,
                }),
            );
            act(() => {
                result.current.set();
            });

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Cancel);
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not invoke the action if interval is inactive and clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not call the action again on unmount if it's already been cleared", () => {
            // Arrange
            const action = jest.fn();
            const {result, unmount} = renderHook(() =>
                useScheduledInterval(action, 500, {
                    clearPolicy: ClearPolicy.Resolve,
                }),
            );

            // Act
            act(() => {
                result.current.clear();
            });
            act(() => {
                unmount();
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not error if calling clear() after unmounting", () => {
            // Arrange
            const action = jest.fn();
            const {result, unmount} = renderHook(() =>
                useScheduledInterval(action, 500),
            );
            act(() => {
                unmount();
            });

            // Act
            const underTest = () => result.current.clear();

            // Assert
            expect(underTest).not.toThrow();
        });
    });
});
