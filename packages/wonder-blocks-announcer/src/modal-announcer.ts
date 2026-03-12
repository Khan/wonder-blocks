import Announcer from "./announcer";

/**
 * Inject a live region container inside a modal element so that screen reader
 * announcements made while the modal is open are audible to the user.
 *
 * Call this when the modal element mounts — typically from a useEffect.
 * Pre-creating the live regions gives screen readers time to register them
 * before the first announcement fires.
 *
 * @param {HTMLElement} modalElement The element with role="dialog" and aria-modal="true"
 */
export function attachAnnouncerToModal(modalElement: HTMLElement) {
    Announcer.getInstance().attachAnnouncerToModal(modalElement);
}

/**
 * Remove the live region container from a modal element and clean up internal
 * state. Call this when the modal unmounts — typically from a useEffect cleanup.
 *
 * @param {HTMLElement} modalElement The element previously passed to attachAnnouncerToModal
 */
export function detachAnnouncerFromModal(modalElement: HTMLElement) {
    Announcer.getInstance().detachAnnouncerFromModal(modalElement);
}
