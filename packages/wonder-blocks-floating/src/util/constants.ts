// Floating only supports pixel values for the arrow size.
export const ARROW_SIZE_INLINE = 20;
export const ARROW_SIZE_BLOCK = 10;

/**
 * The attribute `Floating` injects into a trigger that can't receive a ref
 * (a plain function component), so that it can find the trigger's DOM element
 * and use it as the reference (anchor) element.
 *
 * Components that render another component's trigger (e.g. `PopoverAnchor`)
 * should pass this attribute along to the element the floating element is
 * anchored to.
 */
export const FloatingReferenceAttributeName = "data-wb-floating-reference";

/**
 * The attribute used to identify a modal launcher portal.
 *
 * NOTE: This is the same as the ModalLauncherPortalAttributeName in the modal
 * package. Make sure to update both when making changes.
 */
export const ModalLauncherPortalAttributeName = "data-modal-launcher-portal";
