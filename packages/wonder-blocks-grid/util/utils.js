// @flow
import type {MediaSize} from "./types.js";

export const matchesSize = (
    {
        small,
        medium,
        large,
    }: {small?: boolean, medium?: boolean, large?: boolean},
    mediaSize: MediaSize,
) =>
    (!small && !medium && !large) ||
    (small && mediaSize === "small") ||
    (medium && mediaSize === "medium") ||
    (large && mediaSize === "large");

export const flexBasis = (size: number | string) => {
    return {
        MsFlexBasis: size,
        MsFlexPreferredSize: size,
        WebkitFlexBasis: size,
        flexBasis: size,
    };
};
