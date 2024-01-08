/**
 * List of elements that can be focused
 * @see https://www.w3.org/TR/html5/editing.html#can-be-focused
 */
const FOCUSABLE_ELEMENTS =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function findFocusableNodes(
    root: HTMLElement | Document,
): Array<HTMLElement> {
    return Array.from(root.querySelectorAll(FOCUSABLE_ELEMENTS));
}

/**
 * Checks if an element is focusable
 * @see https://html.spec.whatwg.org/multipage/interaction.html#focusable-area
 */
export function isFocusable(element: HTMLElement): boolean {
    return element.matches(FOCUSABLE_ELEMENTS);
}
