import * as React from "react";

export type ScrollOverflow = {
    /**
     * Whether the element's content overflows its block size (i.e. whether
     * it can be scrolled vertically).
     */
    isOverflowing: boolean;
    /**
     * Whether there's content above the visible area (the element is scrolled
     * down from the top).
     */
    hasContentAbove: boolean;
    /**
     * Whether there's content below the visible area (the element isn't
     * scrolled all the way to the bottom).
     */
    hasContentBelow: boolean;
};

const initialState: ScrollOverflow = {
    isOverflowing: false,
    hasContentAbove: false,
    hasContentBelow: false,
};

/**
 * Tracks whether the element's content overflows vertically, and whether there
 * is content to scroll to above and/or below the visible area.
 *
 * The check runs right away, again when the element is scrolled, whenever the
 * element or any of its direct children are resized, and whenever direct
 * children are added or removed.
 *
 * NOTE: CSS scroll-driven animations (`animation-timeline: scroll()`) could
 * replace the scroll tracking, but they're not supported in all the browsers
 * we support yet (e.g. Safari < 26).
 *
 * NOTE: It only handles vertical overflow.
 *
 * `ScrollableView` uses this hook to show fades at the edges of its content.
 *
 * ```tsx
 * // Store the element in state (e.g. via a callback ref), so the hook
 * // re-attaches if the element mounts later or changes.
 * const [element, setElement] = React.useState<HTMLElement | null>(null);
 * const {isOverflowing, hasContentAbove, hasContentBelow} =
 *     useScrollOverflow(element);
 *
 * <View ref={setElement}>...</View>
 * ```
 */
export function useScrollOverflow(element: HTMLElement | null): ScrollOverflow {
    const [state, setState] = React.useState<ScrollOverflow>(initialState);

    // NOTE: Styles might not be applied yet when this runs (e.g. Aphrodite
    // injects them asynchronously after rendering), so the initial check can
    // miss an overflow caused by them (e.g. a `maxBlockSize`). The
    // `ResizeObserver` catches it once they're applied, on the next frame.
    React.useEffect(() => {
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!element || !window.ResizeObserver) {
            // Reset the state if the element was removed.
            setState(initialState);
            return;
        }

        const update = () => {
            const {scrollTop, scrollHeight, clientHeight} = element;
            const next: ScrollOverflow = {
                // Allow for subpixel rounding (scroll sizes are rounded to
                // integers), so a 1px difference isn't treated as overflow.
                isOverflowing: scrollHeight - clientHeight > 1,
                hasContentAbove: scrollTop > 0,
                hasContentBelow: scrollTop + clientHeight < scrollHeight - 1,
            };

            // Avoid re-rendering on every scroll event when nothing changed.
            setState((prev) =>
                prev.isOverflowing === next.isOverflowing &&
                prev.hasContentAbove === next.hasContentAbove &&
                prev.hasContentBelow === next.hasContentBelow
                    ? prev
                    : next,
            );
        };

        // Check when either the container (e.g. it gets constrained by the
        // viewport) or its children (e.g. content changes) are resized.
        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(element);
        Array.from(element.children).forEach((child) =>
            resizeObserver.observe(child),
        );

        // Also check (and observe new children) when direct children are
        // added or removed, since that changes the content size without
        // resizing the container once it's constrained.
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) =>
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element) {
                        resizeObserver.observe(node);
                    }
                }),
            );
            update();
        });
        mutationObserver.observe(element, {childList: true});

        element.addEventListener("scroll", update, {passive: true});

        // Check right away instead of waiting for the first resize
        // notification.
        update();

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            element.removeEventListener("scroll", update);
        };
    }, [element]);

    return state;
}
