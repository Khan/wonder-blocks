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
        fn({rects, elements, placement}) {
            const doc = elements.floating.ownerDocument;
            // Measure the same viewport as floating-ui's `hide` and `size`
            // middlewares: the visual viewport (which shrinks when the page is
            // pinch-zoomed), or the layout viewport when it isn't available.
            const viewportHeight =
                doc.defaultView?.visualViewport?.height ??
                doc.documentElement.clientHeight;

            // `top`/`bottom` placements stack the elements, while
            // `left`/`right` placements put them side by side.
            const [side] = placement.split("-");
            const isStacked = side === "top" || side === "bottom";
            const height = isStacked
                ? rects.floating.height + rects.reference.height
                : Math.max(rects.floating.height, rects.reference.height);

            return {
                data: {
                    isTaller: height > viewportHeight,
                },
            };
        },
    };
};
