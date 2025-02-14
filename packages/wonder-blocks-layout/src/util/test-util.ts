import type {MediaSize} from "./types";

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
} as const;

export function checkQuery(
    queryString: (typeof queries)[keyof typeof queries],
    width: number,
): boolean {
    return (
        (width < 768 && queryString === queries.small) ||
        (width >= 768 && width < 1024 && queryString === queries.medium) ||
        (width >= 1024 && queryString === queries.large)
    );
}

type Listener = (arg1: {matches: boolean}) => void;
type MatchMedia = {
    matches: boolean;
    addListener: (listener: Listener) => void;
    removeListener: (listener: Listener) => void;
};

/**
 *
 * @param {MediaQuery} query
 */
export function matchMedia(
    query: (typeof queries)[keyof typeof queries],
): MatchMedia {
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
