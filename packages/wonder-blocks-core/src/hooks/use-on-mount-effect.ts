import * as React from "react";

/**
 * Runs a callback once on mount.
 *
 * If the callback returns a cleanup function, it will be called when the component is unmounted.
 *
 * @param {(isMountedRef: React.MutableRefObject<boolean>) => void | (() => void)} callback function that forces the component to update.
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
 *
 * If your callback is async, use the `isMountedRef` ref that's passed to the callback to ensure
 * that the component using `useOnMountEffect` hasn't been unmounted, e.g.
 *
 * ```
 * const MyComponent = () => {
 *    const [foo, setFoo] = React.useState("");
 *    useOnMountEffect((isMountedRef) => {
 *        const action = async () => {
 *            const res = await fetch("/foo");
 *            const text = res.text();
 *            if (isMountedRef.current) {
 *                setFoo(text);
 *            }
 *        }
 *
 *        action();
 *    });
 *
 *    return foo !== "" ? <h1>Loading...</h1> : <h1>{foo}</h1>;
 * }
 */
export const useOnMountEffect = (
    callback: (
        isMountedRef: React.MutableRefObject<boolean>,
    ) => void | (() => void),
): void => {
    const isMountedRef = React.useRef(true);

    React.useEffect(() => {
        const cleanup = callback(isMountedRef);

        return () => {
            cleanup?.();
            isMountedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
