// @flow
/**
 * Returns true for external url.
 * Such as http://, https://, //
 */
export default function isExternalUrl(url: string): boolean {
    return /^(https?:)?\/\//i.test(url);
}
