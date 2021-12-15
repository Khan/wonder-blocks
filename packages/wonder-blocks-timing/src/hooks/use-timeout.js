// @flow
import {useEffect} from "react";

import {useUpdatingRef} from "./internal/use-updating-ref.js";

/**
 * A simple hook for using `setTimeout`.
 *
 * @param action called after `timeoutMs` when `active` is true
 * @param timeoutMs the duration after which `action` is called
 * @param active whether or not the interval is active
 */
export function useTimeout(
    action: () => mixed,
    timeoutMs: number,
    active: boolean,
) {
    // We using a ref instead of a callback for `action` to avoid resetting
    // the interval whenever the `action` changes.
    const actionRef = useUpdatingRef(action);

    useEffect(() => {
        if (active) {
            const timeoutId = setTimeout(() => {
                actionRef.current();
            }, timeoutMs);

            return () => {
                clearTimeout(timeoutId);
            };
        }
        // actionRef isn't actually required, but react-hooks/exhaustive-deps
        // doesn't recognize it as a ref and thus complains if it isn't in the
        // deps list.  It isn't a big deal though since the value ofactionRef
        // never changes (only its contents do).
    }, [timeoutMs, active, actionRef]);
}
