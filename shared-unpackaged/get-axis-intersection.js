// @flow
import type {AxisIntersection, Bounds} from "./types.js";

export default function getAxisIntersection(
    intersectingRect: Bounds,
    boundsRect: Bounds,
    axis: "vertical" | "horizontal",
): AxisIntersection {
    const start = (rect) => (axis === "horizontal" ? rect.left : rect.top);
    const end = (rect) => (axis === "horizontal" ? rect.right : rect.bottom);

    if (end(intersectingRect) <= start(boundsRect)) {
        return "before";
    } else if (start(intersectingRect) >= end(boundsRect)) {
        return "after";
    }

    return "within";
}
