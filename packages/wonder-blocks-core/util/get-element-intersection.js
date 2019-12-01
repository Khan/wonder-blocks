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

function UndeterminedIntersection() {
    return {
        horizontal: null,
        vertical: null,
    };
}

function FullIntersection() {
    return {
        horizontal: "within",
        vertical: "within",
    };
}

type Rect = {|
    top: number,
    bottom: number,
    left: number,
    right: number,
    width: number,
    height: number,
|};

function getAxisIntersection(
    intersectingRect: ClientRect | DOMRect,
    boundsRect: Rect,
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
    // We need to check that it matters if we're out of bounds. If the parent
    // element isn't clipping or otherwise hiding things outside its bounds,
    // then checking against bounds isn't going to be much use.
    // So, let's get the style for the element and use the overflow values.
    const style =
        ((boundsElement: any).currentStyle: ?CSSStyleDeclaration) ||
        window.getComputedStyle(boundsElement);

    const boundingRect = boundsElement.getBoundingClientRect();
    const boundsRect: Rect = {
        top: boundingRect.top,
        bottom: boundingRect.bottom,
        left: boundingRect.left,
        right: boundingRect.right,
        width: boundingRect.width,
        height: boundingRect.height,
    };

    // In webapp we set height: 100% on html, body and overflow-y: scroll on body.
    // This results in the height reported by getBoundingClientRect being the height
    // of the viewport instead of the height of the page.  We use the scrollHeight
    // of the body to corect the bounds.
    // TODO(kevinb): screenshot test this
    if (boundsElement === document.body) {
        boundsRect.height = (boundsElement: any).scrollHeight;
        boundsRect.bottom = boundsRect.top + boundsRect.height;
    }

    // We assume we're within this specific bounds element if it's overflow is
    // visible.
    const horizontal =
        style.overflowX === "visible"
            ? "within"
            : getAxisIntersection(intersectingRect, boundsRect, "horizontal");

    // We assume we're within this specific bounds element if it's overflow is
    // visible.
    const vertical =
        style.overflowY === "visible"
            ? "within"
            : getAxisIntersection(intersectingRect, boundsRect, "vertical");

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
        return UndeterminedIntersection();
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
    return FullIntersection();
}
