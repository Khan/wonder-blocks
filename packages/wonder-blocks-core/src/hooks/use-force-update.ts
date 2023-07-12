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
    const [, setUpdateState] = React.useState({});

    const forceUpdate = React.useCallback(() => {
        // We leverage here that every new object instance will be seen
        // as a state change. This is a little hacky but it works better than
        // a boolean that would just flip-flop and could not trigger a render,
        // or a random number that could repeat values and also then not
        // trigger a render. This will always work.
        setUpdateState({});
    }, []);

    return forceUpdate;
};
