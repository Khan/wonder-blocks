// @flow
import * as React from "react";

/**
 * Runs a callback once on mount.
 *
 * If the callback returns a cleanup function, it will be called when the component is unmounted.
 *
 * @param {() => (void | (() => void))} callback function that forces the component to update.
 *
 * The following code snippets are equivalent
 * ```
 * useOnMountEffect(() => {
 *    doTheThing();
 * });
 * ```
 *
 * ```
 * useEffect(() => {
 *    doTheThing();
 * // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, []);
 */
export const useOnMountEffect = (callback: () => void | (() => void)): void => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(callback, []);
};
