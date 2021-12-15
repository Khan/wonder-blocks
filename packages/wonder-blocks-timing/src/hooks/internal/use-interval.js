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
export function useInterval(
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
        // actionRef isn't actually required, but react-hooks/exhaustive-deps
        // doesn't recognize it as a ref and thus complains if it isn't in the
        // deps list.  It isn't a big deal though since the value ofactionRef
        // never changes (only its contents do).
    }, [intervalMs, active, actionRef]);
}
