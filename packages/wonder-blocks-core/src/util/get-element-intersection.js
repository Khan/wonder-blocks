// @flow
import type {ReferenceObject} from "popper.js";
import enumerateScrollAncestors from "./enumerate-scroll-ancestors.js";
import type {
    Intersection,
    Bounds,
    // eslint-disable-next-line import/no-restricted-paths
} from "../../../../shared-unpackaged/types.js";
// eslint-disable-next-line import/no-restricted-paths
import getAxisIntersection from "../../../../shared-unpackaged/get-axis-intersection.js";

export type {Intersection};

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

/**
 * Determine if an element intersects a single other element.
 *
 * It is assumed that the element provided as `boundsElement` is an element that
 * could obscure the given element, `element`.
 */
function getElementIntersectionAgainstParent(
    intersectingRect: Bounds,
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
    const boundsRect = {
        top: boundingRect.top,
        bottom: boundingRect.bottom,
        left: boundingRect.left,
        right: boundingRect.right,
    };

    // In webapp we set height: 100% on html, body and overflow-y: scroll on body.
    // This results in the height reported by getBoundingClientRect being the height
    // of the viewport instead of the height of the page.  We use the scrollHeight
    // of the body to corect the bounds.
    // TODO(kevinb): screenshot test this
    if (boundsElement === document.body) {
        boundsRect.bottom = boundsRect.top + (boundsElement: any).scrollHeight;
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
    element: Element | ReferenceObject,
    boundsElement?: Element,
): Intersection {
    if (!element) {
        // An non-existant element is definitely not visible.
        return UndeterminedIntersection();
    }

    const {top, left, bottom, right} = element.getBoundingClientRect();
    const intersectingRect = {
        top,
        left,
        bottom,
        right,
    };
    // If we're looking against a single boundary element, then we just do that.
    if (boundsElement) {
        return getElementIntersectionAgainstParent(
            intersectingRect,
            boundsElement,
        );
    }

    if (element instanceof Element) {
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
    }

    // If we got here, the element is within the bounds of its parents.
    return FullIntersection();
}
