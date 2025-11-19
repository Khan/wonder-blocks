/**
 * List of elements that can be focused
 * @see https://html.spec.whatwg.org/multipage/interaction.html#focusable-area
 *
 * NOTE: tabindex=-1 causes the element to be focusable, and indicates that the
 * author would prefer the element to be click focusable but not sequentially
 * focusable. This means that this would be skipped for keyboard navigation.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
 */
export const FOCUSABLE_ELEMENTS =
    'button:enabled, input:enabled, select:enabled, textarea:enabled, [href], [tabindex]:not([tabindex="-1"])';

/**
 * Gets a list of focusable elements contained in a specific container.
 *
 * @param {Element} root The container where we find focusable nodes.
 * @returns {Array<HTMLElement>} The list of focusable elements inside the root.
 */
export function findFocusableNodes(
    root: HTMLElement | Document,
): Array<HTMLElement> {
    return Array.prototype.slice.call(
        root.querySelectorAll(FOCUSABLE_ELEMENTS),
    );
}
