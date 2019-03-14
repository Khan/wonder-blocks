// @flow
import type {MediaQuery, MediaSize} from "./types.js";

/**
 * Helper function for setting the window size, for use in tests.
 * @param {MediaSize} size
 */
export function resizeWindow(size: MediaSize) {
    if (size === "large") {
        window.innerWidth = 1200;
    } else if (size === "medium") {
        window.innerWidth = 800;
    } else if (size === "small") {
        window.innerWidth = 640;
    }

    window.dispatchEvent(new Event("resize"));
}

const queries = {
    small: "(max-width: 767px)",
    medium: "(min-width: 768px) and (max-width: 1023px)",
    large: "(min-width: 1024px)",
};

const checkQuery = (query, width) => {
    return (
        (width < 768 && query === queries.small) ||
        (width < 1024 && query === queries.medium) ||
        query === queries.large
    );
};

type Listener = ({matches: boolean}) => void;

/**
 *
 * @param {MediaQuery} query
 */
export function matchMedia(query: MediaQuery) {
    const listeners = new Set<Listener>();

    window.addEventListener("resize", () => {
        for (const listener of listeners) {
            listener({
                matches: checkQuery(query, window.innerWidth),
            });
        }
    });

    return {
        get matches() {
            return checkQuery(query, window.innerWidth);
        },
        addListener: (listener: Listener) => {
            listeners.add(listener);
        },
        removeListener: (listener: Listener) => {
            listeners.delete(listener);
        },
    };
}
