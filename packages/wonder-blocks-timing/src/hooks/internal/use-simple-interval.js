// @flow
import {useEffect} from "react";

import {useUpdatingRef} from "./use-updating-ref.js";

/**
 * A simple hook for using `setInterval`.
 *
 * @param action called every `intervalMs` when `isSet` is true
 * @param intervalMs the duration between calls to `action`
 * @param active whether or not the interval is active
 */
export function useSimpleInterval(
    action: () => mixed,
    intervalMs: number,
    active: boolean,
) {
    // We using a ref instead of a callback for `action` to avoid resetting
    // the interval whenever the `action` changes.
    const actionRef = useUpdatingRef(action);

    useEffect(() => {
        if (active) {
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
    }, [action, intervalMs, active, actionRef]);
}
