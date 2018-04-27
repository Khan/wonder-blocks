// @flow
import propTypes from "prop-types";

import type {GridSize} from "./types.js";

export const matchesSize = (
    {
        small,
        medium,
        large,
    }: {small?: boolean, medium?: boolean, large?: boolean},
    gridSize: GridSize,
) =>
    (!small && !medium && !large) ||
    (small && gridSize === "small") ||
    (medium && gridSize === "medium") ||
    (large && gridSize === "large");

export const widthFromProps = (
    {
        small,
        medium,
        large,
        width,
    }: {
        small?: any,
        medium?: any,
        large?: any,
        width?: any,
    },
    gridSize: GridSize,
) => {
    // If no option was specified then we just return undefined,
    // components may handle this case differently.
    // We go through all the ways in which a fixed width can be
    // specified and find the one that matches our current grid size.
    if (!small && !medium && !large && !width) {
        return undefined;
    } else if (small && gridSize === "small") {
        return small;
    } else if (medium && gridSize === "medium") {
        return medium;
    } else if (large && gridSize === "large") {
        return large;
    } else if (typeof width === "function") {
        return width(gridSize);
    } else if (width) {
        return width;
    }

    // If nothing applies then we return null (usually resulting
    // in the component not being rendered)
    return null;
};

export const flexBasis = (size: number | string) => {
    return {
        MsFlexBasis: size,
        MsFlexPreferredSize: size,
        WebkitFlexBasis: size,
        flexBasis: size,
    };
};

export const gridContextTypes = {
    gridSize: propTypes.string,
    gridSpec: propTypes.object,
};
