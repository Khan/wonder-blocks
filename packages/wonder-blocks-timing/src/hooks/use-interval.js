// @flow
import {useEffect, useState, useCallback, useRef} from "react";

import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "../util/policies.js";
import type {IInterval, ClearPolicy, Options} from "../util/types.js";

/**
 * Returns `true` if the component is currently mount and `false`
 * if it is not.
 * @returns {boolean}
 */
const useMounted = () => {
    const ref = useRef<boolean>(false);
    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    }, []);
    return ref;
};

/**
 * Returns a ref whose .current value is updated whenever
 * the `value` passed to this hook changes.
 * @returns {{current: T}}
 */
const useUpdatingRef = <T>(value: T): {|current: T|} => {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
};

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
    const actionRef = useUpdatingRef(action);
    const isMounted = useMounted();

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
        [actionRef, isSet, options?.clearPolicy],
    );

    const set = useCallback(() => {
        if (!isSet) {
            // This will cause the useEffect below to re-run
            setIsSet(true);
        }
    }, [isSet]);

    useEffect(() => {
        if (isSet && isMounted) {
            const intervalId = setInterval(() => {
                actionRef.current();
            }, intervalMs);

            return () => {
                clearInterval(intervalId);
                if (!isMounted) {
                    clear();
                }
            };
        }
    }, [actionRef, clear, isSet, intervalMs, isMounted]);

    return {isSet, set, clear};
}
