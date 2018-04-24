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
