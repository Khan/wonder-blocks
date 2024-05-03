import {useEffect, useMemo, useRef} from "react";
import {ClearPolicy, ActionPolicy} from "../util/policies";

import type {ITimeout, HookOptions} from "../util/types";

import Timeout from "../util/timeout";

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
            clear: (policy?: ClearPolicy) => {
                timeoutRef.current?.clear(policy);
            },
            get isSet() {
                return timeoutRef.current?.isSet ?? false;
            },
        }),
        [],
    );

    return externalApi;
}
