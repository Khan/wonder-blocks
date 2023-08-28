import * as React from "react";

import Server from "../util/server";

/**
 * Hook that works like useLayoutEffect but does not error on the server.
 *
 * DO NOT use this effect to mutate the DOM - that will cause hydration errors.
 * This should solely be used for functionality like event handler setup that
 * does not affect the rendered HTML output.
 *
 * Effects from `useLayoutEffect` cause errors on the server because they could
 * include changes to the rendered output that cannot be sent by the server.
 * However, sometimes we just need to update event handlers or some other state
 * that won't affect the current render. In those cases, rather than erroring,
 * we want the server side to just silently no-op like `useEffect` calls do.
 * This hook allows that.
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
