/**
 * The attribute that floating components (e.g. `Tooltip` and `Popover`) inject
 * into the element they are anchored to, so that they can find that element in
 * the DOM.
 *
 * Components whose ref doesn't point at their root element (e.g. `Switch`,
 * whose ref points at its inner `<input>`) pass this attribute to their root
 * element, so that floating elements are anchored to the whole component.
 */
export const FloatingReferenceAttributeName = "data-wb-floating-reference";
