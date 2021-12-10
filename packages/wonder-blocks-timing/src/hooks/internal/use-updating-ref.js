// @flow
import {useEffect, useRef} from "react";

/**
 * Returns a ref whose .current value is updated whenever
 * the `value` passed to this hook changes.
 *
 * this is great for values that you want to reference from
 * within a useCallback or useEffect event listener, without
 * re-triggering the effect when the value changes
 *
 * @returns {{current: T}}
 */
export const useUpdatingRef = <T>(value: T): {|current: T|} => {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
};
