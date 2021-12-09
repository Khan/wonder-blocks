// @flow
import {useEffect, useRef} from "react";

/**
 * Returns `true` if the component is currently mount and `false`
 * if it is not.
 * @returns {boolean}
 */
export const useMountedRef = (): {|current: boolean|} => {
    const ref = useRef<boolean>(false);
    useEffect(() => {
        ref.current = true;
        return () => {
            ref.current = false;
        };
    }, []);
    return ref;
};
