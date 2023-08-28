import * as React from "react";

import Server from "../util/server";

/**
 * Hook to provide a function for determining component mounted state.
 *
 * NOTE: Inspired by https://github.com/juliencrn/usehooks-ts/blob/d5f3de88cc319c790f2a4e90ba6a8904298957a5/src/useIsMounted/useIsMounted.ts
 *
 * When clientside, this uses `useLayoutEffect` so that the mounted value is
 * set before any child effects execute. This more closely mirrors the old
 * `componentDidMount` lifecycle method.
 *
 * This returns a callback to access the mounted state as components should not
 * be reactive to the mounted state, but instead should be accessing it in
 * callbacks to guard against setting state on an unmounted component.
 *
 * @returns {() => boolean} A function that returns the component mounted state.
 */
export const useIsMounted = (): (() => boolean) => {
    const isMountedRef = React.useRef<boolean>(false);
    const isMounted = React.useCallback(() => isMountedRef.current, []);

    // We are breaking the rules of hooks here by calling a hook conditionally,
    // but that's OK since effects don't run on the server anyway. If we don't
    // do this, `useLayoutEffect` will give an error when rendered on the
    // server.
    //
    // We capture this in a ref so that we only do the conditional check once
    // in the lifetime of this hook.
    const effectCallRef = React.useRef(
        Server.isServerSide()
            ? () => {
                  /*noop*/
              }
            : React.useLayoutEffect,
    );

    // We are breaking the rules of hooks here, but that's OK.
    // Effects don't run on the server anyway, but `useLayoutEffect` will
    // throw if we tried to use it in that context, so we have to be
    // conditional.
    effectCallRef.current(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return isMounted;
};
