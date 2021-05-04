// @flow
/**
 * Returns:
 * - false for hrefs staring with http://, https://, //.
 * - false for '#', 'javascript:...', 'mailto:...', 'tel:...', etc.
 * - true for all other values, e.g. /foo/bar
 */
export const isClientSideUrl = (href: string): boolean => {
    return (
        !/^(https?:)?\/\//i.test(href) &&
        !/^[a-zA-Z]+:/.test(href) &&
        href !== "#"
    );
};
