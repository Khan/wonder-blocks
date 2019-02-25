// @flow
import type {MediaQuery, MediaSize} from "./types.js";

export const queryMatchesSize = (
    mediaQuery: MediaQuery,
    mediaSize: MediaSize,
): boolean => {
    switch (mediaQuery) {
        case "all":
            return true;
        case "small":
            return mediaSize === "small";
        case "mdOrSmaller":
            return mediaSize === "medium" || mediaSize === "small";
        case "medium":
            return mediaSize === "medium";
        case "mdOrLarger":
            return mediaSize === "medium" || mediaSize === "large";
        case "large":
            return mediaSize === "large";
        default:
            throw new Error(`Unsupported mediaSize: ${mediaSize}`);
    }
};
