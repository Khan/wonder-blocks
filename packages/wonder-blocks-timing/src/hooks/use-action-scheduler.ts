import {useEffect, useMemo, useRef} from "react";

import type {IScheduleActions} from "../util/types";

import ActionScheduler from "../util/action-scheduler";

/**
 * Hook providing access to an action scheduler for managing timeouts,
 * intervals, and animation frame requests. This is a hook-based alternative
 * to the `withActionScheduler` higher-order component.
 *
 * All pending actions are automatically cleared when the component unmounts.
 *
 * @returns An `IScheduleActions` API for scheduling timeouts, intervals, and
 * animation frames. The returned API is stable across renders. All actions
 * scheduled via this API will be cleared when the component unmounts.
 *
 * @example
 * function MyComponent() {
 *     const schedule = useActionScheduler();
 *
 *     const handleClick = () => {
 *         schedule.timeout(() => doSomething(), 1000);
 *     };
 *
 *     return <button onClick={handleClick}>Click me</button>;
 * }
 */
export function useActionScheduler(): IScheduleActions {
    const schedulerRef = useRef<ActionScheduler | null>(null);

    useEffect(() => {
        schedulerRef.current = new ActionScheduler();
        return () => {
            schedulerRef.current?.disable();
            schedulerRef.current = null;
        };
    }, []);

    // Return a stable memoized API that delegates to the ref, so the returned
    // object doesn't change across renders.
    const externalApi = useMemo(
        () => ({
            timeout: (
                ...args: Parameters<IScheduleActions["timeout"]>
            ): ReturnType<IScheduleActions["timeout"]> => {
                return (
                    schedulerRef.current?.timeout(...args) ??
                    ActionScheduler.NoopAction
                );
            },
            interval: (
                ...args: Parameters<IScheduleActions["interval"]>
            ): ReturnType<IScheduleActions["interval"]> => {
                return (
                    schedulerRef.current?.interval(...args) ??
                    ActionScheduler.NoopAction
                );
            },
            animationFrame: (
                ...args: Parameters<IScheduleActions["animationFrame"]>
            ): ReturnType<IScheduleActions["animationFrame"]> => {
                return (
                    schedulerRef.current?.animationFrame(...args) ??
                    ActionScheduler.NoopAction
                );
            },
            clearAll: (): void => {
                schedulerRef.current?.clearAll();
            },
        }),
        [],
    );

    return externalApi;
}
