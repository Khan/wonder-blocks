import {renderHook, act} from "@testing-library/react";
import {hookHarness} from "@khanacademy/wonder-blocks-testing-core";
import {SchedulePolicy, ClearPolicy, ActionPolicy} from "../../util/policies";

import {useTimeout} from "../use-timeout";

describe("useTimeout", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("throws if the action is not a function", () => {
        // Arrange
        const captureErrorFn = jest.fn();

        // Act
        renderHook(() => useTimeout(null as any, 1000), {
            wrapper: hookHarness({boundary: captureErrorFn}),
        });
        const result = captureErrorFn.mock.calls[0][0];

        // Assert
        expect(result).toEqual(Error("Action must be a function"));
    });

    it("throws if the period is less than 0", () => {
        // Arrange
        const captureErrorFn = jest.fn();

        // Act
        renderHook(() => useTimeout(() => {}, -1), {
            wrapper: hookHarness({boundary: captureErrorFn}),
        });
        const result = captureErrorFn.mock.calls[0][0];

        // Assert
        expect(result).toEqual(Error("Timeout period must be >= 0"));
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

    it("should call the action before unmounting if clear policy is ClearPolicy.Resolve", () => {
        // Arrange
        const action = jest.fn();
        const {unmount} = renderHook(() =>
            useTimeout(action, 1000, {
                clearPolicy: ClearPolicy.Resolve,
            }),
        );

        // Act
        act(() => {
            unmount();
        });

        // Assert
        expect(action).toHaveBeenCalled();
    });

    it("should call the current action if action is changed after setting", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) => useTimeout(action, 500),
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

    it("should only call setTimeout once even if action changes", () => {
        // Arrange
        const timeoutSpy = jest.spyOn(global, "setTimeout");
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) => useTimeout(action, 500),
            {
                initialProps: {action: action1},
            },
        );
        // Act
        rerender({action: action2});

        // Assert
        expect(timeoutSpy).toHaveBeenCalledOnce();
    });

    it("should not reset the timeout if the action changes", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) => useTimeout(action, 500),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        jest.advanceTimersByTime(250);
        rerender({action: action2});
        jest.advanceTimersByTime(251);

        // Assert
        expect(action1).not.toHaveBeenCalled();
        expect(action2).toHaveBeenCalledTimes(1);
    });

    it("should reset the timeout if the action changes and the action policy is Reset", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) =>
                useTimeout(action, 500, {actionPolicy: ActionPolicy.Reset}),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        jest.advanceTimersByTime(250);
        rerender({action: action2});
        jest.advanceTimersByTime(251);

        // Assert
        expect(action1).not.toHaveBeenCalled();
        expect(action2).not.toHaveBeenCalled();
    });

    it("should use the new timeout duration after changing it", () => {
        // Arrange
        const action = jest.fn();
        const {rerender} = renderHook(
            ({timeoutMs}: any) => useTimeout(action, timeoutMs),
            {
                initialProps: {timeoutMs: 500},
            },
        );
        rerender({timeoutMs: 1000});

        // Act
        jest.advanceTimersByTime(1501);

        // Assert
        expect(action).toHaveBeenCalledTimes(1);
    });

    it("should restart the timeout if intervalMs changes", () => {
        // Arrange
        const timeoutSpy = jest.spyOn(global, "setTimeout");
        const {rerender} = renderHook(
            ({timeoutMs}: any) => useTimeout(() => {}, timeoutMs),
            {
                initialProps: {timeoutMs: 500},
            },
        );

        // Act
        rerender({timeoutMs: 1000});

        // Assert
        expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 500);
        expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    describe("SchedulePolicy.Immediately", () => {
        it("should call the action after the timeout expires", () => {
            // Arrange
            const action = jest.fn();
            renderHook(() => useTimeout(action, 1000));

            // Act
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should update isSet to false after the timeout expires", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            act(() => {
                jest.advanceTimersByTime(1001);
            });

            // Assert
            expect(result.current.isSet).toBe(false);
        });

        it("should call the action again if 'set' is called after the action was called", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            act(() => {
                jest.advanceTimersByTime(1001);
            });
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.advanceTimersByTime(1001);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(2);
        });

        it("should restart the timeout if timeoutMs gets updated", () => {
            // Arrange
            const action = jest.fn();
            const {rerender} = renderHook(
                ({timeoutMs}: any) => useTimeout(action, timeoutMs),
                {
                    initialProps: {timeoutMs: 1000},
                },
            );

            // Act
            act(() => {
                jest.advanceTimersByTime(900);
            });
            rerender({timeoutMs: 500});
            act(() => {
                jest.advanceTimersByTime(100);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
            act((): void => jest.advanceTimersByTime(500));
            expect(action).toHaveBeenCalled();
        });

        it("should should timeout after the new timeoutMs if it gets updated", () => {
            // Arrange
            const action = jest.fn();
            const {rerender} = renderHook(
                ({timeoutMs}: any) => useTimeout(action, timeoutMs),
                {
                    initialProps: {timeoutMs: 1000},
                },
            );

            // Act
            rerender({timeoutMs: 500});
            act(() => {
                jest.advanceTimersByTime(500);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the new action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}: any) => useTimeout(action, 1000),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(action2).toHaveBeenCalled();
        });

        it("should not call the original action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}: any) => useTimeout(action, 1000),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(action1).not.toHaveBeenCalled();
        });

        it("should not call the action if the timeout is cleared", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            act(() => {
                result.current.clear();
            });
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call the action when the timeout is cleared when passing ClearPolicy.Resolve to clear()", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useTimeout(action, 1000));

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the action when the timeout is cleared when passing ClearPolicy.Resolve in options", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 1000, {
                    clearPolicy: ClearPolicy.Resolve,
                }),
            );

            // Act
            act(() => {
                result.current.clear();
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the action on unmount when using ClearPolicy.Resolve in options", () => {
            // Arrange
            const action = jest.fn();
            const {unmount} = renderHook(() =>
                useTimeout(action, 1000, {
                    clearPolicy: ClearPolicy.Resolve,
                }),
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

    describe("SchedulePolicy.OnDemand", () => {
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
            act(() => {
                jest.advanceTimersByTime(1000);
            });

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
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should reset the timer after calling set() again", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 750, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
                jest.advanceTimersByTime(501);
                result.current.set();
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call the action after calling set() again", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useTimeout(action, 500, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
                jest.advanceTimersByTime(501);
            });
            act(() => {
                result.current.set();
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(2);
        });
    });
});
