// @flow
import {useEffect} from "react";

import {useUpdatingRef} from "./use-updating-ref.js";

/**
 * A simple hook for using `setInterval`.
 *
 * @param action called every `intervalMs` when `isSet` is true
 * @param intervalMs the duration between calls to `action`
 * @param isSet whether or not the interval is active
 */
export function useSimpleInterval(
    action: () => mixed,
    intervalMs: number,
    isSet: boolean,
) {
    const actionRef = useUpdatingRef(action);

    useEffect(() => {
        if (isSet) {
            const intervalId = setInterval(() => {
                actionRef.current();
            }, intervalMs);

            return () => {
                clearInterval(intervalId);
            };
        }
        // react-hooks/exhaustive-deps doesn't require refs to be
        // listed in the deps array.  Unfortunately, in this situation
        // it doesn't recognized actionRef as a ref.
    }, [action, actionRef, intervalMs, isSet]);
}
