import {useEffect, useMemo, useRef} from "react";
import {ClearPolicy, ActionPolicy} from "../util/policies";

import type {ITimeout, HookOptions} from "../util/types";

import Timeout from "../util/timeout";

/**
 * Hook providing access to a scheduled timeout.
 *
 * @param action The action to be invoked when the timeout period has
 * passed. By default, this will not cause the timeout to restart if it changes.
 * This makes it easier to use with inline lambda functions rather than
 * requiring consumers to wrap their action in a `useCallback`. To change
 * this behavior, see the `actionPolicy` option.
 * @param timeoutMs The timeout period. If this changes, the timeout will
 * be reset per the `schedulePolicy` option.
 * @param options Options for the hook.
 * @param options.actionPolicy Determines how the action is handled when it
 * changes. By default, the action is replaced but the timeout is not reset,
 * and the updated action will be invoked when the timeout next fires.
 * If you want to reset the timeout when the action changes, use
 * `ActionPolicy.Reset`.
 * @param options.clearPolicy Determines how the timeout is cleared when the
 * component is unmounted or the timeout is recreated. By default, the
 * timeout is cleared immediately. If you want to let the timeout run to
 * completion, use `ClearPolicy.Resolve`. This is NOT applied if the timeout
 * is cleared manually via the `clear()` method on the returned API.
 * @param options.schedulePolicy Determines when the timeout is scheduled.
 * By default, the timeout is scheduled immediately. If you want to delay
 * scheduling the timeout, use `SchedulePolicy.OnDemand`.
 * @returns An `ITimeout` API for interacting with the given timeout. This
 * API is a no-op if called when not mounted. This means that any calls prior
 * to mounting or after unmounting will not have any effect. This API is
 * not reactive, so do not deconstruct the return value, but instead
 * dereference it at the time of use.
 */
export function useTimeout(
    action: () => unknown,
    timeoutMs: number,
    options: HookOptions = {},
): ITimeout {
    const {actionPolicy, clearPolicy, schedulePolicy} = options;
    const actionProxyRef = useRef<() => unknown>(action);
    const timeoutRef = useRef<ITimeout | null>(null);

    // Since we are passing our proxy function to the timeout instance,
    // it's check that the action is a function will never fail. So, we have to
    // do that check ourselves, and we do it here.
    if (typeof action !== "function") {
        throw new Error("Action must be a function");
    }

    // If we're rendered with an updated action, we want to update the ref
    // so the existing timeout gets the new action, and then reset the
    // timeout if our action policy calls for it.
    if (action !== actionProxyRef.current) {
        actionProxyRef.current = action;
        if (actionPolicy === ActionPolicy.Reset) {
            timeoutRef.current?.set();
        }
    }

    // This effect updates the timeout when the timeoutMs, clearPolicy,
    // or schedulePolicy changes.
    useEffect(() => {
        // Make a new timeout.
        timeoutRef.current = new Timeout(
            () => {
                actionProxyRef.current?.();
            },
            timeoutMs,
            schedulePolicy,
        );

        // Clear the interval when the effect is cleaned up, if necessary,
        // making sure to use the clear policy.
        return () => {
            timeoutRef.current?.clear(clearPolicy);
            timeoutRef.current = null;
        };
    }, [timeoutMs, clearPolicy, schedulePolicy]);

    // This is the API we expose to the consumer. We expose this rather than
    // the interval instance itself so that the API we give back is stable
    // even if the underlying interval instance changes.
    const externalApi = useMemo(
        () => ({
            set: () => {
                timeoutRef.current?.set();
            },
            clear: (policy: ClearPolicy | undefined = clearPolicy) => {
                // Note that we default to the clear policy passed to the hook
                // so that this works as folks might expect.
                timeoutRef.current?.clear(policy);
            },
            get isSet() {
                return timeoutRef.current?.isSet ?? false;
            },
        }),
        [clearPolicy],
    );

    return externalApi;
}
