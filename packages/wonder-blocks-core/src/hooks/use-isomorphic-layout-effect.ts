import * as React from "react";

import Server from "../util/server";

/**
 * Hook that works like useLayoutEffect but does not error on the server.
 *
 * Effects from `useLayoutEffect` cause errors on the server. Rather than
 * erroring, we want the server side to just silently no-op like `useEffect`
 * calls do. This hook allows that.
 */
export const useIsomorphicLayoutEffect: typeof React.useLayoutEffect = (
    ...args
): void => {
    // We are breaking the rules of hooks here by calling a hook conditionally,
    // but that's OK since effects don't run on the server anyway. If we don't
    // do this, `useLayoutEffect` will give an error when rendered on the
    // server.
    //
    // We capture this in a ref so that we only do the conditional check once
    // in the lifetime of this hook. We don't do this on import so that this
    // hook and uses of it are easier to test - setting the behavior on import
    // means having to isolate imports in tests which makes tests harder to
    // write.
    const effectCallRef = React.useRef(
        Server.isServerSide()
            ? () => {
                  /*noop*/
              }
            : React.useLayoutEffect,
    );

    effectCallRef.current(...args);
};
