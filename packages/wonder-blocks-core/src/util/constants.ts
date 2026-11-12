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

/**
 * The props that floating components (e.g. `Tooltip` and `Popover`) inject
 * into the element they are anchored to, so that they can find that element
 * in the DOM.
 *
 * Add these to the props of a component that can be used as an anchor, and
 * pass them along to the component's root element.
 */
export type FloatingReferenceProps = {
    [FloatingReferenceAttributeName]?: string;
};
