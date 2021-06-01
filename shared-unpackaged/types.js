// @flow
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

/**
 * Describes the bounds of a rectangle.
 */
export type Bounds = {|
    left: number,
    top: number,
    right: number,
    bottom: number,
|};
