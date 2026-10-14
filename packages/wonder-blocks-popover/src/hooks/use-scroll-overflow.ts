import * as React from "react";

type ScrollOverflow = {
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
 * The check runs again when the element is scrolled, and whenever the element
 * or any of its direct children (present when the hook runs) are resized.
 *
 * NOTE: CSS scroll-driven animations (`animation-timeline: scroll()`) could
 * replace the scroll tracking, but they're not supported in all the browsers
 * we support yet (e.g. Safari < 26).
 *
 * NOTE: This is only used by Popover for now. If another component needs it,
 * consider moving it to `@khanacademy/wonder-blocks-core` (along with the
 * focusable-when-overflowing scroll area pattern used in
 * `PopoverContentCore`), and handling horizontal overflow and children added
 * after mount.
 */
export function useScrollOverflow(
    ref: React.RefObject<HTMLElement | null>,
): ScrollOverflow {
    const [state, setState] = React.useState<ScrollOverflow>(initialState);

    React.useEffect(() => {
        const element = ref.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!element || !window.ResizeObserver) {
            return;
        }

        const update = () => {
            const {scrollTop, scrollHeight, clientHeight} = element;
            const next: ScrollOverflow = {
                isOverflowing: scrollHeight > clientHeight,
                hasContentAbove: scrollTop > 0,
                // Allow for subpixel rounding when scrolled to the bottom.
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
        element.addEventListener("scroll", update, {passive: true});

        return () => {
            resizeObserver.disconnect();
            element.removeEventListener("scroll", update);
        };
    }, [ref]);

    return state;
}
