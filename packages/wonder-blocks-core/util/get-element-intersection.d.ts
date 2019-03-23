/**
 * Indicates the intersection state of an item on a single axis.
 */
export declare type AxisIntersection = "within" | "before" | "after";
/**
 * Indicates the visibility of an item on the horizontal and vertical axes.
 */
export declare type Intersection = {
    horizontal: AxisIntersection | null;
    vertical: AxisIntersection | null;
};
/**
 * Determine if a given element intersects with the visible bounds of its
 * scroll parents, or the bounds of a specific element.
 */
export default function getElementIntersection(element: Element, boundsElement?: Element): Intersection;
