// @flow
import type {FetchMockOperation} from "./types.js";

/**
 * Get the URL from the given RequestInfo.
 *
 * Since we could be running in Node or in JSDOM, we don't check instance
 * types, but just use a heuristic so that this works without knowing what
 * was polyfilling things.
 */
const getHref = (input: RequestInfo): string => {
    if (typeof input === "string") {
        return input;
    } else if (typeof input.url === "string") {
        return input.url;
    } else if (typeof input.href === "string") {
        return input.href;
    } else {
        throw new Error(`Unsupported input type`);
    }
};

/**
 * Determines if a given fetch invocation matches the given mock.
 */
export const fetchRequestMatchesMock = (
    mock: FetchMockOperation,
    input: RequestInfo,
    init: ?RequestOptions,
): boolean => {
    // Currently, we only match on the input portion.
    // This can be a Request, a URL, or a string.
    const href = getHref(input);

    // Our mock operation is either a string for an exact match, or a regex.
    if (typeof mock === "string") {
        return href === mock;
    } else if (mock instanceof RegExp) {
        return mock.test(href);
    } else {
        throw new Error(`Unsupported mock operation: ${JSON.stringify(mock)}`);
    }
};
