// @flow
import type {Bounds, Intersection} from "./types.js";
import getAxisIntersection from "./get-axis-intersection.js";

/**
 * Determine how one rectangle intersects another.
 *
 * The intersection should be interpreted as whether the first rectangle is
 * within the second.
 */
export default function getIntersection(
    intersectingRect: Bounds,
    boundsRect: Bounds,
): Intersection {
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
