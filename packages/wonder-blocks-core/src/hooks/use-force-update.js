// @flow
import * as React from "react";

/**
 * Hook for forcing a component to update on demand.
 *
 * @returns {() => void} A function that forces the component to update.
 */
export const useForceUpdate = (): (() => void) => {
    const [, setState] = React.useState(false);
    const forceUpdate = React.useCallback(
        () => setState((state) => !state),
        [],
    );
    return forceUpdate;
};
