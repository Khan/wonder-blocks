// @flow
import {useEffect, useRef} from "react";

/**
 * Returns a ref whose .current value is updated whenever
 * the `value` passed to this hook changes.
 * @returns {{current: T}}
 */
export const useUpdatingRef = <T>(value: T): {|current: T|} => {
    const ref = useRef<T>(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
};
