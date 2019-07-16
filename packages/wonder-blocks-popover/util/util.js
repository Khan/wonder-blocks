// @flow

/**
 * List of elements that can be focused
 * @see https://www.w3.org/TR/html5/editing.html#can-be-focused
 */
const FOCUSABLE_ELEMENTS =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function findFocusableNodes(root: HTMLElement | Document) {
    return [...root.querySelectorAll(FOCUSABLE_ELEMENTS)];
}
