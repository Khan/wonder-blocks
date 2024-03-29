import * as React from "react";

/**
 * Hook to provide a function for determining component mounted state.
 *
 * NOTE: Inspired by https://github.com/juliencrn/usehooks-ts/blob/d5f3de88cc319c790f2a4e90ba6a8904298957a5/src/useIsMounted/useIsMounted.ts
 *
 * This returns a callback to access the mounted state as components should not
 * be reactive to the mounted state, but instead should be accessing it in
 * callbacks to guard against setting state on an unmounted component.
 *
 * NOTE: This marks the component as mounted after the initial render.
 * Therefore, if you were to use the return value of the `isMounted` before
 * the initial render is complete (i.e. inside a `useLayoutEffect` or an
 * event handler subscribed before the initial render completes), the value
 * will be `false`.
 *
 * @returns {() => boolean} A function that returns the component mounted state.
 */
export const useIsMounted = (): (() => boolean) => {
    const isMountedRef = React.useRef<boolean>(false);
    const isMounted = React.useCallback(() => isMountedRef.current, []);

    React.useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return isMounted;
};
