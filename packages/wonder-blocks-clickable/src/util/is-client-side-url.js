// @flow
/**
 * Returns:
 * - false for hrefs staring with http://, https://, //.
 * - false for '#', 'javascript:...', 'mailto:...', 'tel:...', etc.
 * - true for all other values, e.g. /foo/bar
 */
export const isClientSideUrl = (href: string): boolean => {
    if (typeof href !== "string") {
        return false;
    }
    return (
        !/^(https?:)?\/\//i.test(href) &&
        !/^([^#]*#[\w-]*|[\w\-.]+:)/.test(href)
    );
};
