import {renderHook, act} from "@testing-library/react";

import type {ITimeout, IInterval, IAnimationFrame} from "../../util/types";
import {useActionScheduler} from "../use-action-scheduler";

describe("useActionScheduler", () => {
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

    it("should return an IScheduleActions", () => {
        // Arrange
        const {result} = renderHook(() => useActionScheduler());

        // Act

        // Assert
        expect(result.current).toEqual(
            expect.objectContaining({
                timeout: expect.any(Function),
                interval: expect.any(Function),
                animationFrame: expect.any(Function),
                clearAll: expect.any(Function),
            }),
        );
    });

    it("should return a stable API across renders", () => {
        // Arrange
        const {result, rerender} = renderHook(() => useActionScheduler());
        const firstApi = result.current;

        // Act
        rerender();

        // Assert
        expect(result.current).toBe(firstApi);
    });

    describe("#timeout", () => {
        it("should schedule a timeout that fires after the given period", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useActionScheduler());

            // Act
            act(() => {
                result.current.timeout(action, 500);
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should return an ITimeout", () => {
            // Arrange
            const {result} = renderHook(() => useActionScheduler());
            let timeout: ITimeout = undefined!;

            // Act
            act(() => {
                timeout = result.current.timeout(() => {}, 500);
            });

            // Assert
            expect(timeout).toEqual(
                expect.objectContaining({
                    set: expect.any(Function),
                    clear: expect.any(Function),
                    isSet: expect.any(Boolean),
                }),
            );
        });
    });

    describe("#interval", () => {
        it("should schedule an interval that fires repeatedly", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useActionScheduler());

            // Act
            act(() => {
                result.current.interval(action, 500);
            });
            act(() => {
                jest.advanceTimersByTime(1501);
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(3);
        });

        it("should return an IInterval", () => {
            // Arrange
            const {result} = renderHook(() => useActionScheduler());
            let interval: IInterval = undefined!;

            // Act
            act(() => {
                interval = result.current.interval(() => {}, 500);
            });

            // Assert
            expect(interval).toEqual(
                expect.objectContaining({
                    set: expect.any(Function),
                    clear: expect.any(Function),
                    isSet: expect.any(Boolean),
                }),
            );
        });
    });

    describe("#animationFrame", () => {
        it("should schedule an animation frame that fires", () => {
            // Arrange
            const action = jest.fn();
            const {result} = renderHook(() => useActionScheduler());

            // Act
            act(() => {
                result.current.animationFrame(action);
            });
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(action).toHaveBeenCalledTimes(1);
        });

        it("should return an IAnimationFrame", () => {
            // Arrange
            const {result} = renderHook(() => useActionScheduler());
            let animationFrame: IAnimationFrame = undefined!;

            // Act
            act(() => {
                animationFrame = result.current.animationFrame(() => {});
            });

            // Assert
            expect(animationFrame).toEqual(
                expect.objectContaining({
                    set: expect.any(Function),
                    clear: expect.any(Function),
                    isSet: expect.any(Boolean),
                }),
            );
        });
    });

    describe("#clearAll", () => {
        it("should clear all pending actions", () => {
            // Arrange
            const timeoutAction = jest.fn();
            const intervalAction = jest.fn();
            const {result} = renderHook(() => useActionScheduler());

            act(() => {
                result.current.timeout(timeoutAction, 500);
                result.current.interval(intervalAction, 500);
            });

            // Act
            act(() => {
                result.current.clearAll();
            });
            act(() => {
                jest.advanceTimersByTime(1000);
            });

            // Assert
            expect(timeoutAction).not.toHaveBeenCalled();
            expect(intervalAction).not.toHaveBeenCalled();
        });
    });

    describe("unmounting", () => {
        it("should clear all pending actions on unmount", () => {
            // Arrange
            const action = jest.fn();
            const {result, unmount} = renderHook(() => useActionScheduler());

            act(() => {
                result.current.timeout(action, 500);
            });

            // Act
            act(() => {
                unmount();
            });
            act(() => {
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });

        it("should return noop actions after unmounting", () => {
            // Arrange
            const action = jest.fn();
            const {result, unmount} = renderHook(() => useActionScheduler());

            act(() => {
                unmount();
            });

            // Act
            act(() => {
                result.current.timeout(action, 500);
                jest.advanceTimersByTime(501);
            });

            // Assert
            expect(action).not.toHaveBeenCalled();
        });
    });
});
