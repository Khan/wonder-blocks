import * as React from "react";

/**
 * Hook for forcing a component to update on demand.
 *
 * This is for use inside other hooks that do some advanced
 * trickery with storing state outside of React's own state
 * mechanisms. As such this should never be called directly
 * outside of a hook, and more often than not, is the wrong
 * choice for whatever you are trying to do. If in doubt,
 * don't use it.
 *
 * @returns {() => void} A function that forces the component to update.
 */
export const useForceUpdate = (): (() => void) => {
    const updatePendingRef = React.useRef(false);
    const [, setUpdateToggle] = React.useState(false);

    const forceUpdate = React.useCallback(() => {
        if (updatePendingRef.current) {
            // If an update is already pending, then we do nothing.
            return;
        }

        // Otherwise, if we haven't been asked to force an update since our
        // last render then we toggle the state to invoke a render.
        setUpdateToggle((toggle) => !toggle);
        updatePendingRef.current = true;
    }, []);

    // Reset to false when we've rendered.
    // This ensures that we reset our counter the next time we're asked to
    // force an update.
    updatePendingRef.current = false;

    return forceUpdate;
};
