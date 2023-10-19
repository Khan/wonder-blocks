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
 *    doSomethingOnMount();
 *    return () => {
 *        doSomethingOnUnmount();
 *    };
 * });
 * ```
 *
 * ```
 * useEffect(() => {
 *    doSomethingOnMount();
 *    return () => {
 *        doSomethingOnUnmount();
 *    };
 * // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, []);
 *
 * If you only need to do something on mount, don't return a cleanup function from `callback`.
 */
export const useOnMountEffect = (
    callback: () => void | undefined | (() => void),
): void => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(callback, []);
};
