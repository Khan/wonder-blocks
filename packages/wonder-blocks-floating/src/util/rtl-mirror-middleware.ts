import type {Middleware, Placement} from "@floating-ui/react";

/**
 * Custom middleware that mirrors the floating element placement when in RTL
 * mode and placement is "left" or "right".
 *
 * This ensures the floating element appears in the correct logical position for
 * RTL layouts.
 *
 * @example
 * ```tsx
 * const {placement, middlewareData} = useFloating({
 *   placement: "left",
 *   middleware: [
 *     rtlMirror()
 *   ]
 * });
 *
 * // placement will be "right" when in RTL mode
 * ```
 */
export const rtlMirror = (): Middleware => {
    return {
        name: "rtlMirror",
        fn(state) {
            const {
                placement,
                elements: {reference},
            } = state;
            const isRtl =
                reference && !!(reference as Element).closest("[dir='rtl']");

            // Only swap placement when in RTL mode and placement is left or
            // right
            if (
                !isRtl ||
                (!placement.startsWith("left") &&
                    !placement.startsWith("right"))
            ) {
                return {};
            }

            // Swap left <-> right in the placement string
            let nextPlacement: Placement;
            if (placement.startsWith("left")) {
                nextPlacement = placement.replace("left", "right") as Placement;
            } else {
                nextPlacement = placement.replace("right", "left") as Placement;
            }

            // Allows resetting the placement to the original value so other
            // middlewares can take effect after this one.
            // @see https://floating-ui.com/docs/middleware#resetting-the-lifecycle
            return {
                reset: {
                    placement: nextPlacement,
                },
            };
        },
    };
};
