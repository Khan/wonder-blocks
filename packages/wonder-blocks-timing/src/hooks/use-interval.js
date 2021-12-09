// @flow
import {useEffect, useState, useCallback, useRef} from "react";

import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "../util/policies.js";
import type {IInterval, ClearPolicy, Options} from "../util/types.js";

export function useInterval(
    action: () => mixed,
    intervalMs: number,
    options?: Options,
): IInterval {
    if (typeof action !== "function") {
        throw new Error("Action must be a function");
    }

    if (intervalMs < 1) {
        throw new Error("Interval period must be >= 1");
    }

    const schedulePolicy =
        options?.schedulePolicy ?? SchedulePolicies.Immediately;
    const [isSet, setIsSet] = useState(
        schedulePolicy === SchedulePolicies.Immediately,
    );
    const actionRef = useRef(action);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        actionRef.current = action;
    }, [action]);

    const clear = useCallback(
        (policy?: ClearPolicy) => {
            if (
                isSet &&
                (policy ?? options?.clearPolicy) === ClearPolicies.Resolve
            ) {
                actionRef.current();
            }
            // This will cause the useEffect below to re-run
            setIsSet(false);
        },
        [isSet, options?.clearPolicy],
    );

    const set = useCallback(() => {
        if (!isSet) {
            // This will cause the useEffect below to re-run
            setIsSet(true);
        }
    }, [isSet]);

    useEffect(() => {
        if (isSet && mountedRef.current) {
            const timeout = setInterval(() => {
                actionRef.current();
            }, intervalMs);

            return () => {
                clearInterval(timeout);
                if (!mountedRef.current) {
                    clear();
                }
            };
        }
    }, [clear, isSet, intervalMs]);

    return {isSet, set, clear};
}
