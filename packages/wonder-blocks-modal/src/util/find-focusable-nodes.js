// @flow

/**
 * List of elements that can be focused
 * @see https://www.w3.org/TR/html5/editing.html#can-be-focused
 */
const FOCUSABLE_ELEMENTS =
    'a[href], details, input, textarea, select, button:not([aria-label^="Close"])';

export function findFocusableNodes(
    root: HTMLElement | Document,
): Array<HTMLElement> {
    return Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS));
}
