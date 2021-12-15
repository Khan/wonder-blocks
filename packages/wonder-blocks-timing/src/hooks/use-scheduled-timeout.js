// @flow
import {useEffect, useState, useCallback} from "react";

import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "../util/policies.js";
import type {ITimeout, ClearPolicy, Options} from "../util/types.js";

import {useUpdatingRef} from "./internal/use-updating-ref.js";
import {useTimeout} from "./use-timeout.js";

export function useScheduledTimeout(
    action: () => mixed,
    timeoutMs: number,
    options?: Options,
): ITimeout {
    if (typeof action !== "function") {
        throw new Error("Action must be a function");
    }

    if (timeoutMs < 0) {
        throw new Error("Timeout period must be >= 0");
    }

    const schedulePolicy =
        options?.schedulePolicy ?? SchedulePolicies.Immediately;

    const [isSet, setIsSet] = useState(
        schedulePolicy === SchedulePolicies.Immediately,
    );

    const set = useCallback(() => setIsSet(true), []);

    // This wrapper isn't present in useScheduledInterval because we
    // don't need to update `isSet` in that situations.
    const wrappedAction = useCallback(() => {
        setIsSet(false);
        action();
    }, [action]);

    const actionRef = useUpdatingRef(wrappedAction);

    const clear = useCallback(
        (policy?: ClearPolicy) => {
            policy = policy ?? options?.clearPolicy;
            if (isSet && policy === ClearPolicies.Resolve) {
                actionRef.current();
            }
            setIsSet(false);
        },
        // react-hooks/exhaustive-deps doesn't require refs to be
        // listed in the deps array.  Unfortunately, in this situation
        // it doesn't recognized actionRef as a ref.
        [actionRef, isSet, options?.clearPolicy],
    );

    const runOnUnmountRef = useUpdatingRef(
        isSet && options?.clearPolicy === ClearPolicies.Resolve,
    );

    useEffect(() => {
        return () => {
            // This code will only run with the component using this
            // hook is unmounted.
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (runOnUnmountRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                actionRef.current();
            }
        };
        // This eslint rule doesn't realize actionRef and runOnUnmountRef
        // a both refs and thus do not have to be listed as deps.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useTimeout(wrappedAction, timeoutMs, isSet);

    return {isSet, set, clear};
}
