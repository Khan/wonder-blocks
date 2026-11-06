import type {Middleware} from "@floating-ui/react";

/**
 * Custom middleware that reports whether the floating and reference elements
 * together are taller than the viewport.
 *
 * In that case, the floating element is kept visible even when the reference
 * element is hidden (see the `hide` prop). Otherwise, users on very small
 * screens or at high zoom levels (e.g. 400%) would see the floating element
 * disappear while they scroll to read it.
 *
 * NOTE: This must run after the `size` middleware (if any), so that it uses the
 * constrained size of the floating element.
 */
export const tallerThanViewport = (): Middleware => {
    return {
        name: "tallerThanViewport",
        fn({rects, elements}) {
            const viewportHeight =
                elements.floating.ownerDocument.documentElement.clientHeight;

            return {
                data: {
                    isTaller:
                        rects.floating.height + rects.reference.height >
                        viewportHeight,
                },
            };
        },
    };
};
