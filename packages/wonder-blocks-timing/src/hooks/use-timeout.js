// @flow
import {useEffect, useState, useCallback, useRef} from "react";

import {
    SchedulePolicy as SchedulePolicies,
    ClearPolicy as ClearPolicies,
} from "../util/policies.js";
import type {ITimeout, ClearPolicy, Options} from "../util/types.js";

export function useTimeout(
    action: () => mixed,
    timeoutMs: number,
    options?: Options,
): ITimeout {
    const schedulePolicy =
        options?.schedulePolicy ?? SchedulePolicies.Immediately;
    const [isActive, setIsActive] = useState(
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
            if ((policy ?? options?.clearPolicy) === ClearPolicies.Resolve) {
                actionRef.current();
            }
            // This will cause the useEffect below to re-run
            setIsActive(false);
        },
        [options?.clearPolicy],
    );

    const set = useCallback(() => {
        // This will cause the useEffect below to re-run
        setIsActive(true);
    }, []);

    useEffect(() => {
        if (isActive && mountedRef.current) {
            const timeout = window.setTimeout(() => {
                actionRef.current();
                setIsActive(false);
            }, timeoutMs);

            return () => {
                window.clearTimeout(timeout);
                if (!mountedRef.current) {
                    clear();
                }
            };
        }
    }, [clear, isActive, timeoutMs]);

    return {
        get isSet() {
            return isActive;
        },
        set,
        clear,
    };
}
