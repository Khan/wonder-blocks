// @flow
/**
 * Returns:
 * - false for hrefs staring with http://, https://, //.
 * - false for '#' and 'javascript:void(0);'
 * - true for all other values, e.g. /foo/bar
 */
export const isClientSideUrl = (href: string): boolean => {
    return (
        !/^(https?:)?\/\//i.test(href) &&
        !/^(#|javascript:void\(0\);?)$/.test(href)
    );
};
