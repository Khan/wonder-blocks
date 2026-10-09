import * as React from "react";

/**
 * Tracks whether the element's content overflows its block size (i.e. whether
 * it can be scrolled vertically).
 *
 * The check runs again whenever the element or any of its direct children
 * (present when the hook runs) are resized.
 *
 * NOTE: This is only used by Popover for now. If another component needs it,
 * consider moving it to `@khanacademy/wonder-blocks-core` (along with the
 * focusable-when-overflowing scroll area pattern used in
 * `PopoverContentCore`), and handling horizontal overflow and children added
 * after mount.
 */
export function useIsOverflowing(
    ref: React.RefObject<HTMLElement | null>,
): boolean {
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    React.useEffect(() => {
        const element = ref.current;
        // ResizeObserver is supported in browsers we support, but not in jsdom
        if (!element || !window.ResizeObserver) {
            return;
        }

        const checkOverflow = () => {
            setIsOverflowing(element.scrollHeight > element.clientHeight);
        };

        // Check when either the container (e.g. it gets constrained by the
        // viewport) or its children (e.g. content changes) are resized.
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(element);
        Array.from(element.children).forEach((child) =>
            resizeObserver.observe(child),
        );

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    return isOverflowing;
}
