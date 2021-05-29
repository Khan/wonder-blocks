// @flow
import type {ReferenceObject} from "popper.js";
import getBounds from "./get-bounds.js";
import getIntersection from "./get-intersection.js";

/**
 * Determine if an element is obscured by other elements.
 *
 * This uses document.elementFromPoint to see if the given element is being
 * overdrawn by another element. Note that this won't work if the given element
 * has `pointer-events: none`.
 */
export default function isObscured(
    anchorElement: Element | ReferenceObject,
    popperElement: Element,
): boolean {
    // TODO(somewhatabstract): We should be smarter in this algorithm and
    // actually look at the intersection of the elements doing the obscuring
    // just as we already do with our scroll parent intersections. That way we
    // can not only check that the entire element is obscured, but think about
    // partial obscurement so we can move the tooltip bubble when it's anchor
    // point is not visible.

    // Before we assume we're visible let's check to see if something else
    // is obscuring us. Here we check a variety of points of the element
    // like topleft, bottomright, and center to see if they are covered by
    // something, and if so, assume we're not visible.
    // There are ways that this can still not work, such as different
    // elements only covering those points and the remainder being visible,
    // or if some covering element has none for pointer-events style, but
    // those edge cases shouldn't bother the main usages for this method.

    // NOTE: If the anchor element has `pointer-events: none`, we're always
    // going to end up hiding, so, you know, probably don't do that.
    // We're not explicitly checking for that CSS since it's a corner-case and
    // would impact perf of the regular cases if we were always checking it.

    // TODO(somewhatabstract, WB-300): Need to cater to the case where the
    // viewport is zoomed such that both corners are off screen but the rest
    // isn't. In this case some browsers don't return the element from
    // `elementFromPoint` then doesn't return the element.
    // Also, consider how we might mitigate the pointer-events issue and make
    // this call more robust.

    const bounds = getBounds(anchorElement, true);

    // This method does the main work, taking some coordinates and determining
    // if our element is visible at that point or not.
    const isVisible = (x: number, y: number): boolean => {
        const elAtPoint = document.elementFromPoint(x, y);
        if (elAtPoint != null && elAtPoint === popperElement) {
            // Oh no, we're being obscured by our own popper.
            // We need to look behind it. Shenanigans time.
            const displayStyle = elAtPoint?.style.display;
            // Remove pointer events so that we can look through it.
            elAtPoint.style.pointerEvents = "none";
            try {
                const visible = isVisible(x, y);
                return visible;
            } finally {
                // Make sure we put things back the way we found them. :)
                elAtPoint.style.pointerEvents = displayStyle;
            }
        }
        if (anchorElement instanceof Element) {
            // If we are working with an element, then we can do some decendency checks
            // to ensure we're not just hitting a child. We're ok with saying that
            // we're visible if we hit a parent because we check them for visibility
            // elsewhere.
            return (
                elAtPoint != null &&
                (anchorElement.contains(elAtPoint) ||
                    elAtPoint.contains(anchorElement))
            );
        }

        // If element is a reference object, all we have to work with is
        // intersection for checking obscurity. Since this doesn't cover
        // parent/child relationships in the DOM, it's not really effective
        // on its own and is possibly about as good as just returning `true`.
        const intersection = () =>
            elAtPoint && getIntersection(bounds, getBounds(elAtPoint, true));
        return (
            intersection?.horizontal !== "within" ||
            intersection?.vertical !== "within"
        );
    };

    // NOTE: We are using functions here so that we only do as much work
    // as we need to, short-circuiting as soon as we have a definitive
    // answer.
    const isTopLeftVisible = () => isVisible(bounds.left, bounds.top);
    const isBottomRightVisible = () => isVisible(bounds.right, bounds.bottom);
    const isCenterVisible = () =>
        isVisible(
            bounds.left + (bounds.right - bounds.left) / 2,
            bounds.top + (bounds.bottom - bounds.top) / 2,
        );

    return !isTopLeftVisible() && !isBottomRightVisible() && !isCenterVisible();
}
