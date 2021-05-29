// @flow
import type {ReferenceObject} from "popper.js";
import type {Bounds} from "./types.js";
import getEdges from "./get-edges.js";

export default function getBounds(
    element: Element | ReferenceObject,
    withoutEdges: boolean = true,
): Bounds {
    const elementRect = element.getBoundingClientRect();
    const edges = getEdges(element, withoutEdges);

    return {
        left:
            elementRect.left +
            edges.margin.left +
            edges.padding.left +
            edges.border.left,
        top:
            elementRect.top +
            edges.margin.top +
            edges.padding.top +
            edges.border.top,
        right:
            elementRect.right -
            edges.margin.right -
            edges.padding.right -
            edges.border.right,
        bottom:
            elementRect.bottom -
            edges.margin.bottom -
            edges.padding.bottom -
            edges.border.bottom,
    };
}
