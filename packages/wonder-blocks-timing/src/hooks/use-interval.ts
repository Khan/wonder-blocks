import {useEffect, useMemo, useRef} from "react";
import {ClearPolicy, ActionPolicy} from "../util/policies";

import type {IInterval, HookOptions} from "../util/types";

import Interval from "../util/interval";

/**
 * Hook providing access to a scheduled interval.
 *
 * @param action The action to be invoked each time the interval period has
 * passed. By default, this will not cause the interval to restart if it
 * changes. This makes it easier to use with inline lambda functions rather than
 * requiring consumers to wrap their action in a `useCallback`. To change this
 * behavior, see the `actionPolicy` option.
 * @param intervalMs The interval period. If this changes, the interval will
 * be reset per the `schedulePolicy` option.
 * @param options Options for the hook.
 * @param options.actionPolicy Determines how the action is handled when it
 * changes. By default, the action is replaced but the interval is not reset,
 * and the updated action will be invoked when the interval next fires.
 * If you want to reset the interval when the action changes, use
 * `ActionPolicy.Reset`.
 * @param options.clearPolicy Determines how the interval is cleared when the
 * component is unmounted or the interval is recreated. By default, the
 * interval is cleared immediately. If you want to let the interval run to
 * completion, use `ClearPolicy.Resolve`. This is NOT applied if the interval
 * is cleared manually via the `clear()` method on the returned API.
 * @param options.schedulePolicy Determines when the interval is scheduled.
 * By default, the interval is scheduled immediately. If you want to delay
 * scheduling the interval, use `SchedulePolicy.OnDemand`.
 * @returns An `IInterval` API for interacting with the given interval. This
 * API is a no-op if called when not mounted. This means that any calls prior
 * to mounting or after unmounting will not have any effect.
 */
export function useInterval(
    action: () => unknown,
    intervalMs: number,
    options: HookOptions = {},
): IInterval {
    const {actionPolicy, clearPolicy, schedulePolicy} = options;
    const actionProxyRef = useRef<() => unknown>(action);
    const intervalRef = useRef<IInterval | null>(null);

    // Since we are passing our proxy function to the interval instance,
    // it's check that the action is a function will never fail. So, we have to
    // do that check ourselves, and we do it here.
    if (typeof action !== "function") {
        throw new Error("Action must be a function");
    }

    // If we're rendered with an updated action, we want to update the ref
    // so the existing interval gets the new action, and then reset the
    // interval if our action policy calls for it.
    if (action !== actionProxyRef.current) {
        actionProxyRef.current = action;
        if (actionPolicy === ActionPolicy.Reset) {
            intervalRef.current?.set();
        }
    }

    // This effect updates the interval when the intervalMs, clearPolicy,
    // or schedulePolicy changes.
    useEffect(() => {
        // Make a new interval.
        intervalRef.current = new Interval(
            () => {
                actionProxyRef.current?.();
            },
            intervalMs,
            schedulePolicy,
        );

        // Clear the interval when the effect is cleaned up, if necessary,
        // making sure to use the clear policy.
        return () => {
            intervalRef.current?.clear(clearPolicy);
            intervalRef.current = null;
        };
    }, [intervalMs, clearPolicy, schedulePolicy]);

    // This is the API we expose to the consumer. We expose this rather than
    // the interval instance itself so that the API we give back is stable
    // even if the underlying interval instance changes.
    const externalApi = useMemo(
        () => ({
            set: () => {
                intervalRef.current?.set();
            },
            clear: (policy?: ClearPolicy) => {
                intervalRef.current?.clear(policy);
            },
            get isSet() {
                return intervalRef.current?.isSet ?? false;
            },
        }),
        [],
    );

    return externalApi;
}
