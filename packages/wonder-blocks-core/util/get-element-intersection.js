// @flow
import enumerateScrollAncestors from "./enumerate-scroll-ancestors.js";

/**
 * Indicates the intersection state of an item on a single axis.
 */
export type AxisIntersection =
    // The item is partly or fully within the bounds.
    | "within"

    // The item is outside the starting bounds.
    | "before"

    // The item is outside the ending bounds.
    | "after";

/**
 * Indicates the visibility of an item on the horizontal and vertical axes.
 */
export type Intersection = {|
    // The intersection on the horizontal axis.
    horizontal: ?AxisIntersection,

    // The intersection on the vertical axis.
    vertical: ?AxisIntersection,
|};

const UndeterminedIntersection: Intersection = Object.freeze({
    horizontal: null,
    vertical: null,
});

const FullIntersection: Intersection = Object.freeze({
    horizontal: "within",
    vertical: "within",
});

function getAxisIntersection(
    intersectingRect: ClientRect | DOMRect,
    boundsRect: ClientRect | DOMRect,
    axis: "vertical" | "horizontal",
): AxisIntersection {
    const start = (rect) => (axis === "horizontal" ? rect.left : rect.top);
    const end = (rect) => (axis === "horizontal" ? rect.right : rect.bottom);

    if (end(intersectingRect) <= start(boundsRect)) {
        return "before";
    } else if (start(intersectingRect) >= end(boundsRect)) {
        return "after";
    } else {
        return "within";
    }
}

/**
 * Determine if an element intersects a single other element.
 *
 * It is assumed that the element provided as `boundsElement` is an element that
 * could obscure the given element, `element`.
 */
function getElementIntersectionAgainstParent(
    intersectingRect: ClientRect | DOMRect,
    boundsElement: Element,
): Intersection {
    const boundsRect = boundsElement.getBoundingClientRect();

    const horizontal = getAxisIntersection(
        intersectingRect,
        boundsRect,
        "horizontal",
    );

    const vertical = getAxisIntersection(
        intersectingRect,
        boundsRect,
        "vertical",
    );

    return {horizontal, vertical};
}

/**
 * Determine if a given element intersects with the visible bounds of its
 * scroll parents, or the bounds of a specific element.
 */
export default function getElementIntersection(
    element: Element,
    boundsElement?: Element,
): Intersection {
    if (!element) {
        // An non-existant element is definitely not visible.
        return UndeterminedIntersection;
    }

    const intersectingRect = element.getBoundingClientRect();
    // If we're looking against a single boundary element, then we just do that.
    if (boundsElement) {
        return getElementIntersectionAgainstParent(
            intersectingRect,
            boundsElement,
        );
    }

    // Otherwise, we enumerate the scroll parents and test against those.
    // If one of them is hiding our candidate element, then we will return.
    for (const scrollParent of enumerateScrollAncestors(element)) {
        const intersection = getElementIntersectionAgainstParent(
            intersectingRect,
            scrollParent,
        );

        // If the intersectingRect is before or after the parent in one or both
        // dimensions, then return our intersection result. Otherwise, we'll
        // keep on searching up our parents.
        if (
            intersection.vertical !== "within" ||
            intersection.horizontal !== "within"
        ) {
            // Stop looking, we've found something that is hiding the element.
            return intersection;
        }
    }

    // If we got here, the element is within the bounds of its parents.
    return FullIntersection;
}
