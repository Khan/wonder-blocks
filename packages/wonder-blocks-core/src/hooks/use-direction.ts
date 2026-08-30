import * as React from "react";

import {getDirection} from "../util/direction";

import type {Direction} from "../util/direction";

/**
 * Resolve the writing direction that applies to an element, during render.
 *
 * This is the render-time counterpart to `getDirection`, which should be used
 * directly from callbacks and other places where hooks aren't allowed. The
 * resolution rules are identical — see `getDirection`.
 *
 * Reading the DOM during render means the direction is resolved from whatever
 * is mounted at that moment. On the first render a ref has not been attached
 * yet, so the direction falls back to the document. Components that render
 * direction-sensitive layout on first paint should pass a ref to an element
 * that is already mounted, or rely on document-level direction.
 *
 * @param elementRef Ref to the element to resolve the direction for. When
 * omitted, only document-level direction is considered.
 *
 * @example
 * ```tsx
 * const ref = React.useRef<HTMLDivElement>(null);
 * const direction = useDirection(ref);
 *
 * return <div ref={ref} dir={direction} />;
 * ```
 */
export function useDirection(
    elementRef?: React.RefObject<HTMLElement | null>,
): Direction {
    return getDirection(elementRef?.current);
}

/**
 * Whether the layout that applies to an element is right-to-left, during
 * render.
 *
 * A convenience wrapper around `useDirection` for the common case.
 */
export function useIsRtl(
    elementRef?: React.RefObject<HTMLElement | null>,
): boolean {
    return useDirection(elementRef) === "rtl";
}
