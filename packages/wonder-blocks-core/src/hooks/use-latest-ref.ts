import * as React from "react";

/**
 * Return a ref that always contains the `value` passed.
 *
 * The useLatestRef hook returns a ref that always contains the `value` passed
 * to the hook during the most recent render.
 *
 * It can be used to wrap a possibly-changing prop in a stable value that can
 * be passed to useEffect without causing unnecessary re-renders. See the
 * Storybook docs for a usage example.
 */
export function useLatestRef<T>(value: T): {readonly current: T} {
    const ref = React.useRef(value);
    ref.current = value;
    return ref;
}
