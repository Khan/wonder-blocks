// @flow
import type {MediaQuery, MediaSize} from "./types.js";

/**
 * Return where a media size matches a media query.
 *
 * examples:
 * - `queryMatchesSize("all", "small")` returns `true`
 * - `queryMatchesSize("mdOrLarger", "small")` returns `false`
 *
 * @param {MediaQuery} mediaQuery
 * @param {MediaSize} mediaSize
 */
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
