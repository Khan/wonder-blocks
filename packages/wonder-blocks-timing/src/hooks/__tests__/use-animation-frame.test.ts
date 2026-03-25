import {renderHook, act} from "@testing-library/react";
import {hookHarness} from "@khanacademy/wonder-blocks-testing-core";
import {SchedulePolicy, ClearPolicy, ActionPolicy} from "../../util/policies";

import {useAnimationFrame} from "../use-animation-frame";

describe("useAnimationFrame", () => {
    beforeEach(() => {
        // Exclude rAF/cAF from sinon's fake timers so our spies wrap jsdom's
        // originals. After restoreAllMocks(), RTL auto-cleanup calls jsdom's
        // cancelAnimationFrame (which safely ignores unknown IDs) rather than
        // sinon's fake (which throws when given a setTimeout ID).
        jest.useFakeTimers({
            doNotFake: ["requestAnimationFrame", "cancelAnimationFrame"],
        });

        // Map rAF/cAF to fake setTimeout/clearTimeout so we can control frame
        // firing with jest.runOnlyPendingTimers().
        jest.spyOn(global, "requestAnimationFrame").mockImplementation(
            (fn: any) => setTimeout(fn, 0) as any,
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation(
            (id: any) => clearTimeout(id),
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("throws if the action is not a function", () => {
        // Arrange
        const captureErrorFn = jest.fn();

        // Act
        renderHook(() => useAnimationFrame(null as any), {
            wrapper: hookHarness({boundary: captureErrorFn}),
        });
        const result = captureErrorFn.mock.calls[0][0];

        // Assert
        expect(result).toEqual(Error("Action must be a function"));
    });

    it("should return an IAnimationFrame", () => {
        // Arrange
        const {result} = renderHook(() => useAnimationFrame(() => {}));

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
        const {result} = renderHook(() => useAnimationFrame(() => {}));

        // Act

        // Assert
        expect(result.current.isSet).toBe(true);
    });

    it("should call the action before unmounting if clear policy is ClearPolicy.Resolve", () => {
        // Arrange
        const action = jest.fn();
        const {unmount} = renderHook(() =>
            useAnimationFrame(action, {
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
            ({action}: any) => useAnimationFrame(action),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});
        act(() => {
            jest.runOnlyPendingTimers();
        });

        // Assert
        expect(action2).toHaveBeenCalledTimes(1);
    });

    it("should only call requestAnimationFrame once even if action changes", () => {
        // Arrange
        const rafSpy = jest.spyOn(global, "requestAnimationFrame");
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) => useAnimationFrame(action),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});

        // Assert
        expect(rafSpy).toHaveBeenCalledOnce();
    });

    it("should not reset the request if the action changes", () => {
        // Arrange
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) => useAnimationFrame(action),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});
        act(() => {
            jest.runOnlyPendingTimers();
        });

        // Assert
        expect(action1).not.toHaveBeenCalled();
        expect(action2).toHaveBeenCalledTimes(1);
    });

    it("should reset the request if the action changes and the action policy is Reset", () => {
        // Arrange
        const rafSpy = jest.spyOn(global, "requestAnimationFrame");
        const action1 = jest.fn();
        const action2 = jest.fn();
        const {rerender} = renderHook(
            ({action}: any) =>
                useAnimationFrame(action, {actionPolicy: ActionPolicy.Reset}),
            {
                initialProps: {action: action1},
            },
        );

        // Act
        rerender({action: action2});

        // Assert
        // Should have been called twice: once on mount, once on action reset
        expect(rafSpy).toHaveBeenCalledTimes(2);
    });

    describe("SchedulePolicy.Immediately", () => {
        it("should call the action when the frame fires", () => {
            // Arrange
            const action = jest.fn();
            renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should update isSet to false after the frame fires", () => {
            // Arrange
            const {result} = renderHook(() => useAnimationFrame(() => {}));

            // Act
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(result.current.isSet).toBe(false);
        });

        it("should call the action again if 'set' is called after the action was called", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                jest.runOnlyPendingTimers();
            });
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(2);
        });

        it("should call the new action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}: any) => useAnimationFrame(action),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action2).toHaveBeenCalled();
        });

        it("should not call the original action after re-rendering with a new action", () => {
            // Arrange
            const action1 = jest.fn();
            const action2 = jest.fn();
            const {rerender} = renderHook(
                ({action}: any) => useAnimationFrame(action),
                {
                    initialProps: {action: action1},
                },
            );

            // Act
            rerender({action: action2});
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action1).not.toHaveBeenCalled();
        });

        it("should not call the action if the request is cleared", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                result.current.clear();
            });
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call the action when the request is cleared with ClearPolicy.Resolve passed to clear()", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should call the action when the request is cleared with ClearPolicy.Resolve in options", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useAnimationFrame(action, {
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
                useAnimationFrame(action, {
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
            const {unmount} = renderHook(() => useAnimationFrame(action));

            // Act
            unmount();

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });

    describe("SchedulePolicy.OnDemand", () => {
        it("should not set the request on creation", () => {
            // Arrange
            const {result} = renderHook(() =>
                useAnimationFrame(() => {}, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act

            // Assert
            expect(result.current.isSet).toBe(false);
        });

        it("should not call action if the request hasn't been set", () => {
            // Arrange
            const action = jest.fn();
            renderHook(() =>
                useAnimationFrame(action, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should call action after the frame fires when set() is called", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useAnimationFrame(action, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
            });
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).toHaveBeenCalled();
        });

        it("should reset the request after calling set() again", () => {
            // Arrange
            const rafSpy = jest.spyOn(global, "requestAnimationFrame");
            const action = jest.fn();
            const {result} = renderHook(() =>
                useAnimationFrame(action, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
                result.current.set();
            });

            // Assert
            // Called twice: initial set, then reset when set() called again
            expect(rafSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe("isSet", () => {
        it("is false when the request has not been set [SchedulePolicy.OnDemand]", () => {
            // Arrange
            const {result} = renderHook(() =>
                useAnimationFrame(() => {}, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeFalsy();
        });

        it("is true when the request is pending", () => {
            // Arrange
            const {result} = renderHook(() => useAnimationFrame(() => {}));

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeTruthy();
        });

        it("is false when the request is cleared", () => {
            // Arrange
            const {result} = renderHook(() => useAnimationFrame(() => {}));
            act(() => {
                result.current.clear();
            });

            // Act
            const isSet = result.current.isSet;

            // Assert
            expect(isSet).toBeFalsy();
        });
    });

    describe("#set", () => {
        it("should call requestAnimationFrame", () => {
            // Arrange
            const rafSpy = jest.spyOn(global, "requestAnimationFrame");
            const {result} = renderHook(() =>
                useAnimationFrame(() => {}, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.set();
            });

            // Assert
            expect(rafSpy).toHaveBeenCalledTimes(1);
        });

        it("shouldn't throw an error if called after the component unmounted", () => {
            // Arrange
            const {result, unmount} = renderHook(() =>
                useAnimationFrame(() => {}),
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
        it("should clear a pending request", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                result.current.clear();
            });
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should invoke the action if clear policy is ClearPolicy.Resolve from hook options", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useAnimationFrame(action, {
                    clearPolicy: ClearPolicy.Resolve,
                }),
            );

            // Act
            act(() => {
                result.current.clear();
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should invoke the action if clear policy is explicitly ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useAnimationFrame(action));

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should not invoke the action if request is inactive and clear policy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() =>
                useAnimationFrame(action, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                }),
            );

            // Act
            act(() => {
                result.current.clear(ClearPolicy.Resolve);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not call the action on unmount if the request is not pending when the clearPolicy is ClearPolicy.Resolve", () => {
            // Arrange
            const action = jest.fn();
            const {unmount} = renderHook(() =>
                useAnimationFrame(action, {
                    schedulePolicy: SchedulePolicy.OnDemand,
                    clearPolicy: ClearPolicy.Resolve,
                }),
            );

            // Act
            act(() => {
                unmount();
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should not error if calling clear() after unmounting", () => {
            // Arrange
            const {result, unmount} = renderHook(() =>
                useAnimationFrame(() => {}),
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
